import type { Collection, Filter } from "mongodb";
import { getDb } from "@/server/db/mongodb";

export type PracticeAttempt = {
  courseSlug: string;
  moduleSlug: string;
  learnerId: string;
  prompt: string;
  answer: string;
  kind: "short_answer";
  updatedAt: Date;
};

const PRACTICE_COLLECTION = "practice_attempts";

async function practiceCollection(): Promise<Collection<PracticeAttempt>> {
  const db = await getDb();
  const collection = db.collection<PracticeAttempt>(PRACTICE_COLLECTION);

  await collection.createIndex({ courseSlug: 1, moduleSlug: 1, learnerId: 1, prompt: 1, kind: 1 }, { unique: true });
  await collection.createIndex({ learnerId: 1, updatedAt: -1 });

  return collection;
}

export async function upsertPracticeAttempt(attempt: Omit<PracticeAttempt, "updatedAt">) {
  const collection = await practiceCollection();
  const updatedAt = new Date();

  await collection.updateOne(
    {
      courseSlug: attempt.courseSlug,
      moduleSlug: attempt.moduleSlug,
      learnerId: attempt.learnerId,
      prompt: attempt.prompt,
      kind: attempt.kind
    } as Filter<PracticeAttempt>,
    {
      $set: {
        ...attempt,
        updatedAt
      }
    },
    { upsert: true }
  );

  return {
    ...attempt,
    updatedAt
  };
}
