import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Trash2, Search, BookOpen, FileText, Clock, ChevronRight, Download } from 'lucide-react';
import type { Theme } from '@/types/quran';
import type { BookmarkRow } from '@/lib/supabase';
import { SURAHS } from '@/constants/quran';

interface Props {
  theme: Theme;
  bookmarks: BookmarkRow[];
  onRemove: (surahNum: number, ayahNum: number) => void;
  onNavigate: (surah: number, ayah: number) => void;
}

export default function BookmarksPage({ theme, bookmarks, onRemove, onNavigate }: Props) {
  const [search, setSearch] = useState('');

  const filtered = bookmarks.filter(b => {
    const q = search.toLowerCase();
    return !q ||
      b.surah_name_ur.includes(q) ||
      b.ayah_arabic.includes(q) ||
      b.ayah_urdu.toLowerCase().includes(q) ||
      String(b.surah_num).includes(q);
  });

  const exportBookmarks = () => {
    const text = bookmarks.map(b =>
      `سورہ ${b.surah_name_ar} (${b.surah_num}:${b.ayah_num})\n${b.ayah_arabic}\n${b.ayah_urdu}\n${'─'.repeat(50)}`
    ).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'quran-bookmarks.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="glass-card-strong rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: `${theme.accent}18` }}>
              <Bookmark size={17} style={{ color: theme.accent }} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">بک مارکس — Bookmarks</h2>
              <p className="text-[10px] text-gray-500">{bookmarks.length} محفوظ آیات — OnSpace Cloud سنک</p>
            </div>
          </div>
          {bookmarks.length > 0 && (
            <button
              onClick={exportBookmarks}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
            >
              <Download size={12} /> ایکسپورٹ
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pr-9 pl-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none"
            placeholder="آیت تلاش کریں..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            dir="rtl"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'کل آیات', value: bookmarks.length, icon: Bookmark },
          { label: 'مختلف سورتیں', value: new Set(bookmarks.map(b => b.surah_num)).size, icon: BookOpen },
          { label: 'آج شامل', value: bookmarks.filter(b => b.created_at?.startsWith(new Date().toISOString().slice(0,10))).length, icon: Clock },
          { label: 'آخری پارہ', value: bookmarks.length > 0 ? SURAHS.find(s => s.n === bookmarks[0]?.surah_num)?.juz || 0 : 0, icon: FileText },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card-strong rounded-xl p-3 text-center">
              <Icon size={14} className="mx-auto mb-1" style={{ color: theme.accent }} />
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-[9px] text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Bookmark list */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl py-16 text-center">
          <Bookmark size={28} className="mx-auto mb-3 text-gray-300" />
          <p className="text-sm text-gray-400">
            {search ? 'کوئی نتیجہ نہیں ملا' : 'ابھی کوئی بک مارک نہیں — قرآن پڑھتے وقت 🔖 آئکن پر کلک کریں'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <div
              key={b.id}
              className="glass-card-strong rounded-2xl p-4 sm:p-5 hover:shadow-md transition-all duration-200 group"
              style={{ borderRight: `3px solid ${theme.accent}` }}
            >
              {/* Surah label */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] px-2.5 py-0.5 rounded-full font-bold"
                    style={{ background: `${theme.accent}18`, color: theme.bismillahColor }}
                  >
                    {b.surah_name_ar || `سورہ ${b.surah_num}`} — {b.surah_num}:{b.ayah_num}
                  </span>
                  {b.note && (
                    <span className="text-[9px] text-gray-400 italic">"{b.note}"</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { onNavigate(b.surah_num, b.ayah_num); }}
                    className="p-1.5 rounded-full hover:bg-white/80 transition-all opacity-0 group-hover:opacity-100"
                    title="اس آیت پر جائیں"
                  >
                    <ChevronRight size={13} style={{ color: theme.accent }} />
                  </button>
                  <button
                    onClick={() => onRemove(b.surah_num, b.ayah_num)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Arabic */}
              {b.ayah_arabic && (
                <p
                  className="text-[20px] sm:text-[24px] leading-[1.9] text-right mb-2 font-quran"
                  dir="rtl" lang="ar"
                  style={{ color: theme.bismillahColor }}
                >
                  {b.ayah_arabic}
                </p>
              )}

              {/* Urdu */}
              {b.ayah_urdu && (
                <p className="text-sm leading-[1.9] text-right text-gray-600 font-urdu" dir="rtl" lang="ur">
                  {b.ayah_urdu}
                </p>
              )}

              {/* Date */}
              <p className="text-[9px] text-gray-400 mt-2">
                {new Date(b.created_at).toLocaleDateString('ur-PK')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
