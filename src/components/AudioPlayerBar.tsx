import React from 'react';
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Repeat, ListMusic,
  Loader2,
} from 'lucide-react';
import type { Theme, SurahMeta } from '@/types/quran';
import { RECITERS } from '@/constants/quran';

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

interface Props {
  player: PlayerState;
  totalAyahs: number;
  surahMeta: SurahMeta;
  reciterId: string;
  loading: boolean;
  theme: Theme;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onUpdate: (patch: Partial<PlayerState>) => void;
}

export default function AudioPlayerBar({
  player, totalAyahs, surahMeta, reciterId, loading, theme,
  onTogglePlay, onPrev, onNext, onUpdate,
}: Props) {
  const reciterName = RECITERS.find(r => r.id === reciterId)?.nameAr || reciterId;
  const phaseText = player.phase === 'arabic' ? 'عربی تلاوت' : player.phase === 'urdu' ? 'اردو ترجمہ' : 'تیار';

  return (
    <div className="player-float rounded-2xl p-4 sm:p-5">
      {/* Progress info */}
      <div className="flex items-center justify-between mb-3 text-xs text-gray-500" dir="rtl">
        <span className="font-quran text-sm font-semibold text-gray-800">{surahMeta.a}</span>
        <div className="flex items-center gap-2">
          <span>آیت {(player.currentIdx + 1)} / {totalAyahs}</span>
          {player.phase !== 'idle' && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: `${theme.accent}18`, color: theme.bismillahColor }}
            >
              {phaseText}
              {player.isPlaying && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-current animate-pulse" />}
            </span>
          )}
        </div>
        <span className="text-[10px] truncate max-w-[120px]">{reciterName}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Left: playback */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={player.currentIdx === 0}
            className="p-2.5 rounded-full border border-white/80 hover:bg-white/80 disabled:opacity-30 transition-all"
          >
            <SkipBack size={15} className="text-gray-700" />
          </button>

          <button
            onClick={onTogglePlay}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
          >
            {loading
              ? <Loader2 size={18} className="text-white animate-spin" />
              : player.isPlaying
                ? <Pause size={18} className="text-white" />
                : <Play size={18} className="text-white ml-0.5" />
            }
          </button>

          <button
            onClick={onNext}
            disabled={player.currentIdx >= totalAyahs - 1}
            className="p-2.5 rounded-full border border-white/80 hover:bg-white/80 disabled:opacity-30 transition-all"
          >
            <SkipForward size={15} className="text-gray-700" />
          </button>

          {/* Repeat */}
          <button
            onClick={() => onUpdate({ repeat: !player.repeat })}
            className="p-2 rounded-full border transition-all"
            style={{
              background: player.repeat ? `${theme.accent}18` : 'transparent',
              borderColor: player.repeat ? `${theme.accent}40` : 'rgba(255,255,255,0.8)',
              color: player.repeat ? theme.accent : '#9ca3af',
            }}
            title="آیت دہرائیں"
          >
            <Repeat size={13} />
          </button>

          {/* Auto-advance */}
          <button
            onClick={() => onUpdate({ autoAdvance: !player.autoAdvance })}
            className="p-2 rounded-full border transition-all"
            style={{
              background: player.autoAdvance ? `${theme.accent}18` : 'transparent',
              borderColor: player.autoAdvance ? `${theme.accent}40` : 'rgba(255,255,255,0.8)',
              color: player.autoAdvance ? theme.accent : '#9ca3af',
            }}
            title="خودکار اگلی آیت"
          >
            <ListMusic size={13} />
          </button>
        </div>

        {/* Right: volume + speed */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdate({ muted: !player.muted })}
            className="p-2 rounded-full hover:bg-white/80 transition-colors"
          >
            {player.muted || player.volume === 0
              ? <VolumeX size={14} className="text-gray-400" />
              : <Volume2 size={14} style={{ color: theme.accent }} />
            }
          </button>
          <input
            type="range"
            min="0" max="1" step="0.05"
            value={player.muted ? 0 : player.volume}
            onChange={e => onUpdate({ volume: parseFloat(e.target.value), muted: false })}
            className="w-16 sm:w-24"
          />
          <select
            value={player.rate}
            onChange={e => onUpdate({ rate: parseFloat(e.target.value) })}
            className="text-xs border border-white/80 rounded-full px-2.5 py-1.5 bg-white/80 text-gray-700 focus:outline-none"
          >
            <option value={0.6}>0.6×</option>
            <option value={0.75}>0.75×</option>
            <option value={1}>1×</option>
            <option value={1.25}>1.25×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </div>
      </div>
    </div>
  );
}
