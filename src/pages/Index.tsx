import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  BookOpen, Library, Book, Radio, Plus, Settings, Bookmark,
  ChevronLeft, ChevronRight, Loader2, AlertCircle, Grid3x3,
  Search, Star,
} from 'lucide-react';
import { SURAHS, TAFSIR_EDITIONS, THEMES } from '@/constants/quran';
import type { ThemeId, TabId, ReadingMode, TextStyle } from '@/types/quran';

import ThemeBackground from '@/components/ThemeBackground';
import SurahList from '@/components/SurahList';
import BismillahDisplay from '@/components/BismillahDisplay';
import AyahCard from '@/components/AyahCard';
import AudioPlayerBar from '@/components/AudioPlayerBar';
import SettingsModal from '@/components/SettingsModal';
import LibraryTab from '@/components/LibraryTab';
import TafseerTab from '@/components/TafseerTab';
import BayanTab from '@/components/BayanTab';
import AdminPanel from '@/components/AdminPanel';
import DailyAyahWidget from '@/components/DailyAyahWidget';
import JuzNavigation from '@/components/JuzNavigation';
import BookmarksPage from '@/components/BookmarksPage';
import ReadingModeBar from '@/components/ReadingModeBar';
import WordByWordView from '@/components/WordByWordView';
import PDFViewer from '@/components/PDFViewer';
import { TajweedLegend } from '@/components/TajweedAyah';
import FifteenLineView from '@/components/FifteenLineView';
import { useQuranReader } from '@/hooks/useQuranReader';
import { useBookmarks, useLibrary } from '@/hooks/useSupabaseData';

