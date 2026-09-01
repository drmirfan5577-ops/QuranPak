import React from 'react';
import type { Theme } from '@/types/quran';

interface Props {
  theme: Theme;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Displays ONLY "بسم اللہ الرحمن الرحیم" — nothing else, no extra characters.
 * This is shown as a standalone header before surah content (for surahs 2–114 except 9).
 * For Surah 1, Bismillah is Ayah 1 itself and is rendered as an ayah.
 * For Surah 9, this component is NOT rendered.
 */
export default function BismillahDisplay({ theme, size = 'md' }: Props) {
  const sizeMap = {
    sm: 'text-2xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl',
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center py-5 px-4 rounded-2xl my-1"
      style={{
        background: `linear-gradient(135deg, ${theme.bismillahGlow}, transparent 70%)`,
        border: `1px solid ${theme.bismillahGlow}`,
      }}
    >
      <p
        className={`bismillah-line font-quran text-center leading-[1.8] ${sizeMap[size]}`}
        dir="rtl"
        lang="ar"
        style={{ color: theme.bismillahColor }}
      >
        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
      </p>
    </div>
  );
}
