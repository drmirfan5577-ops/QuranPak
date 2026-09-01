import React, { useState } from 'react';
import { Plus, Upload, Loader2, Sparkles, Trash2, Headphones, Video, Book, Youtube, Globe, FileText, Languages } from 'lucide-react';
import type { Theme, MediaItem } from '@/types/quran';

interface Props {
  theme: Theme;
  items: MediaItem[];
  onDelete: (id: string) => void;
  onAdd: (item: Omit<MediaItem, 'id'>) => Promise<boolean>;
}

const safe = (v: any) => String(v ?? '').trim();

function typeIcon(t: string) {
  const map: Record<string, any> = {
    audio: Headphones, video: Video, book: Book,
    tafsir: Book, translation: Languages, channel: Youtube, link: Globe,
  };
  return map[t] || FileText;
}

function typeColor(t: string) {
  const map: Record<string, string> = {
    audio: '#0d9488', video: '#e85555', book: '#b45309',
    tafsir: '#7c3aed', translation: '#15803d', channel: '#e85555', link: '#6b7280',
  };
  return map[t] || '#6b7280';
}

interface FormState {
  title: string; type: string; category: string; author: string;
  language: string; url: string; description: string;
}

export default function AdminTab({ theme, items, onDelete, onAdd }: Props) {
  const [form, setForm] = useState<FormState>({
    title: '', type: 'audio', category: '', author: '',
    language: 'ur', url: '', description: '',
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  function update(patch: Partial<FormState>) {
    setForm(f => ({ ...f, ...patch }));
  }

  async function handleSubmit() {
    if (!form.title.trim()) { setMsg('عنوان لازمی ہے'); return; }
    if (!form.url.trim()) { setMsg('URL یا فائل لازمی ہے'); return; }
    setBusy(true); setMsg('');
    const ok = await onAdd({
      title: form.title.trim(),
      type: form.type as MediaItem['type'],
      category: form.category.trim() || 'عمومی',
      author: form.author.trim(),
      language: form.language,
      url: form.url.trim(),
      description: form.description.trim(),
      surah_start: null,
      surah_end: null,
      added_at: new Date().toISOString().slice(0, 10),
    });
    setBusy(false);
    if (ok) {
      setMsg('✓ کامیابی سے شامل ہو گیا');
      setForm({ title: '', type: 'audio', category: '', author: '', language: 'ur', url: '', description: '' });
    } else {
      setMsg('خرابی — دوبارہ کوشش کریں');
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setMsg('اپلوڈ ہو رہا ہے...');
    // Store as object URL for demo purposes (in real app, would upload to storage)
    const objUrl = URL.createObjectURL(file);
    const mt = (file.type || '').toLowerCase();
    let type = form.type;
    if (mt.startsWith('audio/')) type = 'audio';
    else if (mt.startsWith('video/')) type = 'video';
    else if (mt.includes('pdf') || mt.includes('epub')) type = 'book';
    update({ url: objUrl, type, title: form.title || file.name });
    setMsg('فائل تیار — اب سیو کریں');
    setBusy(false);
  }

  return (
    <div className="space-y-5 max-w-2xl animate-fade-in-up">
      {/* Add form */}
      <div
        className="glass-card-strong rounded-2xl p-5 sm:p-6 border-2 border-dashed"
        style={{ borderColor: `${theme.accent}30` }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${theme.accent}18` }}>
            <Plus size={20} style={{ color: theme.accent }} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">نیا مواد شامل کریں</h2>
            <p className="text-[11px] text-gray-500">آڈیو · ویڈیو · کتاب · تفسیر · لنک — سب خودبخود سنک ہوتا ہے</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">عنوان *</label>
            <input
              dir="auto"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2"
              style={{ ['--tw-ring-color' as string]: `${theme.accent}40` }}
              value={form.title}
              onChange={e => update({ title: e.target.value })}
              placeholder="مثلاً: بیان القرآن — سورہ الفاتحہ"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">قسم *</label>
            <select value={form.type} onChange={e => update({ type: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
              <option value="audio">🎧 آڈیو</option>
              <option value="video">🎬 ویڈیو</option>
              <option value="book">📖 کتاب / پی ڈی ایف</option>
              <option value="tafsir">📚 تفسیر</option>
              <option value="translation">🌐 ترجمہ</option>
              <option value="channel">📡 یوٹیوب چینل</option>
              <option value="link">🔗 ویب لنک</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">زبان</label>
            <select value={form.language} onChange={e => update({ language: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
              <option value="ur">اردو</option>
              <option value="ar">عربی</option>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="fa">فارسی</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">زمرہ</label>
            <input dir="auto" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none"
              value={form.category} onChange={e => update({ category: e.target.value })}
              placeholder="بیان القرآن / تفاسیر / تلاوت" />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">مصنف / قاری</label>
            <input dir="auto" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none"
              value={form.author} onChange={e => update({ author: e.target.value })}
              placeholder="ڈاکٹر اسرار احمدؒ" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">تفصیل</label>
            <textarea dir="auto" rows={2} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none resize-none"
              value={form.description} onChange={e => update({ description: e.target.value })}
              placeholder="مختصر تفصیل..." />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">URL / لنک</label>
            <input className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none"
              value={form.url} onChange={e => update({ url: e.target.value })}
              placeholder="https://... یا نیچے فائل اپلوڈ کریں" />
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 text-sm text-gray-500">
            {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            فائل اپلوڈ کریں (آڈیو / ویڈیو / پی ڈی ایف / ای بک)
            <input type="file" className="hidden" onChange={handleFile} disabled={busy}
              accept="audio/*,video/*,application/pdf,.epub,.mobi,.doc,.docx,.txt" />
          </label>
          <button
            onClick={handleSubmit} disabled={busy}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white disabled:opacity-50 transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            محفوظ و سنک کریں
          </button>
        </div>

        {msg && (
          <div
            className={`mt-3 text-xs px-3 py-2 rounded-xl ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}
          >
            {msg}
          </div>
        )}

        <p className="mt-4 pt-4 border-t border-gray-100 text-[10px] text-gray-400 leading-relaxed" dir="rtl">
          ✓ شامل کردہ مواد خودبخود لائبریری، تفاسیر، اور بیان القرآن سیکشنز میں نمودار ہو گا
        </p>
      </div>

      {/* Recent items */}
      <div className="glass-card-strong rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Sparkles size={14} style={{ color: theme.accent }} />
            حال ہی میں شامل ({items.length})
          </h3>
        </div>
        <div className="divide-y divide-white/40">
          {items.slice(0, 20).map(m => {
            const Icon = typeIcon(safe(m.type));
            const color = typeColor(safe(m.type));
            return (
              <div key={m.id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/40 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={13} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate" dir="rtl">{safe(m.title)}</p>
                  <p className="text-[10px] text-gray-400">{safe(m.type)} · {safe(m.added_at)}</p>
                </div>
                <button onClick={() => onDelete(m.id)} className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={11} />
                </button>
              </div>
            );
          })}
          {items.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-400">ابھی کوئی آئٹم نہیں</div>
          )}
        </div>
      </div>
    </div>
  );
}
