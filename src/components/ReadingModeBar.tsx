import React from 'react';
import type { ReadingMode, Theme } from '@/types/quran';
import { BookOpen, AlignRight, Layers, FileText, List, Sparkles } from 'lucide-react';

interface Props {
  mode: ReadingMode;
  onChange: (m: ReadingMode) => void;
  theme: Theme;
}

const MODES: {
  id: ReadingMode;
  labelUr: string;
  labelEn: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  description: string;
}[] = [
  {
    id: 'standard',
    labelUr: 'عربی + اردو',
    labelEn: 'Standard',
    icon: BookOpen,
    color: '#7c5cbf',
    gradient: 'linear-gradient(135deg, #7c5cbf, #a78bfa)',
    description: 'Arabic text with Urdu translation',
  },
  {
    id: 'mushaf',
    labelUr: 'مصحف قرآن',
    labelEn: 'Mushaf',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={13} height={13}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    color: '#b45309',
    gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
    description: 'Arabic text only (Mushaf style)',
  },
  {
    id: 'urdu-only',
    labelUr: 'صرف اردو',
    labelEn: 'Urdu Only',
    icon: AlignRight,
    color: '#15803d',
    gradient: 'linear-gradient(135deg, #15803d, #4ade80)',
    description: 'Urdu translation only',
  },
  {
    id: 'tajweed',
    labelUr: 'تجوید رنگین',
    labelEn: 'Tajweed',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={13} height={13}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    color: '#dc2626',
    gradient: 'linear-gradient(135deg, #dc2626, #f97316)',
    description: 'Colorful Tajweed rules display',
  },
  {
    id: 'multicolor',
    labelUr: 'ملٹی کلر',
    labelEn: 'Multi-Color',
    icon: Layers,
    color: '#db2777',
    gradient: 'linear-gradient(135deg, #db2777, #a21caf)',
    description: 'Each ayah in unique vibrant color',
  },
  {
    id: '15line' as ReadingMode,
    labelUr: '15 لائن',
    labelEn: '15-Line',
    icon: List,
    color: '#0369a1',
    gradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
    description: 'Classic 15-line per page format',
  },
  {
    id: 'wordbyword',
    labelUr: 'لفظ بہ لفظ',
    labelEn: 'Word×Word',
    icon: Sparkles,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #2563eb)',
    description: 'Word-by-word with multi-language',
  },
  {
    id: 'pdf',
    labelUr: 'پی ڈی ایف',
    labelEn: 'PDF',
    icon: FileText,
    color: '#374151',
    gradient: 'linear-gradient(135deg, #374151, #6b7280)',
    description: 'Download or view PDF Quran',
  },
];

export default function ReadingModeBar({ mode, onChange, theme }: Props) {
  return (
    <div className="glass-card-strong rounded-2xl p-3 overflow-hidden">
      {/* Label */}
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-[10px] font-bold text-gray-500">طرزِ مطالعہ:</span>
        <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${theme.accent}25, transparent)` }} />
        <span className="text-[9px] text-gray-400 font-medium">Reading Mode</span>
      </div>

      {/* Mode buttons — all visible, 4 per row on mobile */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
        {MODES.map(m => {
          const Icon = m.icon;
          const active = mode === (m.id as string);
          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id as ReadingMode)}
              title={m.description}
              className="flex flex-col items-center gap-1 px-1.5 py-2 rounded-xl text-center transition-all duration-200 border hover:scale-105 active:scale-95 relative"
              style={active ? {
                background: m.gradient,
                borderColor: 'transparent',
                boxShadow: `0 4px 16px ${m.color}40, 0 0 0 2px ${m.color}30`,
              } : {
                background: 'rgba(255,255,255,0.7)',
                borderColor: 'rgba(255,255,255,0.9)',
              }}
            >
              {/* Icon */}
              <div className="w-6 h-6 flex items-center justify-center">
                <Icon
                  size={13}
                  style={{ color: active ? '#fff' : m.color }}
                />
              </div>
              {/* Label */}
              <span
                className="text-[9px] font-bold leading-tight"
                style={{ color: active ? '#fff' : '#4b5563' }}
                dir="rtl"
              >
                {m.labelUr}
              </span>
              {/* Active dot */}
              {active && (
                <span
                  className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