// ─── localStorage helpers ────────────────────────────────────────
function lsGet<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function lsSet(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

const DEFAULT_TEXT_STYLE: TextStyle = {
  fontWeight: 'normal',
  glow: 'none',
  animation: 'none',
  arabicFontSize: 28,
  urduFontSize: 17,
};

// ─── Tabs ────────────────────────────────────────────────────────
const TABS = [
  { id: 'read'      as TabId, label: 'قرآن',       en: 'Read',      icon: BookOpen },
  { id: 'juz'       as TabId, label: 'پارہ',        en: 'Juz',       icon: Grid3x3  },
  { id: 'bookmarks' as TabId, label: 'بک مارکس',   en: 'Saved',     icon: Bookmark },
  { id: 'library'   as TabId, label: 'لائبریری',   en: 'Library',   icon: Library  },
  { id: 'tafseer'   as TabId, label: 'تفاسیر',     en: 'Tafseer',   icon: Book     },
  { id: 'bayan'     as TabId, label: 'بیان',        en: 'Bayan',     icon: Radio    },
  { id: 'admin'     as TabId, label: 'ایڈمن',      en: 'Admin',     icon: Plus     },
];

export default function Index() {
  // Persisted prefs
  const [themeId, setThemeId]         = useState<ThemeId>(() => lsGet('qTheme', 'aurora'));
  const [reciterId, setReciterId]     = useState(() => lsGet('qReciter', 'ar.saadalghamdi'));
  const [urduAudioId, setUrduAudioId] = useState(() => lsGet('qUrduAudio', 'ur.khan'));
  const [urduTextId, setUrduTextId]   = useState(() => lsGet('qUrduText', 'ur.junagarhi'));
  const [tafsirId, setTafsirId]       = useState(() => lsGet('qTafsir', 'ar.muyassar'));
  const [surahNum, setSurahNum]       = useState(() => lsGet('qSurah', 1));
  const [readingMode, setReadingMode] = useState<ReadingMode>(() => lsGet('qMode', 'standard'));
  const [textStyle, setTextStyle]     = useState<TextStyle>(() => lsGet('qTextStyle', DEFAULT_TEXT_STYLE));
  const [wbwLang, setWbwLang]         = useState(() => lsGet('qWbwLang', 'en'));
  const [tab, setTab]                 = useState<TabId>('read');
  const [showSettings, setShowSettings] = useState(false);

  // Persist prefs
  useEffect(() => { lsSet('qTheme',      themeId);     }, [themeId]);
  useEffect(() => { lsSet('qReciter',    reciterId);   }, [reciterId]);
  useEffect(() => { lsSet('qUrduAudio',  urduAudioId); }, [urduAudioId]);
  useEffect(() => { lsSet('qUrduText',   urduTextId);  }, [urduTextId]);
  useEffect(() => { lsSet('qTafsir',     tafsirId);    }, [tafsirId]);
  useEffect(() => { lsSet('qSurah',      surahNum);    }, [surahNum]);
  useEffect(() => { lsSet('qMode',       readingMode); }, [readingMode]);
  useEffect(() => { lsSet('qTextStyle',  textStyle);   }, [textStyle]);
  useEffect(() => { lsSet('qWbwLang',    wbwLang);     }, [wbwLang]);

  const theme      = useMemo(() => THEMES.find(t => t.id === themeId) || THEMES[1], [themeId]);
  const surahMeta  = useMemo(() => SURAHS.find(s => s.n === surahNum) || SURAHS[0], [surahNum]);
  const activeTafsir = useMemo(() => TAFSIR_EDITIONS.find(t => t.id === tafsirId) || TAFSIR_EDITIONS[0], [tafsirId]);

  // ─── Reader hook ──────────────────────────────────────────────
  const {
    ayahs, loading, error,
    audioRef, player, updatePlayer,
    togglePlay, playAyah, prevAyah, nextAyah, handleAudioEnded,
  } = useQuranReader({ surahNum, reciterId, urduAudioId, urduTextId });

  // ─── Supabase data ───────────────────────────────────────────
  const {
    bookmarks, toggleBookmark, isBookmarked, removeBookmark,
  } = useBookmarks();
  const { items: libraryItems, addItem, deleteItem } = useLibrary();

  // ─── Navigate to ayah ─────────────────────────────────────────
  const navigateToAyah = useCallback((s: number, _a: number) => {
    setSurahNum(s);
    setTab('read');
  }, []);

  // ─── Bismillah logic ──────────────────────────────────────────
  const showBismillahBanner = surahMeta.n !== 1 && surahMeta.n !== 9;

  // ─── Rendering mode helpers ───────────────────────────────────
  const isWordByWord  = readingMode === 'wordbyword';
  const isPDF         = readingMode === 'pdf';
  const is15Line      = (readingMode as string) === '15line';
  const showAyahList  = !isWordByWord && !isPDF && !is15Line;

  return (
    <div className="min-h-screen" dir="rtl">
      <ThemeBackground theme={theme} />
      <audio ref={audioRef} onEnded={handleAudioEnded} preload="auto" />

      {/* ─── Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 player-float border-b border-white/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2.5">
          <div className="flex items-center gap-2 justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
              >
                <BookOpen size={15} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900 font-quran leading-tight" dir="rtl">قرآن پاک</div>
                <div className="text-[9px] text-gray-500 leading-tight">تلاوت · ترجمہ · تفسیر · بیان القرآن</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0.5 bg-black/5 rounded-full p-0.5 overflow-x-auto flex-1 mx-2 max-w-[600px]">
              {TABS.map(t => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-full transition-all duration-150 whitespace-nowrap relative"
                    style={active ? {
                      background: 'rgba(255,255,255,0.95)',
                      color: theme.accent,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    } : { color: '#6b7280' }}
                  >
                    <Icon size={11} />
                    <span className="hidden lg:inline">{t.en}</span>
                    <span className="lg:hidden">{t.label}</span>
                    {t.id === 'bookmarks' && bookmarks.length > 0 && (
                      <span
                        className="absolute -top-1 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ background: theme.accent }}
                      >
                        {bookmarks.length > 9 ? '9+' : bookmarks.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Settings */}
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-1 px-2.5 py-2 rounded-full text-[11px] font-medium text-gray-600 hover:bg-white/80 transition-all shrink-0"
            >
              <Settings size={13} />
              <span className="hidden sm:inline">ترتیبات</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main ────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-3 sm:px-5 py-4">

        {/* ── READ TAB ── */}
        {tab === 'read' && (
          <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-4">

            {/* Surah sidebar */}
            <div className="lg:sticky lg:top-16 lg:self-start lg:max-h-[calc(100vh-80px)]">
              <SurahList current={surahNum} onSelect={setSurahNum} theme={theme} />
            </div>

            {/* Reader column */}
            <div className="space-y-3 pb-28">

              {/* Daily Ayah Widget */}
              <DailyAyahWidget theme={theme} onNavigate={navigateToAyah} />

              {/* Surah header */}
              <div className="glass-card-strong rounded-2xl p-4 sm:p-5 animate-fade-in-up">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase"
                        style={{ background: `${theme.accent}18`, color: theme.bismillahColor }}>
                        سورہ {surahMeta.n}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold"
                        style={{
                          background: surahMeta.type === 'Meccan' ? '#b4530910' : '#15803d10',
                          color: surahMeta.type === 'Meccan' ? '#b45309' : '#15803d',
                        }}>
                        {surahMeta.type === 'Meccan' ? 'مکی' : 'مدنی'}
                      </span>
                      <span className="text-[10px] text-gray-400">{surahMeta.ayahs} آیات · پارہ {surahMeta.juz}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 font-quran leading-tight" dir="rtl">
                      {surahMeta.a}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">{surahMeta.e} · {surahMeta.u}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSurahNum(Math.max(1, surahNum - 1))} disabled={surahNum === 1}
                      className="p-2.5 rounded-full border border-white/80 hover:bg-white/80 disabled:opacity-30 transition-all">
                      <ChevronRight size={15} />
                    </button>
                    <button onClick={() => setSurahNum(Math.min(114, surahNum + 1))} disabled={surahNum === 114}
                      className="p-2.5 rounded-full border border-white/80 hover:bg-white/80 disabled:opacity-30 transition-all">
                      <ChevronLeft size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Reading mode bar */}
              <ReadingModeBar mode={readingMode} onChange={setReadingMode} theme={theme} />

              {/* Tajweed legend */}
              {readingMode === 'tajweed' && (
                <div className="glass-card rounded-xl px-4 py-3">
                  <p className="text-[11px] font-semibold text-gray-600 mb-1">تجوید رنگ کوڈ:</p>
                  <TajweedLegend />
                </div>
              )}

              {/* Bismillah banner */}
              {showBismillahBanner && readingMode !== 'urdu-only' && (
                <BismillahDisplay theme={theme} size="md" />
              )}

              {/* Loading */}
              {loading && (
                <div className="glass-card rounded-2xl py-16 flex flex-col items-center gap-3">
                  <Loader2 size={22} className="animate-spin" style={{ color: theme.accent }} />
                  <p className="text-sm text-gray-500">سورہ لوڈ ہو رہی ہے...</p>
                </div>
              )}

              {/* Error */}
              {error && !loading && (
                <div className="glass-card rounded-2xl py-10 flex flex-col items-center gap-3">
                  <AlertCircle size={22} className="text-red-400" />
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              {/* 15-Line mode */}
              {!loading && !error && is15Line && (
                <FifteenLineView ayahs={ayahs} theme={theme} textStyle={textStyle} />
              )}

              {/* Word-by-Word mode */}
              {!loading && !error && isWordByWord && (
                <WordByWordView
                  surahNum={surahNum}
                  theme={theme}
                  selectedLang={wbwLang}
                  onLangChange={setWbwLang}
                  fontSize={textStyle.arabicFontSize}
                />
              )}

              {/* PDF mode */}
              {isPDF && <PDFViewer theme={theme} />}

              {/* Standard ayah list */}
              {!loading && !error && showAyahList && ayahs.map((ayah, idx) => (
                <AyahCard
                  key={ayah.n}
                  ayah={ayah}
                  surahNum={surahNum}
                  isActive={idx === player.currentIdx}
                  isPlaying={player.isPlaying}
                  phase={idx === player.currentIdx ? player.phase : 'idle'}
                  isBookmarked={isBookmarked(surahNum, ayah.n)}
                  onPlay={() => playAyah(idx)}
                  onBookmark={() => toggleBookmark(
                    surahNum, ayah.n,
                    surahMeta.a, surahMeta.u,
                    ayah.arabic, ayah.urdu
                  )}
                  theme={theme}
                  activeTafsir={activeTafsir}
                  textStyle={textStyle}
                  readingMode={readingMode as any}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── JUZ TAB ── */}
        {tab === 'juz' && (
          <div className="max-w-xl mx-auto">
            <JuzNavigation
              theme={theme}
              currentSurah={surahNum}
              onSelectSurah={(s) => { setSurahNum(s); setTab('read'); }}
            />
          </div>
        )}

        {/* ── BOOKMARKS TAB ── */}
        {tab === 'bookmarks' && (
          <BookmarksPage
            theme={theme}
            bookmarks={bookmarks}
            onRemove={removeBookmark}
            onNavigate={navigateToAyah}
          />
        )}

        {/* ── LIBRARY TAB ── */}
        {tab === 'library' && (
          <LibraryTab
            items={libraryItems as any}
            theme={theme}
            onDelete={deleteItem}
            onAddClick={() => setTab('admin')}
          />
        )}

        {/* ── TAFSEER TAB ── */}
        {tab === 'tafseer' && (
          <TafseerTab
            theme={theme}
            activeTafsirId={tafsirId}
            onSetTafsir={id => { setTafsirId(id); setTab('read'); }}
            libraryItems={libraryItems as any}
          />
        )}

        {/* ── BAYAN TAB ── */}
        {tab === 'bayan' && (
          <BayanTab
            theme={theme}
            libraryItems={libraryItems as any}
            onAddClick={() => setTab('admin')}
          />
        )}

        {/* ── ADMIN TAB ── */}
        {tab === 'admin' && (
          <AdminPanel
            theme={theme}
            onThemeChange={setThemeId}
            textStyle={textStyle}
            onTextStyleChange={setTextStyle}
            reciterId={reciterId}
            onReciterChange={setReciterId}
            urduTextId={urduTextId}
            onUrduTextChange={setUrduTextId}
            urduAudioId={urduAudioId}
            onUrduAudioChange={setUrduAudioId}
            tafsirId={tafsirId}
            onTafsirChange={setTafsirId}
          />
        )}
      </main>

      {/* ─── Sticky Audio Player ──────────────────────────────────── */}
      {tab === 'read' && ayahs.length > 0 && !isPDF && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-5 pb-3">
          <div className="max-w-4xl mx-auto">
            <AudioPlayerBar
              player={player}
              totalAyahs={ayahs.length}
              surahMeta={surahMeta}
              reciterId={reciterId}
              loading={loading}
              theme={theme}
              onTogglePlay={togglePlay}
              onPrev={prevAyah}
              onNext={nextAyah}
              onUpdate={updatePlayer}
            />
          </div>
        </div>
      )}

      {/* ─── Settings Modal ───────────────────────────────────────── */}
      {showSettings && (
        <SettingsModal
          reciterId={reciterId}
          urduAudioId={urduAudioId}
          urduTextId={urduTextId}
          tafsirId={tafsirId}
          theme={theme}
          fontSize={textStyle.arabicFontSize}
          onClose={() => setShowSettings(false)}
          onReciterChange={setReciterId}
          onUrduAudioChange={setUrduAudioId}
          onUrduTextChange={setUrduTextId}
          onTafsirChange={setTafsirId}
          onThemeChange={setThemeId}
          onFontSizeChange={v => setTextStyle(s => ({ ...s, arabicFontSize: v }))}
        />
      )}
    </div>
  );
}
