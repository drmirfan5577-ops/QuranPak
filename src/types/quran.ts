export interface SurahMeta {
  n: number;
  a: string;       // Arabic name
  e: string;       // English name
  u: string;       // Urdu name
  ayahs: number;
  type: 'Meccan' | 'Medinan';
  juz: number;
  hasBismillah: boolean;
}

export interface AyahData {
  n: number;
  globalNumber: number;
  arabic: string;
  urdu: string;
  arabicAudioUrl: string;
  urduAudioUrl: string;
  juz: number;
  page: number;
  sajda?: boolean;
}

export interface WordData {
  position: number;
  arabic: string;
  transliteration: string;
  translations: Record<string, string>; // lang -> translation
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'audio' | 'video' | 'book' | 'tafsir' | 'translation' | 'channel' | 'link';
  category: string;
  author: string;
  language: string;
  url: string;
  description: string;
  surah_start?: number | null;
  surah_end?: number | null;
  added_at: string;
}

export interface Reciter {
  id: string;
  name: string;
  nameAr: string;
}

export interface Translation {
  id: string;
  name: string;
}

export interface TafsirEdition {
  id: string;
  name: string;
  nameAr: string;
  author: string;
  lang: string;
}

export type ThemeId =
  | 'pearl' | 'aurora' | 'crystal' | 'sunrise' | 'emerald' | 'royal'
  | 'roseGarden' | 'midnightBlue' | 'desertGold' | 'skyAzure' | 'sakura' | 'mintBreeze';

export interface Theme {
  id: ThemeId;
  name: string;
  nameUr: string;
  bgClass: string;
  orb1: string;
  orb2: string;
  orb3: string;
  accent: string;
  accentLight: string;
  bismillahColor: string;
  bismillahGlow: string;
  cardBg?: string;
  textColor?: string;
}

export type TabId = 'read' | 'juz' | 'bookmarks' | 'library' | 'tafseer' | 'bayan' | 'admin';

export type ReadingMode =
  | 'standard'    // Arabic + Urdu
  | 'mushaf'      // Arabic only (mushaf style)
  | 'urdu-only'   // Urdu translation only
  | 'tajweed'     // Color-coded tajweed Arabic
  | 'multicolor'  // Each ayah in different vibrant color
  | 'wordbyword'  // Word-by-word with multi-language
  | 'pdf';        // PDF Quran viewer

export type FontWeight = 'normal' | 'bold' | 'extrabold';
export type TextGlow   = 'none' | 'subtle' | 'strong';
export type TextAnim   = 'none' | 'pulse' | 'shimmer' | 'float';

export interface TextStyle {
  fontWeight: FontWeight;
  glow: TextGlow;
  animation: TextAnim;
  arabicFontSize: number;
  urduFontSize: number;
}

export interface JuzInfo {
  juz: number;
  nameAr: string;
  nameUr: string;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
}
