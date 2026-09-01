import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Device ID for anonymous bookmarks
export function getDeviceId(): string {
  let id = localStorage.getItem('qDeviceId');
  if (!id) {
    id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('qDeviceId', id);
  }
  return id;
}

export type BookmarkRow = {
  id: string;
  device_id: string;
  surah_num: number;
  ayah_num: number;
  surah_name_ar: string;
  surah_name_ur: string;
  ayah_arabic: string;
  ayah_urdu: string;
  note: string;
  created_at: string;
};

export type LibraryItemRow = {
  id: string;
  title: string;
  type: string;
  category: string;
  author: string;
  language: string;
  url: string;
  description: string;
  surah_start: number | null;
  surah_end: number | null;
  added_at: string;
  created_at: string;
};

export type DailyAyahRow = {
  id: string;
  surah_num: number;
  ayah_num: number;
  date: string;
  note: string;
  created_at: string;
};
