import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { JUZ_LIST, SURAHS } from '@/constants/quran';
import type { Theme } from '@/types/quran';

interface Props {
  theme: Theme;
  currentSurah: number;
  onSelectSurah: (surah: number) => void;
  onClose?: () => void;
}

export default function JuzNavigation({ theme, currentSurah, onSelectSurah, onClose }: Props) {
  const [expandedJuz, setExpandedJuz] = useState<number | null>(null);

  // Build surah list per juz
  const juzSurahs = useMemo(() => {
    const map: Record<number, typeof SURAHS> = {};
    JUZ_LIST.forEach(j => { map[j.juz] = []; });
    SURAHS.forEach(s => {
      if (!map[s.juz]) map[s.juz] = [];
      map[s.juz].push(s);
    });
    return map;
  }, []);

  const currentJuz = SURAHS.find(s => s.n === currentSurah)?.juz || 1;

  return (
    <div className="glass-card-strong rounded-2xl overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{ background: `linear-gradient(135deg, ${theme.bismillahGlow}, transparent)` }}
      >
        <BookOpen size={15} style={{ color: theme.accent }} />
        <div>
          <h2 className="text-sm font-bold text-gray-900">30 پارے / اجزاء</h2>
          <p className="text-[10px] text-gray-500">Juz / Para Navigation</p>
        </div>
      </div>

      <div className="divide-y divide-white/40 max-h-[70vh] overflow-y-auto">
        {JUZ_LIST.map(juz => {
          const isCurrentJuz = currentJuz === juz.juz;
          const isExpanded = expandedJuz === juz.juz;
          const surahs = juzSurahs[juz.juz] || [];

          return (
            <div key={juz.juz}>
              {/* Juz header */}
              <button
                onClick={() => setExpandedJuz(isExpanded ? null : juz.juz)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-white/60 ${isCurrentJuz ? 'bg-white/40' : ''}`}
              >
                {/* Juz number */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{
                    background: isCurrentJuz ? `${theme.accent}22` : '#f3f4f6',
                    color: isCurrentJuz ? theme.accent : '#6b7280',
                    boxShadow: isCurrentJuz ? `0 0 12px ${theme.accentLight}` : undefined,
                  }}
                >
                  {juz.juz}
                </div>

                {/* Juz info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate" dir="rtl">{juz.nameUr}</p>
                  <p className="text-[9px] text-gray-500 truncate">{juz.nameAr}</p>
                </div>

                {/* Surah count badge */}
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  {surahs.length}
                </span>

                {isExpanded
                  ? <ChevronDown size={12} className="text-gray-400 shrink-0" />
                  : <ChevronRight size={12} className="text-gray-400 shrink-0" />
                }
              </button>

              {/* Expanded surah list */}
              {isExpanded && (
                <div className="bg-black/2 border-t border-white/30">
                  {surahs.map(s => (
                    <button
                      key={s.n}
                      onClick={() => {
                        onSelectSurah(s.n);
                        onClose?.();
                      }}
                      className={`w-full flex items-center gap-3 px-5 py-2 text-left hover:bg-white/60 transition-all ${currentSurah === s.n ? 'bg-white/50' : ''}`}
                    >
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{
                          background: currentSurah === s.n ? `${theme.accent}20` : '#f3f4f6',
                          color: currentSurah === s.n ? theme.accent : '#9ca3af',
                        }}
                      >
                        {s.n}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-gray-800 font-quran" dir="rtl">{s.a}</span>
                        <span className="text-[9px] text-gray-400 ml-1.5">{s.e}</span>
                      </div>
                      <span className="text-[9px] text-gray-400">{s.ayahs}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
