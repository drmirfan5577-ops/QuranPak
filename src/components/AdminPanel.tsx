import React, { useState, useEffect } from 'react';
import {
  Lock, Unlock, Settings, Palette, Type, Sliders, Library, Bookmark,
  Star, Key, RefreshCw, Plus, Trash2, Loader2, Check, Eye, EyeOff,
  BookOpen, Headphones, Video, Book, Youtube, Globe, FileText, Languages, Upload,
} from 'lucide-react';
import { THEMES, RECITERS, URDU_TEXT_TRANSLATIONS, URDU_AUDIO_TRANSLATIONS, TAFSIR_EDITIONS } from '@/constants/quran';
import type { Theme, ThemeId, TextStyle, FontWeight, TextGlow, TextAnim, MediaItem } from '@/types/quran';
import { useAppSettings, useLibrary, useDailyAyah } from '@/hooks/useSupabaseData';
import { supabase } from '@/lib/supabase';

interface Props {
  theme: Theme;
  onThemeChange: (id: ThemeId) => void;
  textStyle: TextStyle;
  onTextStyleChange: (s: TextStyle) => void;
  reciterId: string;
  onReciterChange: (id: string) => void;
  urduTextId: string;
  onUrduTextChange: (id: string) => void;
  urduAudioId: string;
  onUrduAudioChange: (id: string) => void;
  tafsirId: string;
  onTafsirChange: (id: string) => void;
}

const SECTION_BTN = 'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border';

