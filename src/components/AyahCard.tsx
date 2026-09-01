import React, { useState } from 'react';
import { Play, Pause, Bookmark, BookmarkCheck, Book, Loader2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import type { AyahData, Theme, TafsirEdition, TextStyle } from '@/types/quran';
import { API_BASE, AYAH_COLOR_PALETTE } from '@/constants/quran';
import TajweedAyah from '@/components/TajweedAyah';

interface Props {
  ayah: AyahData;
  surahNum: number;
  isActive: boolean;
  isPlaying: boolean;
  phase: 'idle' | 'arabic' | 'urdu';
  isBookmarked: boolean;
  onPlay: () => void;
  onBookmark: () => void;
  theme: Theme;
  activeTafsir: TafsirEdition;
  textStyle: TextStyle;
  readingMode?: 'standard' | 'mushaf' | 'urdu-only' | 'tajweed' | 'multicolor';
}

function getTextShadow(glow: string, glowColor: string): string {
  if (glow === 'subtle') return `0 0 16px ${glowColor}`;
  if (glow === 'strong') return `0 0 30px ${glowColor}, 0 0 60px ${glowColor}80`;
  return 'none';
}

function getAnimClass(anim: string): string {
  if (anim === 'pulse') return 'animate-pulse-glow';
  if (anim === 'shimmer') return 'animate-shimmer';
  if (anim === 'float') return 'animate-float';
  return '';
}

function getFontWeight(fw: string): number {
  if (fw === 'extrabold') return 800;
  if (fw === 'bold') return 700;
  return 500;
}

export default function AyahCard({
  ayah, surahNum, isActive, isPlaying, phase, isBookmarked,
  onPlay, onBookmark, theme, activeTafsir, textStyle,
  readingMode = 'standard',
}: Props) {
  const [showTafsir, setShowTafsir] = useState(false);
  const [tafsirText, setTafsirText] = useState('');
  const [tafsirLoading, setTafsirLoading] = useState(false);

  const colorEntry = AYAH_COLOR_PALETTE[(ayah.n - 1) % AYAH_COLOR_PALETTE.length];

  const handleTafsirToggle = async () => {
    setShowTafsir(v => !v);
    if (!showTafsir && !tafsirText) {
      setTafsirLoading(true);
      try {
        const res = await fetch(`${API_BASE}/ayah/${surahNum}:${ayah.n}/${activeTafsir.id}`);
        const json = await res.json();
        setTafsirText(json?.data?.text || 'تفسیر دستیاب نہیں۔');
      } catch {
        setTafsirText('تفسیر لوڈ نہیں ہو سکی۔');
      } finally {
        setTafsirLoading(false);
      }
    }
  };

  const isCurrentlyPlaying = isActive && isPlaying;
  const phaseLabel = isActive
    ? phase === 'arabic' ? '● عربی تلاوت' : phase === 'urdu' ? '● اردو ترجمہ' : null
    : null;

  const arabicFontSize = textStyle.arabicFontSize;
  const urduFontSize = textStyle.urduFontSize;
  const fontWeight = getFontWeight(textStyle.fontWeight);
  const textShadow = getTextShadow(textStyle.glow, theme.bismillahGlow);
  const animClass = getAnimClass(textStyle.animation);

  // Multi-color card style
  const isMultiColor = readingMode === 'multicolor';
  const isMushaf     = readingMode === 'mushaf';
  const isUrduOnly   = readingMode === 'urdu-only';
  const isTajweed    = readingMode === 'tajweed';

  const cardStyle = isMultiColor ? {
    background: colorEntry.bg,
    borderColor: colorEntry.border,
    boxShadow: isActive ? `0 4px 20px ${colorEntry.glow}` : `0 0 0 1px ${colorEntry.border}`,
  } : isActive ? {
    background: `linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.88))`,
    borderColor: `${theme.accent}40`,
    boxShadow: `0 4px 20px ${theme.accent}18`,
  } : undefined;

  const arabicColor = isMultiColor ? colorEntry.text : theme.bismillahColor;

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 mb-3 overflow-hidden ${
        isActive ? 'shadow-md' : 'glass-card hover:shadow-sm'
      }`}
      style={cardStyle}
    >
      {/* Active left accent */}
      {isActive && !isMultiColor && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{ background: `linear-gradient(to bottom, ${theme.accent}, ${theme.orb2})` }}
        />
      )}
      {isMultiColor && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: colorEntry.text }} />
      )}

      <div className={`p-4 sm:p-5 ${(isActive && !isMultiColor) ? 'pl-5' : ''}`}>
        {/* Header row */}
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onPlay}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
              style={{
                background: isMultiColor
                  ? (isActive ? colorEntry.text : colorEntry.bg)
                  : (isActive ? theme.accent : 'rgba(0,0,0,0.05)'),
                color: (isActive && !isMultiColor) || (isMultiColor && isActive) ? '#fff' : isMultiColor ? colorEntry.text : '#555',
              }}
            >
              {isCurrentlyPlaying ? <Pause size={11} /> : <Play size={11} />}
              <span dir="ltr">{surahNum}:{ayah.n}</span>
            </button>

            {phaseLabel && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold animate-scale-in"
                style={{
                  background: `${theme.accent}18`,
                  color: theme.bismillahColor,
                }}
              >
                {phaseLabel}
                {isCurrentlyPlaying && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full ml-1 bg-current animate-pulse" />
                )}
              </span>
            )}
            <span className="text-[9px] text-gray-400">پارہ {ayah.juz}</span>
            {ayah.sajda && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: '#fef3c7', color: '#92400e' }}>سجدہ</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={handleTafsirToggle} className="p-1.5 rounded-xl hover:bg-white/80 transition-colors" title="تفسیر">
              {showTafsir ? <ChevronUp size={13} style={{ color: theme.accent }} /> : <Book size={13} className="text-gray-400" />}
            </button>
            <button onClick={onBookmark} className="p-1.5 rounded-xl hover:bg-white/80 transition-colors">
              {isBookmarked
                ? <BookmarkCheck size={13} style={{ color: '#f59e0b' }} />
                : <Bookmark size={13} className="text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Arabic text — mode-specific rendering */}
        {!isUrduOnly && (
          isTajweed ? (
            <TajweedAyah
              text={ayah.arabic}
              fontSize={arabicFontSize}
              fontWeight={String(fontWeight)}
              glowColor={textStyle.glow !== 'none' ? theme.bismillahGlow : undefined}
            />
          ) : (
            <p
              className={`font-quran leading-[2.1] text-right mb-3 ${animClass}`}
              dir="rtl" lang="ar"
              style={{
                fontSize: arabicFontSize,
                fontWeight,
                color: arabicColor,
                textShadow: isMultiColor ? `0 0 12px ${colorEntry.glow}` : textShadow,
              }}
            >
              {ayah.arabic}
            </p>
          )
        )}

        {/* Urdu translation — hidden in mushaf mode */}
        {!isMushaf && ayah.urdu && (
          <div className={`${(!isUrduOnly && !isTajweed) ? 'border-t border-white/60 pt-3' : ''}`}>
            <p
              className="font-urdu leading-[2.0] text-right text-gray-700"
              dir="rtl" lang="ur"
              style={{
                fontSize: urduFontSize,
                fontWeight: textStyle.fontWeight !== 'normal' ? fontWeight : 400,
              }}
            >
              {ayah.urdu}
            </p>
          </div>
        )}

        {/* Tafsir */}
        {showTafsir && (
          <div
            className="mt-3 pt-3 border-t rounded-xl p-3 animate-fade-in-up"
            style={{ background: `${theme.bismillahGlow}`, borderColor: `${theme.accent}20` }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Book size={11} style={{ color: theme.accent }} />
              <span className="text-[10px] font-semibold" style={{ color: theme.bismillahColor }}>
                {activeTafsir.nameAr}
              </span>
            </div>
            {tafsirLoading ? (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Loader2 size={11} className="animate-spin" /> تفسیر لوڈ ہو رہی ہے...
              </div>
            ) : (
              <p className="text-sm leading-[1.9] text-gray-800 text-right" dir="rtl" lang={activeTafsir.lang}>
                {tafsirText}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
