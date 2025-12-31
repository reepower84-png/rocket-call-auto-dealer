import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  created_at: string;
  status: 'pending' | 'contacted' | 'completed';
};
