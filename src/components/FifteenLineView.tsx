import React from 'react';
import type { AyahData, Theme, TextStyle } from '@/types/quran';
import TajweedAyah from '@/components/TajweedAyah';
import { AYAH_COLOR_PALETTE } from '@/constants/quran';

interface Props {
  ayahs: AyahData[];
  surahNum: number;
  player: { currentIdx: number; isPlaying: boolean; phase: 'idle' | 'arabic' | 'urdu' };
  theme: Theme;
  textStyle: TextStyle;
  readingMode: string;
  isBookmarked: (s: number, a: number) => boolean;
  onPlay: (idx: number) => void;
  onBookmark: (s: number, a: number, arabic: string, urdu: string) => void;
  surahMeta: { a: string; u: string };
}

// ─── 15-Line mode: group into pages of 15 ────────────────────────
function FifteenLineView({ ayahs, theme, textStyle }: {
  ayahs: AyahData[];
  theme: Theme;
  textStyle: TextStyle;
}) {
  const pages: AyahData[][] = [];
  for (let i = 0; i < ayahs.length; i += 15) {
    pages.push(ayahs.slice(i, i + 15));
  }
  const fw = textStyle.fontWeight === 'extrabold' ? 800 : textStyle.fontWeight === 'bold' ? 700 : 500;
  return (
    <div className="space-y-4">
      {pages.map((page, pi) => (
        <div
          key={pi}
          className="glass-card-strong rounded-2xl px-6 py-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.90))`,
            borderLeft: `3px solid ${theme.accent}40`,
          }}
        >
          {/* Page number */}
          <div className="absolute top-2 left-3 text-[9px] font-bold text-gray-300"
            dir="ltr">Page {pi + 1}</div>
          {/* Ayahs as continuous flow */}
          <p
            className="font-quran leading-[2.2] text-right"
            dir="rtl" lang="ar"
            style={{
              fontSize: textStyle.arabicFontSize,
              fontWeight: fw,
              color: theme.bismillahColor,
              textShadow: textStyle.glow !== 'none' ? `0 0 ${textStyle.glow === 'strong' ? 28 : 14}px ${theme.bismillahGlow}` : 'none',
            }}
          >
            {page.map(a => (
              <span key={a.n}>
                {a.arabic}
                {/* Ayah number ornament */}
                <span
                  className="inline-block mx-1 text-sm"
                  style={{ color: theme.accent, fontFamily: 'serif' }}
                >
                  ﴿{a.n}﴾
                </span>
              </span>
            ))}
          </p>
          {/* Urdu translations below */}
          <div className="border-t mt-3 pt-3" style={{ borderColor: `${theme.accent}15` }}>
            {page.map(a => (
              <p key={a.n} className="text-sm leading-[1.9] text-right font-urdu text-gray-600 mb-1" dir="rtl" lang="ur"
                style={{ fontSize: textStyle.urduFontSize - 1 }}>
                <span className="text-[10px] font-bold mr-1" style={{ color: theme.accent }}>{a.n}.</span>
                {a.urdu}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { FifteenLineView };
export default FifteenLineView;
