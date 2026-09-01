import React from 'react';
import { Book, BookOpen, Download, Link as LinkIcon } from 'lucide-react';
import { TAFSIR_EDITIONS } from '@/constants/quran';
import type { Theme, MediaItem } from '@/types/quran';

interface Props {
  theme: Theme;
  activeTafsirId: string;
  onSetTafsir: (id: string) => void;
  libraryItems: MediaItem[];
}

const safe = (v: any) => String(v ?? '').trim();

export default function TafseerTab({ theme, activeTafsirId, onSetTafsir, libraryItems }: Props) {
  const books = libraryItems.filter(m => ['book', 'tafsir'].includes(safe(m.type)));

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="glass-card-strong rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${theme.accent}18` }}>
            <BookOpen size={20} style={{ color: theme.accent }} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">تفاسیر قرآن کریم</h2>
            <p className="text-[11px] text-gray-500">Inline Tafseer in reader + full editions below</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed" dir="rtl">
          قرآن پاک پڑھتے وقت ہر آیت کے ساتھ 📖 نشان پر کلک کریں تاکہ وہاں تفسیر کھلے۔ نیچے سے فعال تفسیر بدلیں یا اپنی پسندیدہ تفسیر منتخب کریں۔
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {TAFSIR_EDITIONS.map(t => (
            <button
              key={t.id}
              onClick={() => onSetTafsir(t.id)}
              className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
              style={activeTafsirId === t.id ? {
                background: `${theme.accent}18`,
                color: theme.bismillahColor,
                borderColor: `${theme.accent}40`,
              } : {
                background: 'rgba(255,255,255,0.7)',
                color: '#6b7280',
                borderColor: 'rgba(255,255,255,0.9)',
              }}
            >
              {t.nameAr}
            </button>
          ))}
        </div>
      </div>

      {/* Tafseer cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TAFSIR_EDITIONS.map(t => (
          <div key={t.id} className="glass-card-strong rounded-2xl p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${theme.accent}15` }}>
                <Book size={15} style={{ color: theme.accent }} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 font-quran" dir="rtl">{t.nameAr}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5" dir="rtl">{t.author}</p>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium mt-1 inline-block" style={{ background: `${theme.orb2}`, color: '#374151' }}>
                  {t.lang === 'ar' ? 'عربی' : t.lang === 'ur' ? 'اردو' : 'English'}
                </span>
              </div>
              {activeTafsirId === t.id && (
                <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{ background: `${theme.accent}18`, color: theme.accent }}>
                  ✓ فعال
                </span>
              )}
            </div>
            <button
              onClick={() => onSetTafsir(t.id)}
              className="w-full text-xs font-medium px-3 py-2 rounded-xl transition-all hover:opacity-90 text-white"
              style={{ background: activeTafsirId === t.id ? `${theme.accent}` : 'rgba(0,0,0,0.08)', color: activeTafsirId === t.id ? '#fff' : '#374151' }}
            >
              {activeTafsirId === t.id ? '✓ فعال تفسیر' : 'فعال کریں →'}
            </button>
          </div>
        ))}

        {/* Library books */}
        {books.map(m => (
          <div key={m.id} className="glass-card-strong rounded-2xl p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#b4530918' }}>
                <Book size={15} style={{ color: '#b45309' }} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900" dir="rtl">{safe(m.title)}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5" dir="rtl">{safe(m.author)}</p>
              </div>
            </div>
            <a
              href={m.url} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
              style={{ color: theme.accent }}
            >
              <Download size={12} /> کھولیں / ڈاؤنلوڈ کریں
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
