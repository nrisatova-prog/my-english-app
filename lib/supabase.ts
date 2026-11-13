
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Не настроено подключение Supabase. Проверь .env.local"
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
