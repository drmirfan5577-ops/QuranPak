import React, { useEffect, useState } from 'react';
import { Star, RefreshCw, BookOpen, Sparkles } from 'lucide-react';
import type { Theme } from '@/types/quran';
import { API_BASE } from '@/constants/quran';
import { useDailyAyah } from '@/hooks/useSupabaseData';
import { SURAHS } from '@/constants/quran';

interface Props {
  theme: Theme;
  onNavigate: (surah: number, ayah: number) => void;
}

// Featured ayahs list for random daily selection when no admin has set one
const FEATURED: Array<{ s: number; a: number }> = [
  {s:2,a:255},{s:2,a:286},{s:3,a:200},{s:6,a:125},{s:7,a:204},
  {s:9,a:128},{s:13,a:28},{s:16,a:97},{s:18,a:10},{s:24,a:35},
  {s:25,a:63},{s:29,a:45},{s:33,a:56},{s:36,a:1},{s:39,a:53},
  {s:55,a:1},{s:56,a:77},{s:67,a:1},{s:94,a:5},{s:112,a:1},
];

export default function DailyAyahWidget({ theme, onNavigate }: Props) {
  const { dailyAyah, loading: daLoading } = useDailyAyah();
  const [ayahData, setAyahData] = useState<{ arabic: string; urdu: string; surahName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [featuredRef, setFeaturedRef] = useState<{ s: number; a: number } | null>(null);

  useEffect(() => {
    async function loadAyah() {
      setLoading(true);
      let ref: { s: number; a: number };

      if (dailyAyah) {
        ref = { s: dailyAyah.surah_num, a: dailyAyah.ayah_num };
      } else {
        // Pick a deterministic daily ayah based on day of year
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        ref = FEATURED[dayOfYear % FEATURED.length];
      }
      setFeaturedRef(ref);

      try {
        const [arRes, urRes] = await Promise.all([
          fetch(`${API_BASE}/ayah/${ref.s}:${ref.a}/quran-uthmani`),
          fetch(`${API_BASE}/ayah/${ref.s}:${ref.a}/ur.junagarhi`),
        ]);
        const [ar, ur] = await Promise.all([arRes.json(), urRes.json()]);
        const surah = SURAHS.find(s => s.n === ref.s);
        setAyahData({
          arabic: ar?.data?.text || '',
          urdu: ur?.data?.text || '',
          surahName: surah ? `${surah.a} — ${surah.u} (${ref.s}:${ref.a})` : `${ref.s}:${ref.a}`,
        });
      } catch {
        setAyahData(null);
      } finally {
        setLoading(false);
      }
    }

    if (!daLoading) loadAyah();
  }, [dailyAyah, daLoading]);

  if (loading || daLoading) {
    return (
      <div className="glass-card-strong rounded-2xl p-5 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
        <div className="h-8 w-full bg-gray-100 rounded mb-2" />
        <div className="h-5 w-3/4 bg-gray-100 rounded" />
      </div>
    );
  }

  if (!ayahData) return null;

  return (
    <div
      className="glass-card-strong rounded-2xl p-5 sm:p-6 relative overflow-hidden animate-fade-in-up"
      style={{
        background: `linear-gradient(135deg, ${theme.bismillahGlow}, rgba(255,255,255,0.92))`,
        borderLeft: `3px solid ${theme.accent}`,
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.accent} 1px, transparent 1px), radial-gradient(circle at 80% 50%, ${theme.accent} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${theme.accent}20` }}
          >
            <Star size={14} style={{ color: theme.accent }} />
          </div>
          <div>
            <h3 className="text-xs font-bold" style={{ color: theme.bismillahColor }}>آیتِ روز — Daily Ayah</h3>
            <p className="text-[9px] text-gray-500" dir="rtl">{ayahData.surahName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-semibold animate-pulse-glow"
            style={{ background: `${theme.accent}18`, color: theme.accent }}
          >
            <Sparkles size={8} className="inline mr-0.5" />
            روزانہ
          </span>
          {featuredRef && (
            <button
              onClick={() => onNavigate(featuredRef.s, featuredRef.a)}
              className="p-1.5 rounded-full hover:bg-white/60 transition-all"
              title="اس آیت پر جائیں"
            >
              <BookOpen size={13} style={{ color: theme.accent }} />
            </button>
          )}
        </div>
      </div>

      {/* Arabic text */}
      <p
        className="text-[22px] sm:text-[26px] leading-[2] text-right mb-3 relative z-10 font-quran"
        dir="rtl" lang="ar"
        style={{
          color: theme.bismillahColor,
          textShadow: `0 0 20px ${theme.bismillahGlow}`,
          fontWeight: 600,
        }}
      >
        {ayahData.arabic}
      </p>

      {/* Urdu translation */}
      <p
        className="text-sm sm:text-base leading-[1.9] text-right relative z-10 font-urdu"
        dir="rtl" lang="ur"
        style={{ color: '#374151' }}
      >
        {ayahData.urdu}
      </p>
    </div>
  );
}
