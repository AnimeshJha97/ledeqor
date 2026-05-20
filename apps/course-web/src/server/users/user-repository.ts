import type { Collection, ObjectId } from "mongodb";
import { getDb } from "@/server/db/mongodb";

export type AppUserRole = "learner" | "admin" | "instructor";

export type AppUser = {
  _id?: ObjectId;
  email: string;
  name?: string | null;
  image?: string | null;
  role: AppUserRole;
  createdAt: Date;
  updatedAt: Date;
};

const USERS_COLLECTION = "users";

async function usersCollection(): Promise<Collection<AppUser>> {
  const db = await getDb();
  const collection = db.collection<AppUser>(USERS_COLLECTION);

  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ role: 1, updatedAt: -1 });

  return collection;
}

export async function upsertUserFromAuth(input: { email?: string | null; name?: string | null; image?: string | null }) {
  if (!input.email) {
    return null;
  }

  const collection = await usersCollection();
  const now = new Date();

  await collection.updateOne(
    { email: input.email },
    {
      $setOnInsert: {
        email: input.email,
        role: "learner",
        createdAt: now
      },
      $set: {
        name: input.name ?? null,
        image: input.image ?? null,
        updatedAt: now
      }
    },
    { upsert: true }
  );

  const user = await collection.findOne({ email: input.email });

  if (!user?._id) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role
  };
}

export async function getUserByEmail(email: string) {
  const collection = await usersCollection();
  const user = await collection.findOne({ email });

  if (!user?._id) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role
  };
}
