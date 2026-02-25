import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ejflpanpfifrjfppdswb.supabase.co";
const supabaseAnonKey = "sb_publishable_IVIIyBQjuynZLNgGfROH_Q_msgGjYwz";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
