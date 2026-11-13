
"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Проверь почту и подтверди регистрацию!"
        );
      }
    } catch {
      setMessage("Ошибка подключения. Попробуй ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-3xl font-bold">
        💜 Регистрация My English
      </h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Пароль (минимум 6 символов)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white disabled:opacity-50"
        >
          {loading ? "Подождите..." : "Зарегистрироваться"}
        </button>
      </form>

      {message && (
        <p className="mt-4" role="status">
          {message}
        </p>
      )}

      <p className="mt-6">
        Уже есть аккаунт?{" "}
        <a href="/login" className="text-blue-600 underline">
          Войти
        </a>
      </p>
    </main>
  );
}
