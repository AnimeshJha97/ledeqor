import type { CourseModuleRecord } from "@/server/courses/types";

export type GeneratedQuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type StudyPracticePack = {
  flashcards: { front: string; back: string }[];
  quiz: GeneratedQuizQuestion[];
  shortAnswers: string[];
  interviewPrompts: string[];
  codingTasks: string[];
};

function pickLectureTitles(module: CourseModuleRecord, count: number) {
  return module.lectures.slice(0, count).map((lecture) => lecture.title);
}

export function buildPracticePack(module: CourseModuleRecord): StudyPracticePack {
  const lectureTitles = pickLectureTitles(module, 8);
  const primary = lectureTitles[0] ?? module.title;
  const secondary = lectureTitles[1] ?? module.outcome;
  const third = lectureTitles[2] ?? "the product workflow";

  return {
    flashcards: lectureTitles.slice(0, 6).map((title) => ({
      front: `Explain: ${title}`,
      back: `Connect "${title}" to ${module.title} and describe how it helps the course project or interview story.`
    })),
    quiz: [
      {
        question: `What is the main purpose of ${module.title}?`,
        options: [module.purpose, "To memorize definitions only", "To skip the capstone project", "To replace all backend work with prompts"],
        answerIndex: 0,
        explanation: "The module purpose is the strongest summary of why this module exists in the learning path."
      },
      {
        question: `Which lecture should you be able to explain first in this module?`,
        options: [primary, secondary, third, "A future unrelated lesson"],
        answerIndex: 0,
        explanation: "The first lecture sets the conceptual foundation for the rest of the module."
      },
      {
        question: "What is the best study pattern for this course?",
        options: [
          "Read, explain in your own words, practice, then connect it to the project",
          "Only skim headings",
          "Skip labs until the end",
          "Memorize answers without building"
        ],
        answerIndex: 0,
        explanation: "The app is designed around understanding, active recall, and product proof."
      }
    ],
    shortAnswers: [
      `Explain ${primary} in your own words.`,
      `How does ${module.title} move the course project forward?`,
      `What is still confusing in this module, and what would you ask a senior engineer?`
    ],
    interviewPrompts: [
      `Explain ${module.title} to an interviewer in 90 seconds.`,
      `Give one production risk related to ${module.title}.`,
      `Connect ${secondary} to a real AI product decision.`
    ],
    codingTasks: [
      `Create or update one file that supports the ${module.title} part of the capstone.`,
      `Write a small test or checklist for ${primary}.`,
      `Document the API, schema, or UI state needed for this module's product feature.`
    ]
  };
}
