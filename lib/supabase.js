import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env. https://ejflpanpfifrjfppdswb.supabase.co;
const supabaseAnonKey = process.env. sb_publishable_IVIIyBQjuynZLNgGfROH-Q_msgGjYwz;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
