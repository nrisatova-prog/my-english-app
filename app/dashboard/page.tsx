
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Language = "ru" | "en";

const sections = [
  { icon: "🎓", ru: "Мои уроки", en: "My lessons", detail: "A1–C2", href: "/courses" },
  { icon: "📚", ru: "Слова", en: "Vocabulary", detail: "10 words a day", href: "/#today" },
  { icon: "📘", ru: "Грамматика", en: "Grammar", detail: "Rules & practice", href: "/#tenses" },
  { icon: "🔤", ru: "Глаголы", en: "Verbs", detail: "Regular & irregular", href: "/#verbs" },
  { icon: "🎤", ru: "Разговор", en: "Speaking", detail: "Conversation", href: "/#speaking" },
  { icon: "✍️", ru: "Письмо", en: "Writing", detail: "Writing practice", href: "/#writing" },
  { icon: "🎧", ru: "Произношение", en: "Pronunciation", detail: "Listen to daily words", href: "/#today" },
  { icon: "🎬", ru: "Фильмы и книги", en: "Films & books", detail: "Learn with stories", href: "/#speaking" },
];

const tasks = [
  { ru: "Новый урок", en: "New lesson", minutes: 10 },
  { ru: "Разговорная практика", en: "Speaking practice", minutes: 7 },
  { ru: "Письменное задание", en: "Writing task", minutes: 5 },
  { ru: "Аудирование", en: "Listening", minutes: 5 },
  { ru: "Повторение слов", en: "Vocabulary review", minutes: 3 },
];

export default function DashboardPage() {
  const [language, setLanguage] = useState<Language>("ru");
  const [duration, setDuration] = useState(30);
  const [completed, setCompleted] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const savedLanguage = localStorage.getItem("myenglish-language");
        const savedDuration = localStorage.getItem("myenglish-duration");
        const savedTasks = localStorage.getItem("myenglish-dashboard-tasks");

        if (savedLanguage === "ru" || savedLanguage === "en") {
          setLanguage(savedLanguage);
        }

        if (savedDuration) {
          const value = Number(savedDuration);
          if ([15, 30, 45, 60].includes(value)) setDuration(value);
        }

        if (savedTasks) {
          const parsed: unknown = JSON.parse(savedTasks);
          if (Array.isArray(parsed)) {
            setCompleted(
              parsed.filter(
                (n): n is number =>
                  typeof n === "number" &&
                  Number.isInteger(n) &&
                  n >= 0 &&
                  n < tasks.length
              )
            );
          }
        }
      } catch {
        // If saved settings are unavailable, use defaults.
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("myenglish-language", language);
    localStorage.setItem("myenglish-duration", String(duration));
    localStorage.setItem(
      "myenglish-dashboard-tasks",
      JSON.stringify(completed)
    );
  }, [language, duration, completed, ready]);

  function toggleTask(index: number) {
    setCompleted((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  const translate = (ru: string, en: string) =>
    language === "ru" ? ru : en;

  const progress = Math.round((completed.length / tasks.length) * 100);

  return (
    <main className="min-h-screen bg-[#eef5ff] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">

        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-3 text-2xl text-white">
              📖
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-950">
                My English
              </h1>
              <p className="text-sm text-slate-500">
                English Learning Course
              </p>
            </div>
          </div>

          <div className="flex rounded-xl bg-white p-1 shadow-sm">
            {(["ru", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  language === lang
                    ? "bg-blue-600 text-white"
                    : "text-slate-600"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-sky-500 p-6 text-white shadow-lg">
          <p className="text-sm text-blue-100">
            {translate("Твой курс английского", "Your English course")}
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {translate("Продолжим обучение!", "Let's keep learning!")}
          </h2>
          <p className="mt-3 text-blue-100">
            {translate(
              "Учись говорить, писать и понимать английский.",
              "Learn to speak, write and understand English."
            )}
          </p>
          <div className="mt-5 rounded-xl bg-white/20 p-3">
            <p className="font-semibold">A1 → A2 → B1 → B2 → C1 → C2</p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            {translate("Время обучения", "Study duration")}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {translate(
              "Выбери, сколько минут хочешь заниматься.",
              "Choose how long you want to study."
            )}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[15, 30, 45, 60].map((minutes) => (
              <button
                key={minutes}
                onClick={() => setDuration(minutes)}
                className={`rounded-xl px-5 py-3 font-semibold ${
                  duration === minutes
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-800"
                }`}
              >
                {minutes} {translate("мин", "min")}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {translate("Мой план на сегодня", "Today's study plan")}
            </h2>
            <span className="font-semibold text-blue-600">{progress}%</span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-5 space-y-3">
            {tasks.map((task, index) => (
              <label
                key={index}
                className="flex cursor-pointer items-center gap-3 rounded-2xl bg-blue-50 p-4"
              >
                <input
                  type="checkbox"
                  checked={completed.includes(index)}
                  onChange={() => toggleTask(index)}
                  className="h-5 w-5 accent-blue-600"
                />
                <span className="flex-1 font-medium">
                  {translate(task.ru, task.en)}
                </span>
                <span className="text-sm text-slate-500">
                  {task.minutes} min
                </span>
              </label>
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-500">
            {translate(
              `Выбрано ${duration} минут. Это пример плана, который позже станет адаптивным.`,
              `${duration} minutes selected. This sample plan will become adaptive later.`
            )}
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold">
            {translate("Разделы обучения", "Learning sections")}
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {sections.map((section) => (
  <Link
    key={section.en}
   href={section.href}
    className="block rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
                <div className="mb-3 text-3xl">{section.icon}</div>
                <h3 className="font-bold text-blue-950">
                  {translate(section.ru, section.en)}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {section.detail}
                </p>
               <span className="mt-3 inline-block text-xs text-blue-600">
  {translate("Открыть →", "Open →")}
</span>
</Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">
            {translate("Твоё обучение", "Your learning")}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {translate(
              "Старые уроки пока доступны на прежней главной странице.",
              "Your existing lessons remain on the original homepage."
            )}
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            {translate("Открыть старые уроки", "Open existing lessons")}
          </Link>
        </section>
      </div>
    </main>
  );
}
