
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        setMessage(
          "Не удалось войти. Проверь email, пароль и подтверждение почты."
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setMessage(
        "Ошибка подключения к Supabase. Попробуй ещё раз."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="mb-3 text-3xl font-bold">
        💜 Вход в My English
      </h1>

      <p className="mb-8 text-gray-600">
        Продолжай изучать английский от A1 до C2!
      </p>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-medium"
          >
            Электронная почта
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block font-medium"
          >
            Пароль
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Введи пароль"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Выполняется вход..." : "Войти"}
        </button>
      </form>

      {message && (
        <p
          role="alert"
          className="mt-4 text-sm text-red-600"
        >
          {message}
        </p>
      )}

      <p className="mt-6 text-center">
        Нет аккаунта?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 underline"
        >
          Зарегистрироваться
        </Link>
      </p>

      <Link
        href="/"
        className="mt-6 block text-center text-gray-600 underline"
      >
        Вернуться к урокам
      </Link>
    </main>
  );
}
