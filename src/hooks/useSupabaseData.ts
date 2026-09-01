import { useState, useEffect, useCallback } from 'react';
import { supabase, getDeviceId } from '@/lib/supabase';
import type { BookmarkRow, LibraryItemRow, DailyAyahRow } from '@/lib/supabase';
import type { MediaItem } from '@/types/quran';

// ─── Bookmarks hook ──────────────────────────────────────────────
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const deviceId = getDeviceId();

  const fetchBookmarks = useCallback(async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('device_id', deviceId)
      .order('created_at', { ascending: false });
    if (data) setBookmarks(data as BookmarkRow[]);
    setLoading(false);
  }, [deviceId]);

  useEffect(() => { fetchBookmarks(); }, [fetchBookmarks]);

  const addBookmark = useCallback(async (
    surahNum: number, ayahNum: number,
    surahNameAr: string, surahNameUr: string,
    ayahArabic: string, ayahUrdu: string,
    note = ''
  ) => {
    const { data } = await supabase.from('bookmarks').insert({
      device_id: deviceId,
      surah_num: surahNum,
      ayah_num: ayahNum,
      surah_name_ar: surahNameAr,
      surah_name_ur: surahNameUr,
      ayah_arabic: ayahArabic,
      ayah_urdu: ayahUrdu,
      note,
    }).select().single();
    if (data) setBookmarks(prev => [data as BookmarkRow, ...prev]);
  }, [deviceId]);

  const removeBookmark = useCallback(async (surahNum: number, ayahNum: number) => {
    await supabase.from('bookmarks')
      .delete()
      .eq('device_id', deviceId)
      .eq('surah_num', surahNum)
      .eq('ayah_num', ayahNum);
    setBookmarks(prev => prev.filter(b => !(b.surah_num === surahNum && b.ayah_num === ayahNum)));
  }, [deviceId]);

  const isBookmarked = useCallback((surahNum: number, ayahNum: number) =>
    bookmarks.some(b => b.surah_num === surahNum && b.ayah_num === ayahNum),
    [bookmarks]);

  const toggleBookmark = useCallback(async (
    surahNum: number, ayahNum: number,
    surahNameAr = '', surahNameUr = '',
    ayahArabic = '', ayahUrdu = ''
  ) => {
    if (isBookmarked(surahNum, ayahNum)) {
      await removeBookmark(surahNum, ayahNum);
    } else {
      await addBookmark(surahNum, ayahNum, surahNameAr, surahNameUr, ayahArabic, ayahUrdu);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  return { bookmarks, loading, toggleBookmark, isBookmarked, removeBookmark, refresh: fetchBookmarks };
}

// ─── Library hook ────────────────────────────────────────────────
export function useLibrary() {
  const [items, setItems] = useState<LibraryItemRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    const { data } = await supabase
      .from('library_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setItems(data as LibraryItemRow[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const addItem = useCallback(async (item: Omit<MediaItem, 'id'>): Promise<boolean> => {
    const { data, error } = await supabase.from('library_items').insert({
      title: item.title,
      type: item.type,
      category: item.category,
      author: item.author,
      language: item.language,
      url: item.url,
      description: item.description,
      surah_start: item.surah_start,
      surah_end: item.surah_end,
      added_at: item.added_at,
    }).select().single();
    if (error) return false;
    if (data) setItems(prev => [data as LibraryItemRow, ...prev]);
    return true;
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    await supabase.from('library_items').delete().eq('id', id);
    setItems(prev => prev.filter(m => m.id !== id));
  }, []);

  return { items, loading, addItem, deleteItem, refresh: fetchItems };
}

// ─── Daily Ayah hook ─────────────────────────────────────────────
export function useDailyAyah() {
  const [dailyAyah, setDailyAyah] = useState<DailyAyahRow | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().slice(0, 10);

  const fetchDailyAyah = useCallback(async () => {
    // Try today's ayah first
    const { data } = await supabase
      .from('daily_ayah')
      .select('*')
      .eq('date', today)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      setDailyAyah(data as DailyAyahRow);
    } else {
      // Fall back to most recent
      const { data: latest } = await supabase
        .from('daily_ayah')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      setDailyAyah(latest as DailyAyahRow | null);
    }
    setLoading(false);
  }, [today]);

  useEffect(() => { fetchDailyAyah(); }, [fetchDailyAyah]);

  const setDailyAyahForToday = useCallback(async (surahNum: number, ayahNum: number, note = '') => {
    const { data } = await supabase.from('daily_ayah').insert({
      surah_num: surahNum,
      ayah_num: ayahNum,
      date: today,
      note,
    }).select().single();
    if (data) setDailyAyah(data as DailyAyahRow);
  }, [today]);

  return { dailyAyah, loading, setDailyAyahForToday, refresh: fetchDailyAyah };
}

// ─── App Settings hook ───────────────────────────────────────────
export function useAppSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from('app_settings').select('*');
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((r: any) => { map[r.key] = r.value; });
      setSettings(map);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const setSetting = useCallback(async (key: string, value: string) => {
    await supabase.from('app_settings').upsert({ key, value, updated_at: new Date().toISOString() });
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  return { settings, setSetting, refresh: fetchSettings };
}