export default function AdminPanel(props: Props) {
  const { theme, onThemeChange, textStyle, onTextStyleChange,
    reciterId, onReciterChange, urduTextId, onUrduTextChange,
    urduAudioId, onUrduAudioChange, tafsirId, onTafsirChange } = props;

  // ─── Auth ────────────────────────────────────────────────────────
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const { settings, setSetting } = useAppSettings();

  const ADMIN_PASSWORD = settings['admin_password'] || '1122';

  function tryUnlock() {
    if (pwd === ADMIN_PASSWORD) {
      setUnlocked(true);
      setPwdError('');
    } else {
      setPwdError('غلط پاسورڈ — Wrong Password');
    }
  }

  // ─── Library ─────────────────────────────────────────────────────
  const { items: libItems, addItem, deleteItem } = useLibrary();
  const [libForm, setLibForm] = useState({ title: '', type: 'audio', category: '', author: '', language: 'ur', url: '', description: '' });
  const [libBusy, setLibBusy] = useState(false);
  const [libMsg, setLibMsg] = useState('');

  async function handleAddLib() {
    if (!libForm.title.trim() || !libForm.url.trim()) { setLibMsg('عنوان اور URL لازمی ہیں'); return; }
    setLibBusy(true);
    const ok = await addItem({ ...libForm, type: libForm.type as MediaItem['type'], surah_start: null, surah_end: null, added_at: new Date().toISOString().slice(0, 10) });
    setLibBusy(false);
    setLibMsg(ok ? '✓ شامل ہو گیا' : '✗ خرابی');
    if (ok) setLibForm({ title: '', type: 'audio', category: '', author: '', language: 'ur', url: '', description: '' });
  }

  // ─── Daily Ayah ──────────────────────────────────────────────────
  const { setDailyAyahForToday } = useDailyAyah();
  const [daSurah, setDaSurah] = useState(1);
  const [daAyah, setDaAyah] = useState(1);
  const [daNote, setDaNote] = useState('');
  const [daMsg, setDaMsg] = useState('');

  async function handleSetDailyAyah() {
    await setDailyAyahForToday(daSurah, daAyah, daNote);
    setDaMsg('✓ آج کی آیت سیٹ ہو گئی');
  }

  // ─── Password change ─────────────────────────────────────────────
  const [newPwd, setNewPwd] = useState('');
  const [pwdChangeMsg, setPwdChangeMsg] = useState('');

  async function handleChangePwd() {
    if (!newPwd || newPwd.length < 4) { setPwdChangeMsg('کم از کم 4 حروف'); return; }
    await setSetting('admin_password', newPwd);
    setPwdChangeMsg('✓ پاسورڈ تبدیل ہو گیا');
    setNewPwd('');
  }

  // ─── Active section ──────────────────────────────────────────────
  const [section, setSection] = useState<'themes' | 'text' | 'audio' | 'library' | 'daily' | 'security'>('themes');

  // ─── Lock screen ─────────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in-up">
        <div className="glass-card-strong rounded-2xl p-8 w-full max-w-sm text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
          >
            <Lock size={28} className="text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">ایڈمن پینل</h2>
          <p className="text-xs text-gray-500 mb-6">Admin Panel — Password Protected</p>

          <div className="relative mb-3">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="پاسورڈ داخل کریں"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-lg font-mono bg-white focus:outline-none focus:ring-2"
              style={{ ['--tw-ring-color' as string]: `${theme.accent}40` }}
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && tryUnlock()}
              dir="ltr"
            />
            <button
              onClick={() => setShowPwd(p => !p)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {pwdError && <p className="text-xs text-red-500 mb-3">{pwdError}</p>}
          <button
            onClick={tryUnlock}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
          >
            داخل ہوں — Enter
          </button>
          <p className="text-[9px] text-gray-400 mt-3">Default password: 1122</p>
        </div>
      </div>
    );
  }

  // ─── Admin content ───────────────────────────────────────────────
  const sections = [
    { id: 'themes',   label: 'تھیمز',       icon: Palette },
    { id: 'text',     label: 'متن',          icon: Type },
    { id: 'audio',    label: 'آڈیو',         icon: Headphones },
    { id: 'library',  label: 'لائبریری',    icon: Library },
    { id: 'daily',    label: 'روزانہ آیت', icon: Star },
    { id: 'security', label: 'سیکیورٹی',   icon: Key },
  ] as const;

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="glass-card-strong rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
          >
            <Unlock size={17} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">ایڈمن پینل — Admin Control</h2>
            <p className="text-[10px] text-gray-500">مکمل کنٹرول و کمانڈ — Full App Management</p>
          </div>
        </div>
        <button
          onClick={() => setUnlocked(false)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs border text-gray-500 hover:bg-gray-50"
        >
          <Lock size={12} /> لاک
        </button>
      </div>

      {/* Section nav */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {sections.map(s => {
          const Icon = s.icon;
          const active = section === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id as typeof section)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all shrink-0"
              style={active ? {
                background: `${theme.accent}18`,
                color: theme.bismillahColor,
                borderColor: `${theme.accent}35`,
              } : {
                background: 'rgba(255,255,255,0.6)',
                color: '#6b7280',
                borderColor: 'transparent',
              }}
            >
              <Icon size={12} /> {s.label}
            </button>
          );
        })}
      </div>

      {/* ─── THEMES ─── */}
      {section === 'themes' && (
        <div className="glass-card-strong rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Palette size={14} style={{ color: theme.accent }} /> تھیم منتخب کریں — Select Theme
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className="rounded-2xl p-3 border-2 text-center transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${t.orb1}, ${t.orb2}, ${t.orb3})`,
                  borderColor: theme.id === t.id ? t.accent : 'transparent',
                  boxShadow: theme.id === t.id ? `0 0 0 3px ${t.accentLight}, 0 4px 16px ${t.bismillahGlow}` : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div className="text-xs font-bold text-gray-800">{t.name}</div>
                <div className="text-[9px] text-gray-600 mt-0.5">{t.nameUr}</div>
                {theme.id === t.id && (
                  <div className="mt-1">
                    <Check size={10} style={{ color: t.accent }} className="mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── TEXT STYLE ─── */}
      {section === 'text' && (
        <div className="glass-card-strong rounded-2xl p-5 space-y-5">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Type size={14} style={{ color: theme.accent }} /> متن کی ترتیبات — Text Properties
          </h3>

          {/* Arabic font size */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-2 block">
              عربی فونٹ سائز: {textStyle.arabicFontSize}px
            </label>
            <input type="range" min="18" max="52" step="2"
              value={textStyle.arabicFontSize}
              onChange={e => onTextStyleChange({ ...textStyle, arabicFontSize: +e.target.value })}
              className="w-full"
            />
            <p className="text-right font-quran mt-2" style={{ fontSize: textStyle.arabicFontSize, color: theme.bismillahColor }}>
              بِسۡمِ ٱللَّهِ
            </p>
          </div>

          {/* Urdu font size */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-2 block">
              اردو فونٹ سائز: {textStyle.urduFontSize}px
            </label>
            <input type="range" min="12" max="28" step="1"
              value={textStyle.urduFontSize}
              onChange={e => onTextStyleChange({ ...textStyle, urduFontSize: +e.target.value })}
              className="w-full"
            />
            <p className="text-right font-urdu mt-1" style={{ fontSize: textStyle.urduFontSize }}>
              اللہ کے نام سے
            </p>
          </div>

          {/* Font weight */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-2 block">موٹائی — Font Weight</label>
            <div className="flex gap-2">
              {(['normal', 'bold', 'extrabold'] as FontWeight[]).map(w => (
                <button
                  key={w}
                  onClick={() => onTextStyleChange({ ...textStyle, fontWeight: w })}
                  className="flex-1 py-2 rounded-xl text-xs border font-medium transition-all"
                  style={textStyle.fontWeight === w ? {
                    background: `${theme.accent}18`, color: theme.bismillahColor, borderColor: `${theme.accent}40`,
                  } : { background: 'white', color: '#6b7280', borderColor: '#e5e7eb' }}
                >
                  {w === 'normal' ? 'عادی' : w === 'bold' ? 'Bold' : 'Extra Bold'}
                </button>
              ))}
            </div>
          </div>

          {/* Glow */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-2 block">چمک — Text Glow</label>
            <div className="flex gap-2">
              {(['none', 'subtle', 'strong'] as TextGlow[]).map(g => (
                <button
                  key={g}
                  onClick={() => onTextStyleChange({ ...textStyle, glow: g })}
                  className="flex-1 py-2 rounded-xl text-xs border font-medium transition-all"
                  style={textStyle.glow === g ? {
                    background: `${theme.accent}18`, color: theme.bismillahColor, borderColor: `${theme.accent}40`,
                  } : { background: 'white', color: '#6b7280', borderColor: '#e5e7eb' }}
                >
                  {g === 'none' ? 'بند' : g === 'subtle' ? 'ہلکی' : 'تیز'}
                </button>
              ))}
            </div>
          </div>

          {/* Animation */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-2 block">متحرک — Animation</label>
            <div className="flex gap-2 flex-wrap">
              {(['none', 'pulse', 'shimmer', 'float'] as TextAnim[]).map(a => (
                <button
                  key={a}
                  onClick={() => onTextStyleChange({ ...textStyle, animation: a })}
                  className="px-3 py-2 rounded-xl text-xs border font-medium transition-all"
                  style={textStyle.animation === a ? {
                    background: `${theme.accent}18`, color: theme.bismillahColor, borderColor: `${theme.accent}40`,
                  } : { background: 'white', color: '#6b7280', borderColor: '#e5e7eb' }}
                >
                  {a === 'none' ? 'بند' : a === 'pulse' ? 'پلس' : a === 'shimmer' ? 'شمر' : 'فلوٹ'}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-2xl border" style={{ borderColor: `${theme.accent}25`, background: `${theme.bismillahGlow}` }}>
            <p
              className={`font-quran text-right leading-[2] ${textStyle.animation === 'pulse' ? 'animate-pulse-glow' : textStyle.animation === 'shimmer' ? 'animate-shimmer' : textStyle.animation === 'float' ? 'animate-float' : ''}`}
              dir="rtl"
              style={{
                fontSize: textStyle.arabicFontSize,
                fontWeight: textStyle.fontWeight === 'extrabold' ? 800 : textStyle.fontWeight === 'bold' ? 700 : 400,
                color: theme.bismillahColor,
                textShadow: textStyle.glow === 'subtle' ? `0 0 16px ${theme.bismillahGlow}` : textStyle.glow === 'strong' ? `0 0 32px ${theme.accent}, 0 0 60px ${theme.bismillahGlow}` : 'none',
              }}
            >
              بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        </div>
      )}

      {/* ─── AUDIO SETTINGS ─── */}
      {section === 'audio' && (
        <div className="glass-card-strong rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Headphones size={14} style={{ color: theme.accent }} /> آڈیو ترتیبات — Audio Settings
          </h3>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">قاری — Reciter</label>
            <select value={reciterId} onChange={e => onReciterChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
              {RECITERS.map(r => <option key={r.id} value={r.id}>{r.nameAr} — {r.name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">اردو آڈیو ترجمہ</label>
            <select value={urduAudioId} onChange={e => onUrduAudioChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
              {URDU_AUDIO_TRANSLATIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">اردو متنی ترجمہ</label>
            <select value={urduTextId} onChange={e => onUrduTextChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
              {URDU_TEXT_TRANSLATIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 mb-1 block">تفسیر</label>
            <select value={tafsirId} onChange={e => onTafsirChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
              {TAFSIR_EDITIONS.map(r => <option key={r.id} value={r.id}>{r.nameAr}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* ─── LIBRARY ─── */}
      {section === 'library' && (
        <div className="space-y-4">
          {/* Add form */}
          <div className="glass-card-strong rounded-2xl p-5 border-2 border-dashed" style={{ borderColor: `${theme.accent}30` }}>
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Plus size={14} style={{ color: theme.accent }} /> نیا مواد شامل کریں
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-semibold text-gray-500 mb-1 block">عنوان *</label>
                <input dir="auto" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white"
                  value={libForm.title} onChange={e => setLibForm(f => ({ ...f, title: e.target.value }))} placeholder="عنوان..." />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 mb-1 block">قسم</label>
                <select value={libForm.type} onChange={e => setLibForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white">
                  <option value="audio">🎧 آڈیو</option>
                  <option value="video">🎬 ویڈیو</option>
                  <option value="book">📖 کتاب</option>
                  <option value="tafsir">📚 تفسیر</option>
                  <option value="translation">🌐 ترجمہ</option>
                  <option value="channel">📡 چینل</option>
                  <option value="link">🔗 لنک</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 mb-1 block">مصنف</label>
                <input dir="auto" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white"
                  value={libForm.author} onChange={e => setLibForm(f => ({ ...f, author: e.target.value }))} placeholder="مصنف..." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-semibold text-gray-500 mb-1 block">URL *</label>
                <input className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white"
                  value={libForm.url} onChange={e => setLibForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." dir="ltr" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button onClick={handleAddLib} disabled={libBusy}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-50 transition-all"
                style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}>
                {libBusy ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                شامل کریں
              </button>
              {libMsg && <span className={`text-xs ${libMsg.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>{libMsg}</span>}
            </div>
          </div>

          {/* Library list */}
          <div className="glass-card-strong rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/40">
              <h3 className="text-sm font-bold text-gray-900">تمام آئٹمز ({libItems.length})</h3>
            </div>
            <div className="divide-y divide-white/30 max-h-64 overflow-y-auto">
              {libItems.map(m => (
                <div key={m.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/40">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate" dir="rtl">{m.title}</p>
                    <p className="text-[9px] text-gray-400">{m.type} · {m.added_at}</p>
                  </div>
                  <button onClick={() => deleteItem(m.id)} className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500">
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
              {libItems.length === 0 && <div className="py-8 text-center text-xs text-gray-400">کوئی آئٹم نہیں</div>}
            </div>
          </div>
        </div>
      )}

      {/* ─── DAILY AYAH ─── */}
      {section === 'daily' && (
        <div className="glass-card-strong rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Star size={14} style={{ color: theme.accent }} /> آج کی آیت سیٹ کریں
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold text-gray-500 mb-1 block">سورہ نمبر</label>
              <input type="number" min="1" max="114" value={daSurah}
                onChange={e => setDaSurah(+e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-center" dir="ltr" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-500 mb-1 block">آیت نمبر</label>
              <input type="number" min="1" value={daAyah}
                onChange={e => setDaAyah(+e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-center" dir="ltr" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-gray-500 mb-1 block">نوٹ</label>
            <input dir="auto" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white"
              value={daNote} onChange={e => setDaNote(e.target.value)} placeholder="اختیاری نوٹ..." />
          </div>
          <button onClick={handleSetDailyAyah}
            className="w-full py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}>
            آج کی آیت سیٹ کریں
          </button>
          {daMsg && <p className="text-xs text-green-600 text-center">{daMsg}</p>}
        </div>
      )}

      {/* ─── SECURITY ─── */}
      {section === 'security' && (
        <div className="glass-card-strong rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Key size={14} style={{ color: theme.accent }} /> پاسورڈ تبدیل کریں
          </h3>
          <div>
            <label className="text-[10px] font-semibold text-gray-500 mb-1 block">نیا پاسورڈ</label>
            <input
              type="password"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white"
              value={newPwd}
              onChange={e => setNewPwd(e.target.value)}
              placeholder="نیا پاسورڈ (4+ حروف)"
              dir="ltr"
            />
          </div>
          <button onClick={handleChangePwd}
            className="w-full py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}>
            پاسورڈ تبدیل کریں
          </button>
          {pwdChangeMsg && <p className="text-xs text-green-600 text-center">{pwdChangeMsg}</p>}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[10px] text-gray-400 text-center">موجودہ پاسورڈ: {ADMIN_PASSWORD} | Supabase سے محفوظ</p>
          </div>
        </div>
      )}
    </div>
  );
}
