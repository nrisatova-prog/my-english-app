
"use client";

import Link from "next/link";
import { useState } from "react";

const levels = [
  {
    id: "A1",
    title: "Начальный",
    english: "Beginner",
    description: "Знакомство, семья, простые предложения",
    color: "bg-sky-100",
  },
  {
    id: "A2",
    title: "Базовый",
    english: "Elementary",
    description: "Повседневная жизнь, покупки, путешествия",
    color: "bg-blue-100",
  },
  {
    id: "B1",
    title: "Средний",
    english: "Intermediate",
    description: "Разговоры, письмо, грамматика",
    color: "bg-indigo-100",
  },
  {
    id: "B2",
    title: "Выше среднего",
    english: "Upper Intermediate",
    description: "Дискуссии, сложные тексты",
    color: "bg-violet-100",
  },
  {
    id: "C1",
    title: "Продвинутый",
    english: "Advanced",
    description: "Свободная речь, профессиональный английский",
    color: "bg-cyan-100",
  },
  {
    id: "C2",
    title: "Владение в совершенстве",
    english: "Proficiency",
    description: "Сложные темы, точность и нюансы речи",
    color: "bg-teal-100",
  },
];

export default function CoursesPage() {
  const [language, setLanguage] = useState<"ru" | "en">("ru");

  return (
    <main className="min-h-screen bg-[#eef5ff] p-5 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard" className="text-blue-700">
            ← Назад
          </Link>

          <button
            onClick={() =>
              setLanguage(language === "ru" ? "en" : "ru")
            }
            className="rounded-xl bg-white px-4 py-2 shadow"
          >
            {language === "ru" ? "🇷🇺 RU" : "🇬🇧 EN"}
          </button>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-blue-950">
          {language === "ru" ? "Мои курсы" : "My Courses"}
        </h1>

        <p className="mb-8 text-slate-600">
          {language === "ru"
            ? "Выбери уровень английского языка"
            : "Choose your English level"}
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`rounded-3xl p-6 shadow-sm ${level.color}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-950">
                  {level.id}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs">
                  {level.english}
                </span>
              </div>

              <h2 className="text-xl font-bold">
                {language === "ru" ? level.title : level.english}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {level.description}
              </p>

              <Link
                 href={`/courses/${level.id}`}

                className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                {language === "ru"
                  ? "Открыть уроки →"
                  : "Open lessons →"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
