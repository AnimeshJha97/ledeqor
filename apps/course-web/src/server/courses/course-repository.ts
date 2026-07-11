import type { Collection, Filter, OptionalUnlessRequiredId } from "mongodb";
import { getDb } from "@/server/db/mongodb";
import type { CourseRecord } from "@/server/courses/types";

const COURSES_COLLECTION = "courses";

async function coursesCollection(): Promise<Collection<CourseRecord>> {
  const db = await getDb();
  const collection = db.collection<CourseRecord>(COURSES_COLLECTION);

  await collection.createIndex({ slug: 1 }, { unique: true });
  await collection.createIndex({ status: 1, updatedAt: -1 });

  return collection;
}

export async function listCourses() {
  const collection = await coursesCollection();
  return collection
    .find(
      {},
      {
        projection: {
          _id: 0,
          slug: 1,
          title: 1,
          subtitle: 1,
          description: 1,
          status: 1,
          version: 1,
          stats: 1,
          updatedAt: 1
        }
      }
    )
    .sort({ updatedAt: -1 })
    .toArray();
}

export async function getCourseBySlug(slug: string) {
  const collection = await coursesCollection();
  return collection.findOne({ slug } as Filter<CourseRecord>, { projection: { _id: 0 } });
}

export async function getCourseBySlugForStudy(slug: string) {
  const collection = await coursesCollection();
  return collection.findOne(
    { slug } as Filter<CourseRecord>,
    {
      projection: {
        _id: 0,
        "modules.markdown": 0
      }
    }
  );
}

export async function upsertCourse(course: CourseRecord) {
  const collection = await coursesCollection();
  await collection.updateOne(
    { slug: course.slug } as Filter<CourseRecord>,
    {
      $set: course
    },
    { upsert: true }
  );

  return getCourseBySlug(course.slug);
}

export async function createCourse(course: OptionalUnlessRequiredId<CourseRecord>) {
  const collection = await coursesCollection();
  await collection.insertOne(course);
  return getCourseBySlug(course.slug);
}
