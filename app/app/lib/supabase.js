import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ejflpanpfifrjfppdswb.supabase.co";
const supabaseAnonKey = "ΒΑΛΕ_ΤΟ_PUBLISHABLE_KEY_ΣΟΥ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
