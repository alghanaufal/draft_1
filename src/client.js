import { createClient } from "@supabase/supabase-js";
// Inisialisasi Supabase
const supabaseUrl = "https://edxtqukljijnaxqrpvlr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeHRxdWtsamlqbmF4cXJwdmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNDQ5MzgsImV4cCI6MjA1NjcyMDkzOH0.d6vGE6OFZw5864wnGpitmByfyxeBKDwe9UT6vSLUfiw";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);