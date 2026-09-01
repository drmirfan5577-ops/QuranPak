import { useState, useEffect, useRef, useCallback } from 'react';
import type { AyahData } from '@/types/quran';
import { API_BASE, AUDIO_CDN } from '@/constants/quran';

interface UseQuranReaderOptions {
  surahNum: number;
  reciterId: string;
  urduAudioId: string;
  urduTextId: string;
}

interface PlayerState {
  currentIdx: number;
  phase: 'idle' | 'arabic' | 'urdu';
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  rate: number;
  repeat: boolean;
  autoAdvance: boolean;
}

// Build a reliable audio URL — tries the API-supplied URL first,
// falls back to the CDN pattern that alquran.cloud uses.
function buildAudioUrl(apiUrl: string | undefined, reciterId: string, globalNum: number): string {
  if (apiUrl && apiUrl.startsWith('http')) return apiUrl;
  // Normalize the reciter id to the CDN segment:
  // ar.saadalghamdi -> Ghamdi_40      ar.alafasy -> Alafasy_64 etc.
  // The islamic.network CDN uses the same identifier as the API
  return `${AUDIO_CDN}/${reciterId}/${globalNum}.mp3`;
}

export function useQuranReader({ surahNum, reciterId, urduAudioId, urduTextId }: UseQuranReaderOptions) {
  const [ayahs, setAyahs] = useState<AyahData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [player, setPlayer] = useState<PlayerState>({
    currentIdx: 0,
    phase: 'idle',
    isPlaying: false,
    volume: 1,
    muted: false,
    rate: 1,
    repeat: false,
    autoAdvance: true,
  });

  // ─── Load surah ───────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      setAyahs([]);
      setPlayer(p => ({ ...p, currentIdx: 0, phase: 'idle', isPlaying: false }));
      if (audioRef.current) audioRef.current.pause();

      try {
        // Fetch Arabic text + Urdu text. Audio URLs are built via CDN.
        const editions = ['quran-uthmani', urduTextId].join(',');
        const res = await fetch(`${API_BASE}/surah/${surahNum}/editions/${editions}`);
        const json = await res.json();
        if (cancelled) return;

        if (json.code !== 200 || !Array.isArray(json.data)) {
          setError('سورہ لوڈ نہیں ہو سکی — دوبارہ کوشش کریں');
          setLoading(false);
          return;
        }

        const byId: Record<string, any> = {};
        json.data.forEach((ed: any) => { byId[ed.edition.identifier] = ed; });

        const arabicAyahs = byId['quran-uthmani']?.ayahs || [];
        const urduAyahs   = byId[urduTextId]?.ayahs || [];

        const combined: AyahData[] = arabicAyahs.map((a: any, i: number) => ({
          n: a.numberInSurah,
          globalNumber: a.number,
          arabic: a.text,
          urdu: urduAyahs[i]?.text || '',
          // Always build CDN URLs directly for maximum reliability
          arabicAudioUrl: `${AUDIO_CDN}/${reciterId}/${a.number}.mp3`,
          urduAudioUrl:   `${AUDIO_CDN}/${urduAudioId}/${a.number}.mp3`,
          juz: a.juz,
          page: a.page,
          sajda: a.sajda?.id ? true : false,
        }));

        if (!cancelled) {
          setAyahs(combined);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError('نیٹ ورک کی خرابی — براہ کرم دوبارہ کوشش کریں۔');
          setLoading(false);
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [surahNum, reciterId, urduAudioId, urduTextId]);

  // ─── Sync playback settings ──────────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = player.rate;
      audioRef.current.volume = player.muted ? 0 : player.volume;
    }
  }, [player.rate, player.volume, player.muted]);

  // ─── Core playPhase ───────────────────────────────────────────
  const playPhase = useCallback((idx: number, phase: 'arabic' | 'urdu') => {
    if (!ayahs[idx] || !audioRef.current) return;
    const url = phase === 'urdu' ? ayahs[idx].urduAudioUrl : ayahs[idx].arabicAudioUrl;
    console.log('[Quran Audio] Playing:', url, 'reciter:', phase === 'arabic' ? 'arabic' : 'urdu');
    audioRef.current.src = url;
    audioRef.current.load();
    audioRef.current.playbackRate = player.rate;
    audioRef.current.volume = player.muted ? 0 : player.volume;
    setPlayer(p => ({ ...p, currentIdx: idx, phase, isPlaying: true }));
    audioRef.current.play().catch(e => {
      console.error('[Quran Audio] Play error:', e);
      setPlayer(p => ({ ...p, isPlaying: false }));
    });
  }, [ayahs, player.rate, player.volume, player.muted]);

  // ─── Audio ended handler ──────────────────────────────────────
  const handleAudioEnded = useCallback(() => {
    setPlayer(p => {
      if (p.repeat) {
        setTimeout(() => playPhase(p.currentIdx, 'arabic'), 300);
        return p;
      }
      if (p.phase === 'arabic') {
        setTimeout(() => playPhase(p.currentIdx, 'urdu'), 400);
        return { ...p, phase: 'urdu' };
      }
      if (p.phase === 'urdu') {
        const nextIdx = p.currentIdx + 1;
        if (p.autoAdvance && nextIdx < ayahs.length) {
          setTimeout(() => playPhase(nextIdx, 'arabic'), 600);
          return { ...p, currentIdx: nextIdx, phase: 'arabic' };
        }
        return { ...p, isPlaying: false, phase: 'idle' };
      }
      return { ...p, isPlaying: false };
    });
  }, [ayahs.length, playPhase]);

  // ─── Public controls ──────────────────────────────────────────
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (player.isPlaying) {
      audioRef.current.pause();
      setPlayer(p => ({ ...p, isPlaying: false }));
    } else {
      if (player.phase === 'idle' || !audioRef.current.src) {
        playPhase(player.currentIdx, 'arabic');
      } else {
        audioRef.current.play()
          .then(() => setPlayer(p => ({ ...p, isPlaying: true })))
          .catch(() => {});
      }
    }
  }, [player.isPlaying, player.phase, player.currentIdx, playPhase]);

  const playAyah = useCallback((idx: number) => playPhase(idx, 'arabic'), [playPhase]);
  const prevAyah = useCallback(() => playPhase(Math.max(player.currentIdx - 1, 0), 'arabic'), [player.currentIdx, playPhase]);
  const nextAyah = useCallback(() => playPhase(Math.min(player.currentIdx + 1, ayahs.length - 1), 'arabic'), [player.currentIdx, ayahs.length, playPhase]);
  const updatePlayer = (patch: Partial<PlayerState>) => setPlayer(p => ({ ...p, ...patch }));

  return { ayahs, loading, error, audioRef, player, updatePlayer, togglePlay, playAyah, prevAyah, nextAyah, handleAudioEnded };
}
