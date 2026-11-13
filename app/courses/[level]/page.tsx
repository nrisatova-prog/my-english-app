
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";
const validLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

function LevelPageContent() {
  const params = useParams();
  const level = String(params.level || "").toUpperCase();
  const valid = validLevels.includes(level);

  return (
    <main className="min-h-screen bg-[#eef5ff] p-5">
      <div className="mx-auto max-w-3xl space-y-5">
        <Link href="/courses" className="text-blue-700">
          ← Все уровни
        </Link>

        {valid ? (
          <>
            <div className="rounded-3xl bg-blue-600 p-6 text-white">
              <p className="text-sm text-blue-100">My English</p>
              <h1 className="mt-2 text-3xl font-bold">
                Уровень {level}
              </h1>
              <p className="mt-2">
                Выбери режим обучения
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">📖 Изучение</h2>
                <p className="mt-2 text-slate-600">
                  Сначала теория и примеры, затем упражнения.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-3 text-white"
                >
                  Открыть старые уроки
                </Link>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">✍️ Практика</h2>
                <p className="mt-2 text-slate-600">
                  Сначала задания, затем объяснение ошибок.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-3 text-white"
                >
                  Открыть упражнения
                </Link>
              </div>
            </div>

            <p className="text-sm text-slate-500">
              На следующем этапе подключим уроки и упражнения
              именно выбранного уровня.
            </p>
          </>
        ) : (
          <p>Такой уровень не найден.</p>
        )}
      </div>
    </main>
  );
}
export default function LevelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-blue-50 p-8 text-blue-700">
        Загружаем уроки My English...
      </div>
    }>
      <LevelPageContent />
    </Suspense>
  );
}