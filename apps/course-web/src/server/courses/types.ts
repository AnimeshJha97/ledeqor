export type CourseLectureRecord = {
  id: string;
  title: string;
  anchor: string;
  kind?: "concept" | "build" | "strategy";
};

export type CourseModuleRecord = {
  id: number;
  slug: string;
  title: string;
  purpose: string;
  outcome: string;
  status: "complete" | "outline" | "planned";
  sourceFile: string;
  labSlug?: string;
  lectures: CourseLectureRecord[];
  markdown: string;
};

export type CourseRecord = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: "draft" | "published";
  version: number;
  modules: CourseModuleRecord[];
  stats: {
    moduleCount: number;
    lectureCount: number;
    completedModuleCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type LearnerLectureProgress = {
  moduleSlug: string;
  lectureId: string;
  status: "not_started" | "reading" | "done" | "needs_revision";
  updatedAt: Date;
};

export type LearnerCourseProgress = {
  courseSlug: string;
  learnerId: string;
  lectures: LearnerLectureProgress[];
  completedModules: string[];
  quizScores: {
    moduleSlug: string;
    score: number;
    total: number;
    updatedAt: Date;
  }[];
  selfRatings: {
    moduleSlug: string;
    lectureId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    updatedAt: Date;
  }[];
  updatedAt: Date;
};
