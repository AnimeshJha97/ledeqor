"use client";

import { useState, useTransition } from "react";
import type { StudyPracticePack } from "@/lib/study-tools";

export function PracticeModeClient({
  courseSlug,
  moduleSlug,
  pack
}: {
  courseSlug: string;
  moduleSlug: string;
  pack: StudyPracticePack;
}) {
  const [activeFlashcard, setActiveFlashcard] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [savedScore, setSavedScore] = useState<string | null>(null);
  const [shortAnswers, setShortAnswers] = useState<Record<string, string>>({});
  const [savedShortAnswers, setSavedShortAnswers] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();

  const score = pack.quiz.reduce((total, question, index) => total + (answers[index] === question.answerIndex ? 1 : 0), 0);
  const answeredAll = Object.keys(answers).length === pack.quiz.length;
  const flashcard = pack.flashcards[activeFlashcard];

  function submitQuiz() {
    startTransition(async () => {
      await fetch("/api/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "quiz",
          courseSlug,
          moduleSlug,
          score,
          total: pack.quiz.length
        })
      });
      setSavedScore(`${score}/${pack.quiz.length} saved`);
    });
  }

  function saveShortAnswer(prompt: string) {
    startTransition(async () => {
      await fetch("/api/practice/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          moduleSlug,
          prompt,
          answer: shortAnswers[prompt],
          kind: "short_answer"
        })
      });
      setSavedShortAnswers((current) => ({ ...current, [prompt]: true }));
    });
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-line bg-surface p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Flashcards</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Active recall</h2>
          </div>
          <p className="text-sm font-semibold text-slate-300">{activeFlashcard + 1}/{pack.flashcards.length}</p>
        </div>
        {flashcard ? (
          <div className="mt-5 rounded-md border border-line bg-panel p-5">
            <p className="text-lg font-semibold text-ink">{flashcard.front}</p>
            {revealed ? <p className="mt-4 text-sm leading-6 text-muted">{flashcard.back}</p> : null}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={() => setRevealed((value) => !value)} className="w-full rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 sm:w-auto">
                {revealed ? "Hide answer" : "Reveal answer"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveFlashcard((activeFlashcard + 1) % pack.flashcards.length);
                  setRevealed(false);
                }}
                className="w-full rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 sm:w-auto"
              >
                Next card
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-md border border-line bg-surface p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Quiz</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Check understanding</h2>
        <div className="mt-5 grid gap-4">
          {pack.quiz.map((question, index) => (
            <div key={question.question} className="rounded-md border border-line bg-panel p-4">
              <p className="font-semibold text-ink">{index + 1}. {question.question}</p>
              <div className="mt-3 grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const selected = answers[index] === optionIndex;
                  const correct = answeredAll && optionIndex === question.answerIndex;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                      className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                        correct ? "border-success bg-emerald-400/10 text-emerald-200" : selected ? "border-brand bg-cyan-400/10 text-brand" : "border-line bg-surface text-slate-300 hover:border-brand"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {answeredAll ? <p className="mt-3 text-sm leading-6 text-muted">{question.explanation}</p> : null}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button type="button" disabled={!answeredAll || isPending} onClick={submitQuiz} className="w-full rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
            Save quiz score
          </button>
          <p className="text-sm font-semibold text-slate-300">{answeredAll ? `Score: ${score}/${pack.quiz.length}` : "Answer all questions to score"}</p>
          {savedScore ? <p className="text-sm font-semibold text-success">{savedScore}</p> : null}
        </div>
      </section>

      <section className="rounded-md border border-line bg-surface p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Short answers</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Write before you feel ready</h2>
        <div className="mt-5 grid gap-3">
          {pack.shortAnswers.map((prompt) => (
            <div key={prompt} className="rounded-md border border-line bg-panel p-4">
              <p className="text-sm font-semibold text-slate-300">{prompt}</p>
              <textarea
                value={shortAnswers[prompt] ?? ""}
                onChange={(event) => {
                  setShortAnswers((current) => ({ ...current, [prompt]: event.target.value }));
                  setSavedShortAnswers((current) => ({ ...current, [prompt]: false }));
                }}
                rows={4}
                className="mt-3 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm leading-6 text-slate-200 outline-none transition focus:border-brand"
                placeholder="Write your answer here..."
              />
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  disabled={isPending || (shortAnswers[prompt] ?? "").trim().length < 5}
                  onClick={() => saveShortAnswer(prompt)}
                  className="w-full rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  Save answer
                </button>
                {savedShortAnswers[prompt] ? <p className="text-sm font-semibold text-success">Saved</p> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-md border border-line bg-surface p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Coding tasks</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Turn practice into product work</h2>
        <div className="mt-5 grid gap-3">
          {pack.codingTasks.map((task) => (
            <div key={task} className="rounded-md border border-line bg-panel p-4 text-sm leading-6 text-slate-300">
              {task}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
