import { getDb } from "@/server/db/mongodb";

export type CapstoneProgressItem = {
  phaseId: string;
  itemId: string;
  completedAt: string;
};

export type CapstoneProgress = {
  courseSlug: string;
  learnerId: string;
  completedItems: CapstoneProgressItem[];
  updatedAt: string;
};

const collectionName = "capstone_progress";

export async function getCapstoneProgress(courseSlug: string, learnerId: string): Promise<CapstoneProgress> {
  const db = await getDb();
  const progress = await db.collection<CapstoneProgress>(collectionName).findOne({ courseSlug, learnerId });

  if (progress) {
    return {
      courseSlug,
      learnerId,
      completedItems: progress.completedItems ?? [],
      updatedAt: progress.updatedAt
    };
  }

  return {
    courseSlug,
    learnerId,
    completedItems: [],
    updatedAt: new Date().toISOString()
  };
}

export async function updateCapstoneChecklistItem(input: {
  courseSlug: string;
  learnerId: string;
  phaseId: string;
  itemId: string;
  completed: boolean;
}) {
  const db = await getDb();
  const now = new Date().toISOString();
  const filter = { courseSlug: input.courseSlug, learnerId: input.learnerId };

  if (input.completed) {
    await db.collection<CapstoneProgress>(collectionName).updateOne(
      filter,
      {
        $setOnInsert: {
          courseSlug: input.courseSlug,
          learnerId: input.learnerId
        },
        $pull: {
          completedItems: {
            phaseId: input.phaseId,
            itemId: input.itemId
          }
        },
        $set: { updatedAt: now }
      },
      { upsert: true }
    );

    await db.collection<CapstoneProgress>(collectionName).updateOne(filter, {
      $push: {
        completedItems: {
          phaseId: input.phaseId,
          itemId: input.itemId,
          completedAt: now
        }
      }
    });
  } else {
    await db.collection<CapstoneProgress>(collectionName).updateOne(
      filter,
      {
        $setOnInsert: {
          courseSlug: input.courseSlug,
          learnerId: input.learnerId
        },
        $pull: {
          completedItems: {
            phaseId: input.phaseId,
            itemId: input.itemId
          }
        },
        $set: { updatedAt: now }
      },
      { upsert: true }
    );
  }

  return getCapstoneProgress(input.courseSlug, input.learnerId);
}
