import React, { useState, useMemo } from 'react';
import {
  Search, Library, Headphones, Book, Youtube, Video, Globe,
  Languages, FileText, Trash2, Plus, Link as LinkIcon,
} from 'lucide-react';
import type { Theme, MediaItem } from '@/types/quran';

interface Props {
  items: MediaItem[];
  theme: Theme;
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

const safe = (v: any) => String(v ?? '').trim();

function typeIcon(t: string) {
  const map: Record<string, any> = {
    audio: Headphones, video: Video, book: Book,
    tafsir: Book, translation: Languages,
    channel: Youtube, link: Globe,
  };
  return map[t] || FileText;
}

function typeColor(t: string, accent: string) {
  const map: Record<string, string> = {
    audio: '#0d9488', video: '#e85555', book: '#b45309',
    tafsir: '#7c3aed', translation: '#15803d',
    channel: '#e85555', link: '#6b7280',
  };
  return map[t] || accent;
}

function typeLabel(t: string) {
  const map: Record<string, string> = {
    audio: '🎧 آڈیو', video: '🎬 ویڈیو', book: '📖 کتاب',
    tafsir: '📚 تفسیر', translation: '🌐 ترجمہ',
    channel: '📡 چینل', link: '🔗 لنک',
  };
  return map[t] || t;
}

export default function LibraryTab({ items, theme, onDelete, onAddClick }: Props) {
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return items
      .filter(m => typeFilter === 'all' || safe(m.type) === typeFilter)
      .filter(m => !s || safe(m.title).toLowerCase().includes(s) || safe(m.author).toLowerCase().includes(s) || safe(m.category).toLowerCase().includes(s));
  }, [items, q, typeFilter]);

  const stats = [
    { l: 'کل آئٹمز', v: items.length, icon: Library, color: theme.accent },
    { l: 'آڈیو', v: items.filter(m => safe(m.type) === 'audio').length, icon: Headphones, color: '#0d9488' },
    { l: 'کتابیں', v: items.filter(m => ['book', 'tafsir'].includes(safe(m.type))).length, icon: Book, color: '#b45309' },
    { l: 'لنکس', v: items.filter(m => ['channel', 'link'].includes(safe(m.type))).length, icon: Youtube, color: '#e85555' },
  ];

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass-card-strong rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.color}18` }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{s.v}</div>
                <div className="text-[10px] text-gray-500">{s.l}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search + filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-0">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-white/70 rounded-full glass-card focus:outline-none"
            placeholder="تلاش کریں..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
        <select
          className="text-sm border border-white/70 rounded-full px-4 py-2.5 glass-card focus:outline-none"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <option value="all">تمام</option>
          <option value="audio">آڈیو</option>
          <option value="video">ویڈیو</option>
          <option value="book">کتاب</option>
          <option value="tafsir">تفسیر</option>
          <option value="translation">ترجمہ</option>
          <option value="channel">چینل</option>
          <option value="link">لنک</option>
        </select>
        <button
          onClick={onAddClick}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
          style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
        >
          <Plus size={14} /> نیا شامل کریں
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(m => {
          const Icon = typeIcon(safe(m.type));
          const color = typeColor(safe(m.type), theme.accent);
          const isMedia = ['audio', 'video'].includes(safe(m.type));
          return (
            <div key={m.id} className="glass-card-strong rounded-2xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 leading-snug" dir="rtl">{safe(m.title)}</h4>
                  {m.author && <p className="text-[11px] text-gray-500 mt-0.5" dir="rtl">{safe(m.author)}</p>}
                </div>
                <button
                  onClick={() => onDelete(m.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {m.description && (
                <p className="text-xs text-gray-500 mb-3 leading-relaxed" dir="rtl">{safe(m.description)}</p>
              )}

              <div className="flex items-center gap-2 flex-wrap mb-3">
                {m.category && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${color}12`, color }}>
                    {safe(m.category)}
                  </span>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">
                  {typeLabel(safe(m.type))}
                </span>
                <span className="text-[10px] text-gray-400">{safe(m.added_at)}</span>
              </div>

              {isMedia ? (
                safe(m.type) === 'audio' ? (
                  <audio controls src={m.url} preload="none" className="w-full" />
                ) : (
                  <video controls src={m.url} preload="none" className="w-full rounded-xl" style={{ maxHeight: 200 }} />
                )
              ) : (
                <a
                  href={m.url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                  style={{ color: theme.accent }}
                >
                  <LinkIcon size={12} /> لنک کھولیں
                </a>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16">
            <Library size={32} className="mx-auto mb-3 text-gray-200" />
            <p className="text-sm text-gray-400">کوئی آئٹم نہیں ملا</p>
            <button onClick={onAddClick} className="mt-3 text-sm font-medium" style={{ color: theme.accent }}>
              ابھی شامل کریں +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
