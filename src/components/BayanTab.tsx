import React from 'react';
import { Radio, Headphones, Video, Link as LinkIcon, Youtube, Plus } from 'lucide-react';
import type { Theme, MediaItem } from '@/types/quran';

interface Props {
  theme: Theme;
  libraryItems: MediaItem[];
  onAddClick: () => void;
}

const safe = (v: any) => String(v ?? '').trim();

function isBayan(m: MediaItem) {
  const t = safe(m.title).toLowerCase();
  const c = safe(m.category).toLowerCase();
  const a = safe(m.author).toLowerCase();
  return (
    c.includes('بیان') || c.includes('bayan') || c.includes('dr israr') ||
    a.includes('اسرار') || a.includes('israr') ||
    t.includes('بیان القرآن') || t.includes('bayan')
  );
}

export default function BayanTab({ theme, libraryItems, onAddClick }: Props) {
  const bayanItems = libraryItems.filter(isBayan);
  const channels = libraryItems.filter(m => ['channel', 'link'].includes(safe(m.type)));

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Hero */}
      <div
        className="glass-card-strong rounded-2xl p-6 sm:p-8 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${theme.orb1}, ${theme.orb2}, ${theme.orb3})` }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/30 backdrop-blur-sm">
              <Radio size={24} style={{ color: theme.bismillahColor }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-urdu" dir="rtl">بیان القرآن</h2>
              <p className="text-sm font-semibold text-gray-700" dir="rtl">ڈاکٹر اسرار احمدؒ</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed" dir="rtl">
            ڈاکٹر اسرار احمد صاحبؒ کی مشہور و معروف تفسیر «بیان القرآن» مکمل آڈیو و ویڈیو شکل میں — تنظیم اسلامی کے پلیٹ فارم سے۔
            ہر سورہ کی مکمل تشریح، تفہیم اور بیان۔
          </p>
          <button
            onClick={onAddClick}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
          >
            <Plus size={14} /> بیان القرآن فائل شامل کریں
          </button>
        </div>
      </div>

      {/* Bayan items */}
      {bayanItems.length > 0 ? (
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2" dir="rtl">
            <Headphones size={15} style={{ color: theme.accent }} /> بیان القرآن — آڈیو و ویڈیو
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bayanItems.map(m => (
              <div key={m.id} className="glass-card-strong rounded-2xl p-4 hover:shadow-md transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${theme.accent}18` }}>
                    {safe(m.type) === 'video' ? <Video size={15} style={{ color: theme.accent }} /> : <Headphones size={15} style={{ color: theme.accent }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900" dir="rtl">{safe(m.title)}</h4>
                    <p className="text-[11px] text-gray-500" dir="rtl">{safe(m.author)}</p>
                  </div>
                </div>
                {m.description && <p className="text-xs text-gray-500 mb-3 leading-relaxed" dir="rtl">{safe(m.description)}</p>}
                {safe(m.type) === 'audio' ? (
                  <audio controls src={m.url} preload="none" className="w-full" />
                ) : safe(m.type) === 'video' ? (
                  <video controls src={m.url} preload="none" className="w-full rounded-xl" style={{ maxHeight: 200 }} />
                ) : (
                  <a href={m.url} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: theme.accent }}>
                    <LinkIcon size={12} /> کھولیں
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl text-center py-12">
          <Radio size={32} className="mx-auto mb-3 text-gray-200" />
          <p className="text-sm text-gray-400 mb-3" dir="rtl">ابھی کوئی بیان القرآن فائل شامل نہیں</p>
          <p className="text-xs text-gray-400 mb-4" dir="rtl">
            Admin سیکشن میں جا کر category میں «بیان القرآن» یا author میں «ڈاکٹر اسرار احمد» لکھ کر فائل شامل کریں
          </p>
          <button onClick={onAddClick} className="text-sm font-medium px-4 py-2 rounded-full text-white" style={{ background: theme.accent }}>
            ابھی شامل کریں
          </button>
        </div>
      )}

      {/* Channels */}
      {channels.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Youtube size={15} className="text-red-500" />
            اسلامی چینلز و لنکس
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {channels.map(m => (
              <a
                key={m.id} href={m.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3.5 glass-card-strong rounded-xl hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#e8555518' }}>
                  <Youtube size={15} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{safe(m.title)}</p>
                  <p className="text-[10px] text-gray-400 truncate">{safe(m.url)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
