import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nvmjawpeduyptpmyshwu.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bWphd3BlZHV5cHRwbXlzaHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4OTM3MzMsImV4cCI6MjA3NDQ2OTczM30.VgD-RkOFGUL62MVP9VrprCS0KKg6wbj_jsb8A-NCSf4"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);