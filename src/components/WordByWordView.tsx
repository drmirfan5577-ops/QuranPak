import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Globe, ChevronDown } from 'lucide-react';
import { QURAN_COM, WBW_LANGUAGES } from '@/constants/quran';
import type { Theme } from '@/types/quran';

interface Word {
  id: number;
  position: number;
  text_uthmani: string;
  transliteration?: { text: string };
  translation?: { text: string };
  char_type_name: string;
}

interface VerseWBW {
  id: number;
  verse_number: number;
  words: Word[];
}

interface Props {
  surahNum: number;
  theme: Theme;
  selectedLang: string;
  onLangChange: (lang: string) => void;
  fontSize?: number;
}

const cache: Record<string, VerseWBW[]> = {};

export default function WordByWordView({ surahNum, theme, selectedLang, onLangChange, fontSize = 22 }: Props) {
  const [verses, setVerses] = useState<VerseWBW[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PER_PAGE = 20;
  const cacheKey = `${surahNum}-${selectedLang}-${page}`;

  useEffect(() => {
    setVerses([]);
    setPage(1);
    setHasMore(true);
  }, [surahNum, selectedLang]);

  useEffect(() => {
    if (cache[cacheKey]) {
      if (page === 1) setVerses(cache[cacheKey]);
      else setVerses(prev => [...prev, ...cache[cacheKey]]);
      setHasMore(cache[cacheKey].length === PER_PAGE);
      return;
    }

    setLoading(true);
    setError('');

    const url = `${QURAN_COM}/verses/by_chapter/${surahNum}?language=${selectedLang}&words=true&word_translation_language=${selectedLang}&per_page=${PER_PAGE}&page=${page}&fields=text_uthmani`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        const newVerses: VerseWBW[] = data.verses || [];
        cache[cacheKey] = newVerses;
        if (page === 1) setVerses(newVerses);
        else setVerses(prev => [...prev, ...newVerses]);
        setHasMore(newVerses.length === PER_PAGE);
        setLoading(false);
      })
      .catch(() => {
        setError('لوڈ نہیں ہو سکا — دوبارہ کوشش کریں');
        setLoading(false);
      });
  }, [surahNum, selectedLang, page, cacheKey]);

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Language selector */}
      <div className="glass-card-strong rounded-xl p-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Globe size={13} style={{ color: theme.accent }} />
          <span className="text-xs font-semibold text-gray-700">ترجمہ کی زبان:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {WBW_LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => onLangChange(l.code)}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium border transition-all"
              style={selectedLang === l.code ? {
                background: `${theme.accent}20`,
                color: theme.bismillahColor,
                borderColor: `${theme.accent}40`,
              } : {
                background: 'rgba(255,255,255,0.7)',
                color: '#6b7280',
                borderColor: '#e5e7eb',
              }}
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>

      {/* Verses */}
      <div className="space-y-4">
        {verses.map(verse => (
          <div
            key={verse.id}
            className="glass-card-strong rounded-2xl p-4 sm:p-5"
          >
            {/* Ayah number */}
            <div className="flex items-center justify-end mb-3">
              <span
                className="text-[10px] px-2.5 py-0.5 rounded-full font-bold"
                style={{ background: `${theme.accent}18`, color: theme.bismillahColor }}
              >
                آیت {verse.verse_number}
              </span>
            </div>

            {/* Word grid */}
            <div
              className="flex flex-wrap gap-3 justify-end"
              dir="rtl"
            >
              {verse.words
                .filter(w => w.char_type_name === 'word')
                .map(word => (
                  <div
                    key={word.id}
                    className="flex flex-col items-center gap-0.5 group cursor-default"
                  >
                    {/* Arabic word */}
                    <span
                      className="font-quran leading-tight text-center px-1.5 py-0.5 rounded-lg group-hover:bg-white/60 transition-all"
                      style={{
                        fontSize,
                        color: theme.bismillahColor,
                        fontWeight: 600,
                      }}
                    >
                      {word.text_uthmani}
                    </span>
                    {/* Transliteration */}
                    {word.transliteration?.text && (
                      <span className="text-[9px] text-gray-400 italic leading-tight text-center">
                        {word.transliteration.text}
                      </span>
                    )}
                    {/* Translation */}
                    {word.translation?.text && (
                      <span
                        className="text-[10px] font-medium leading-tight text-center max-w-[80px] text-wrap"
                        style={{ color: theme.accent, direction: 'ltr' }}
                      >
                        {word.translation.text}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 size={20} className="animate-spin" style={{ color: theme.accent }} />
        </div>
      )}
      {error && <p className="text-center text-sm text-red-500 py-4">{error}</p>}
      {hasMore && !loading && verses.length > 0 && (
        <button
          onClick={() => setPage(p => p + 1)}
          className="w-full py-3 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
        >
          <ChevronDown size={14} /> مزید لوڈ کریں
        </button>
      )}
    </div>
  );
}
