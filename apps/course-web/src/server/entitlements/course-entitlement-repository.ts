import type { Collection, ObjectId } from "mongodb";
import { getDb } from "@/server/db/mongodb";

export type CourseAccessLevel = "free" | "paid" | "pro" | "admin";
export type CourseEntitlementStatus = "active" | "expired" | "revoked" | "refunded";

export type CourseEntitlement = {
  _id?: ObjectId;
  userId: string;
  courseSlug: string;
  accessLevel: CourseAccessLevel;
  source: "manual" | "purchase" | "subscription" | "admin_grant" | "preview" | "free_enrollment" | "founder_free";
  campaignId?: string;
  status: CourseEntitlementStatus;
  startsAt: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const ENTITLEMENTS_COLLECTION = "course_entitlements";
const accessRank: Record<CourseAccessLevel, number> = {
  free: 1,
  paid: 2,
  pro: 3,
  admin: 4
};

async function entitlementsCollection(): Promise<Collection<CourseEntitlement>> {
  const db = await getDb();
  const collection = db.collection<CourseEntitlement>(ENTITLEMENTS_COLLECTION);

  await collection.createIndex({ userId: 1, courseSlug: 1 }, { unique: true });
  await collection.createIndex({ courseSlug: 1, status: 1 });
  await collection.createIndex({ userId: 1, status: 1 });
  await collection.createIndex({ campaignId: 1, status: 1 });

  return collection;
}

export function hasMinimumAccess(entitlement: Pick<CourseEntitlement, "accessLevel" | "status" | "expiresAt"> | null, minimumAccess: CourseAccessLevel) {
  if (!entitlement || entitlement.status !== "active") {
    return false;
  }

  if (entitlement.expiresAt && entitlement.expiresAt.getTime() < Date.now()) {
    return false;
  }

  return accessRank[entitlement.accessLevel] >= accessRank[minimumAccess];
}

export async function getCourseEntitlement(userId: string, courseSlug: string) {
  const collection = await entitlementsCollection();
  return collection.findOne({ userId, courseSlug });
}

export async function countActiveCampaignRedemptions(campaignId: string) {
  const collection = await entitlementsCollection();
  return collection.countDocuments({ campaignId, status: "active" });
}

export async function grantFounderFreeEntitlement(input: {
  userId: string;
  courseSlug: string;
  campaignId: string;
  startsAt: Date;
  expiresAt: Date;
}) {
  const collection = await entitlementsCollection();
  const now = new Date();
  const existing = await getCourseEntitlement(input.userId, input.courseSlug);

  if (existing) {
    return existing;
  }

  await collection.updateOne(
    { userId: input.userId, courseSlug: input.courseSlug },
    {
      $setOnInsert: {
        userId: input.userId,
        courseSlug: input.courseSlug,
        accessLevel: "pro",
        source: "founder_free",
        campaignId: input.campaignId,
        status: "active",
        startsAt: input.startsAt,
        expiresAt: input.expiresAt,
        createdAt: now,
        updatedAt: now
      }
    },
    { upsert: true }
  );

  return getCourseEntitlement(input.userId, input.courseSlug);
}

export async function grantFreeCourseEntitlement(userId: string, courseSlug: string) {
  const collection = await entitlementsCollection();
  const now = new Date();

  await collection.updateOne(
    { userId, courseSlug },
    {
      $setOnInsert: {
        userId,
        courseSlug,
        createdAt: now
      },
      $set: {
        accessLevel: "free",
        source: "free_enrollment",
        status: "active",
        startsAt: now,
        updatedAt: now
      }
    },
    { upsert: true }
  );

  return getCourseEntitlement(userId, courseSlug);
}
