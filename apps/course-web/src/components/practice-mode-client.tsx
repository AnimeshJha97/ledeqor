"use client";

import { useState, useTransition } from "react";
import type { StudyPracticePack } from "@/lib/study-tools";

type Analysis = {
  score?: number;
  strengths?: string[];
  gaps?: string[];
  improved_answer_outline?: string[];
  next_practice_tip?: string;
  raw?: string;
};

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
  const [practiceQuestion, setPracticeQuestion] = useState(pack.interviewPrompts[0] ?? "");
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [shortAnswers, setShortAnswers] = useState<Record<string, string>>({});
  const [savedShortAnswers, setSavedShortAnswers] = useState<Record<string, boolean>>({});
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
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

  function analyzeAnswer() {
    setAnalysis(null);
    startTransition(async () => {
      const response = await fetch("/api/interview-practice/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          moduleSlug,
          question: practiceQuestion,
          answer: practiceAnswer
        })
      });
      const payload = await response.json();
      setAnalysis(payload.analysis ?? { raw: payload.error ?? "Unable to analyze answer." });
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
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => setRevealed((value) => !value)} className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950">
                {revealed ? "Hide answer" : "Reveal answer"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveFlashcard((activeFlashcard + 1) % pack.flashcards.length);
                  setRevealed(false);
                }}
                className="rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200"
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
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" disabled={!answeredAll || isPending} onClick={submitQuiz} className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">
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
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  disabled={isPending || (shortAnswers[prompt] ?? "").trim().length < 5}
                  onClick={() => saveShortAnswer(prompt)}
                  className="rounded-md border border-line px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
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
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Interview practice</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">One answer at a time</h2>
        <select value={practiceQuestion} onChange={(event) => setPracticeQuestion(event.target.value)} className="mt-5 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-slate-200">
          {pack.interviewPrompts.map((prompt) => (
            <option key={prompt} value={prompt}>{prompt}</option>
          ))}
        </select>
        <textarea
          value={practiceAnswer}
          onChange={(event) => setPracticeAnswer(event.target.value)}
          rows={7}
          className="mt-3 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm leading-6 text-slate-200 outline-none transition focus:border-brand"
          placeholder="Write your answer like you are speaking in an interview..."
        />
        <button type="button" disabled={isPending || practiceAnswer.trim().length < 20} onClick={analyzeAnswer} className="mt-3 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">
          Analyze answer
        </button>
        {analysis ? (
          <div className="mt-5 rounded-md border border-line bg-panel p-4">
            {typeof analysis.score === "number" ? <p className="text-lg font-semibold text-brand">Score: {analysis.score}/10</p> : null}
            <AnalysisList title="Strengths" items={analysis.strengths} />
            <AnalysisList title="Gaps" items={analysis.gaps} />
            <AnalysisList title="Improved outline" items={analysis.improved_answer_outline} />
            {analysis.next_practice_tip ? <p className="mt-3 text-sm leading-6 text-muted"><span className="font-semibold text-ink">Next tip:</span> {analysis.next_practice_tip}</p> : null}
            {analysis.raw ? <p className="text-sm leading-6 text-muted">{analysis.raw}</p> : null}
          </div>
        ) : null}
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

function AnalysisList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-2 grid gap-1 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
