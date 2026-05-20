import type { Collection, Filter } from "mongodb";
import { getDb } from "@/server/db/mongodb";
import type { LearnerCourseProgress, LearnerLectureProgress } from "@/server/courses/types";

const PROGRESS_COLLECTION = "course_progress";

async function progressCollection(): Promise<Collection<LearnerCourseProgress>> {
  const db = await getDb();
  const collection = db.collection<LearnerCourseProgress>(PROGRESS_COLLECTION);

  await collection.createIndex({ courseSlug: 1, learnerId: 1 }, { unique: true });
  await collection.createIndex({ learnerId: 1, updatedAt: -1 });

  return collection;
}

export async function getProgress(courseSlug: string, learnerId: string) {
  const collection = await progressCollection();
  const existing = await collection.findOne({ courseSlug, learnerId } as Filter<LearnerCourseProgress>, { projection: { _id: 0 } });

  if (existing) {
    return existing;
  }

  return {
    courseSlug,
    learnerId,
    lectures: [],
    completedModules: [],
    quizScores: [],
    selfRatings: [],
    updatedAt: new Date()
  };
}

export async function updateLectureProgress(
  courseSlug: string,
  learnerId: string,
  lectureProgress: Omit<LearnerLectureProgress, "updatedAt">
) {
  const collection = await progressCollection();
  const now = new Date();
  const current = await getProgress(courseSlug, learnerId);
  const nextLectures = current.lectures.filter(
    (lecture) => lecture.moduleSlug !== lectureProgress.moduleSlug || lecture.lectureId !== lectureProgress.lectureId
  );

  nextLectures.push({
    ...lectureProgress,
    updatedAt: now
  });

  await collection.updateOne(
    { courseSlug, learnerId } as Filter<LearnerCourseProgress>,
    {
      $set: {
        courseSlug,
        learnerId,
        lectures: nextLectures,
        completedModules: current.completedModules,
        quizScores: current.quizScores,
        selfRatings: current.selfRatings ?? [],
        updatedAt: now
      }
    },
    { upsert: true }
  );

  return getProgress(courseSlug, learnerId);
}

export async function updateQuizScore(
  courseSlug: string,
  learnerId: string,
  quizScore: { moduleSlug: string; score: number; total: number }
) {
  const collection = await progressCollection();
  const now = new Date();
  const current = await getProgress(courseSlug, learnerId);
  const nextQuizScores = current.quizScores.filter((score) => score.moduleSlug !== quizScore.moduleSlug);

  nextQuizScores.push({
    ...quizScore,
    updatedAt: now
  });

  await collection.updateOne(
    { courseSlug, learnerId } as Filter<LearnerCourseProgress>,
    {
      $set: {
        courseSlug,
        learnerId,
        lectures: current.lectures,
        completedModules: current.completedModules,
        quizScores: nextQuizScores,
        selfRatings: current.selfRatings ?? [],
        updatedAt: now
      }
    },
    { upsert: true }
  );

  return getProgress(courseSlug, learnerId);
}

export async function updateSelfRating(
  courseSlug: string,
  learnerId: string,
  selfRating: { moduleSlug: string; lectureId: string; rating: 1 | 2 | 3 | 4 | 5 }
) {
  const collection = await progressCollection();
  const now = new Date();
  const current = await getProgress(courseSlug, learnerId);
  const nextSelfRatings = (current.selfRatings ?? []).filter(
    (rating) => rating.moduleSlug !== selfRating.moduleSlug || rating.lectureId !== selfRating.lectureId
  );

  nextSelfRatings.push({
    ...selfRating,
    updatedAt: now
  });

  await collection.updateOne(
    { courseSlug, learnerId } as Filter<LearnerCourseProgress>,
    {
      $set: {
        courseSlug,
        learnerId,
        lectures: current.lectures,
        completedModules: current.completedModules,
        quizScores: current.quizScores,
        selfRatings: nextSelfRatings,
        updatedAt: now
      }
    },
    { upsert: true }
  );

  return getProgress(courseSlug, learnerId);
}
