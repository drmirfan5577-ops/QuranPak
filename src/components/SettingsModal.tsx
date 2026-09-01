import React from 'react';
import { X, Settings, Palette } from 'lucide-react';
import { RECITERS, URDU_AUDIO_TRANSLATIONS, URDU_TEXT_TRANSLATIONS, TAFSIR_EDITIONS, THEMES } from '@/constants/quran';
import type { Theme, ThemeId } from '@/types/quran';

interface Props {
  reciterId: string;
  urduAudioId: string;
  urduTextId: string;
  tafsirId: string;
  theme: Theme;
  fontSize: number;
  onClose: () => void;
  onReciterChange: (v: string) => void;
  onUrduAudioChange: (v: string) => void;
  onUrduTextChange: (v: string) => void;
  onTafsirChange: (v: string) => void;
  onThemeChange: (id: ThemeId) => void;
  onFontSizeChange: (v: number) => void;
}

export default function SettingsModal({
  reciterId, urduAudioId, urduTextId, tafsirId, theme, fontSize,
  onClose, onReciterChange, onUrduAudioChange, onUrduTextChange,
  onTafsirChange, onThemeChange, onFontSizeChange,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="glass-card-strong rounded-2xl w-full max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Settings size={16} style={{ color: theme.accent }} />
            ترتیبات — Settings
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Theme */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Palette size={11} /> تھیم — Background Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className="rounded-xl p-2.5 border-2 text-center transition-all hover:scale-105"
                  style={{
                    borderColor: theme.id === t.id ? t.accent : 'transparent',
                    background: `linear-gradient(135deg, ${t.orb1}, ${t.orb2})`,
                    boxShadow: theme.id === t.id ? `0 0 0 3px ${t.accentLight}` : undefined,
                  }}
                >
                  <div className="text-[10px] font-semibold text-gray-800">{t.name}</div>
                  <div className="text-[9px] text-gray-600 mt-0.5">{t.nameUr}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Font size */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
              قرآن فونٹ سائز — {fontSize}px
            </label>
            <input
              type="range" min="20" max="48" step="2"
              value={fontSize}
              onChange={e => onFontSizeChange(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>چھوٹا</span>
              <span>بڑا</span>
            </div>
          </div>

          {/* Reciter */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              قاری — Reciter
            </label>
            <select
              value={reciterId}
              onChange={e => onReciterChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none"
            >
              {RECITERS.map(r => (
                <option key={r.id} value={r.id}>{r.nameAr} — {r.name}</option>
              ))}
            </select>
          </div>

          {/* Urdu audio */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              اردو آڈیو ترجمہ
            </label>
            <select
              value={urduAudioId}
              onChange={e => onUrduAudioChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none"
            >
              {URDU_AUDIO_TRANSLATIONS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Urdu text */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              اردو متنی ترجمہ
            </label>
            <select
              value={urduTextId}
              onChange={e => onUrduTextChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none"
            >
              {URDU_TEXT_TRANSLATIONS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Tafsir */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              فعال تفسیر — Active Tafseer
            </label>
            <select
              value={tafsirId}
              onChange={e => onTafsirChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none"
            >
              {TAFSIR_EDITIONS.map(r => (
                <option key={r.id} value={r.id}>{r.nameAr} — {r.author}</option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
            >
              محفوظ کریں
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
