import React, { useMemo } from 'react';

// ─── Tajweed color rules ──────────────────────────────────────────
// Qalqalah: ق ط ب ج د
const QALQALAH = new Set([0x642, 0x637, 0x628, 0x62C, 0x62F]);
// Heavy (Mufakhkham): خ ص ض ط ظ غ ق
const HEAVY     = new Set([0x62E, 0x635, 0x636, 0x637, 0x638, 0x63A, 0x642]);
// Leen / Soft: و ي
const LEEN      = new Set([0x648, 0x64A]);
// Lam, Ra
const LAM_RA    = new Set([0x644, 0x631]);
// Ayn, Ghayn
const AYN_GHAYN = new Set([0x639, 0x63A]);
// Ha, Ta Marbouta
const HA_TA     = new Set([0x647, 0x629]);
// Shadda diacritic
const SHADDA = 0x651;
// Sukoon
const SUKOON = 0x652;
// Madd signs (alef / alef with madda)
const MADD = new Set([0x622, 0x627, 0x648, 0x64A, 0x623, 0x625, 0x649]);

function getTajweedColor(ch: string, nextCh: string): string {
  const code = ch.codePointAt(0) || 0;
  const nextCode = nextCh?.codePointAt(0) || 0;

  if (QALQALAH.has(code)) return '#e53e3e';           // Red: Qalqalah
  if (HEAVY.has(code)) return '#b7791f';               // Amber-Brown: Heavy
  if (code === SHADDA) return '#276749';               // Green: Shadda (Ghunnah)
  if (LAM_RA.has(code)) return '#744210';              // Brown: Lam/Ra
  if (AYN_GHAYN.has(code)) return '#2c7a7b';          // Teal: Ayn/Ghayn
  if (HA_TA.has(code)) return '#6b46c1';               // Purple: Ha/Ta
  if (LEEN.has(code) && nextCode === SUKOON) return '#3182ce'; // Blue: Leen
  if (MADD.has(code)) return '#2b6cb0';                // Deep Blue: Madd
  if (code === SUKOON) return '#718096';               // Gray: Sukoon
  return 'inherit';
}

interface Props {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  glowColor?: string;
}

export default function TajweedAyah({ text, fontSize = 28, fontWeight = '600', glowColor }: Props) {
  const segments = useMemo(() => {
    const chars = Array.from(text);
    return chars.map((ch, i) => ({
      ch,
      color: getTajweedColor(ch, chars[i + 1] || ''),
    }));
  }, [text]);

  return (
    <p
      className="leading-[2] text-right font-quran"
      dir="rtl" lang="ar"
      style={{
        fontSize,
        fontWeight,
        textShadow: glowColor ? `0 0 12px ${glowColor}` : undefined,
        wordSpacing: '0.08em',
        letterSpacing: '0.03em',
      }}
    >
      {segments.map((s, i) => (
        <span key={i} style={{ color: s.color }}>{s.ch}</span>
      ))}
    </p>
  );
}

// ─── Tajweed Legend ────────────────────────────────────────────────
export function TajweedLegend() {
  const rules = [
    { color: '#e53e3e', label: 'قلقلہ (Qalqalah)', letters: 'ق ط ب ج د' },
    { color: '#276749', label: 'غنہ / شدّہ (Ghunnah)',letters: 'شدّ' },
    { color: '#b7791f', label: 'تفخیم (Heavy)', letters: 'ص ض ط ظ' },
    { color: '#2b6cb0', label: 'مدّ (Madd)', letters: 'ا و ي' },
    { color: '#6b46c1', label: 'ہا / تا (Ha/Ta)', letters: 'ہ ة' },
    { color: '#2c7a7b', label: 'عین / غین', letters: 'ع غ' },
    { color: '#744210', label: 'لام / راء', letters: 'ل ر' },
  ];
  return (
    <div className="flex flex-wrap gap-2 mt-3 justify-end">
      {rules.map(r => (
        <div key={r.label} className="flex items-center gap-1 text-[9px] bg-white/60 px-2 py-0.5 rounded-full border border-white/80">
          <span style={{ color: r.color, fontFamily: 'Amiri Quran, serif', fontSize: 13 }}>{r.letters}</span>
          <span className="text-gray-500">{r.label}</span>
        </div>
      ))}
    </div>
  );
}
