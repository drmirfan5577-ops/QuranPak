import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { SURAHS } from '@/constants/quran';
import type { Theme } from '@/types/quran';

interface Props {
  current: number;
  onSelect: (n: number) => void;
  theme: Theme;
}

export default function SurahList({ current, onSelect, theme }: Props) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return SURAHS;
    return SURAHS.filter(x =>
      x.a.includes(s) || x.e.toLowerCase().includes(s) || x.u.includes(s) || String(x.n).includes(s)
    );
  }, [q]);

  return (
    <div className="glass-card-strong rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-white/60">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-white/70 bg-white/60 placeholder:text-gray-400 focus:outline-none focus:ring-2 text-gray-800"
            style={{ ['--tw-ring-color' as string]: theme.accentLight }}
            placeholder="سورہ تلاش کریں..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1">
        {filtered.map(s => {
          const active = s.n === current;
          return (
            <button
              key={s.n}
              onClick={() => onSelect(s.n)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 border-b border-white/40 text-right hover:bg-white/50 transition-colors duration-100"
              style={{ background: active ? `${theme.accentLight}` : undefined }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{
                  background: active ? theme.accent : 'rgba(0,0,0,0.06)',
                  color: active ? '#fff' : '#666',
                }}
              >
                {s.n}
              </span>
              <div className="flex-1 min-w-0 text-right">
                <div
                  className="text-sm font-semibold text-gray-900 truncate font-quran leading-tight"
                  dir="rtl"
                >
                  {s.a}
                </div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 justify-start mt-0.5">
                  <span>{s.e}</span>
                  <span>·</span>
                  <span>{s.ayahs} آیات</span>
                  <span>·</span>
                  <span style={{ color: s.type === 'Meccan' ? '#b45309' : '#0f7a5a' }}>{s.type === 'Meccan' ? 'مکی' : 'مدنی'}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
