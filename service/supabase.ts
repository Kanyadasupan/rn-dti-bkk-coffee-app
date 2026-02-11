// ตั้งค่าการเชื่อต่อกับ supabase

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ytomwqlzolozbmmwzseb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0b213cWx6b2xvemJtbXd6c2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxODQ0OTcsImV4cCI6MjA4NTc2MDQ5N30.77dv-FFZEW5X7C4sW8YoXMph9kDFKb1F2HYr69IADQs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);