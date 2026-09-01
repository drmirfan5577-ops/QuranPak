import React, { useState } from 'react';
import { FileText, Download, ExternalLink, BookOpen } from 'lucide-react';
import { PDF_SOURCES } from '@/constants/quran';
import type { Theme } from '@/types/quran';

interface Props {
  theme: Theme;
}

export default function PDFViewer({ theme }: Props) {
  const [selected, setSelected] = useState(0);

  const source = PDF_SOURCES[selected];

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Source selector */}
      <div className="glass-card-strong rounded-2xl p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <BookOpen size={14} style={{ color: theme.accent }} />
          پی ڈی ایف قرآن کریم — PDF Quran
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {PDF_SOURCES.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="text-xs px-3 py-2.5 rounded-xl border font-medium text-right transition-all"
              style={selected === i ? {
                background: `${theme.accent}15`,
                color: theme.bismillahColor,
                borderColor: `${theme.accent}40`,
              } : {
                background: 'rgba(255,255,255,0.7)',
                color: '#374151',
                borderColor: '#e5e7eb',
              }}
              dir="rtl"
            >
              {src.name}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="glass-card-strong rounded-xl p-3 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs text-gray-600 font-medium" dir="rtl">{source.name}</span>
        <div className="flex gap-2">
          <a
            href={source.url}
            download
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full font-medium text-white"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.bismillahColor})` }}
          >
            <Download size={12} /> ڈاؤنلوڈ
          </a>
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full font-medium border"
            style={{ borderColor: `${theme.accent}40`, color: theme.accent }}
          >
            <ExternalLink size={12} /> نئی ٹیب
          </a>
        </div>
      </div>

      {/* PDF embed via Google Docs viewer */}
      <div className="glass-card-strong rounded-2xl overflow-hidden" style={{ height: '75vh' }}>
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(source.url)}&embedded=true`}
          className="w-full h-full border-0"
          title="PDF Quran Viewer"
          loading="lazy"
        />
      </div>

      {/* Fallback note */}
      <div className="glass-card rounded-xl p-3 text-center">
        <p className="text-[11px] text-gray-500">
          اگر PDF لوڈ نہ ہو تو "ڈاؤنلوڈ" یا "نئی ٹیب" سے کھولیں
        </p>
      </div>
    </div>
  );
}
