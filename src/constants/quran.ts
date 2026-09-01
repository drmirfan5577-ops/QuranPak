import type { SurahMeta, Reciter, Translation, TafsirEdition, Theme, JuzInfo } from '@/types/quran';

export const API_BASE  = 'https://api.alquran.cloud/v1';
export const QURAN_COM = 'https://api.quran.com/api/v4';
export const AUDIO_CDN = 'https://cdn.islamic.network/quran/audio/128';

// ─── Reciters — IDs verified against alquran.cloud ─────────────
export const RECITERS: Reciter[] = [
  { id: 'ar.alafasy',            nameAr: 'مشاری العفاسی',              name: 'Mishary Rashid Alafasy'      },
  { id: 'ar.abdurrahmaansudais', nameAr: 'عبدالرحمن السدیس',           name: 'Abdurrahmaan As-Sudais'      },
  // Saad Al-Ghamdi — correct identifier on alquran.cloud
  { id: 'ar.saadalghamdi',       nameAr: 'سعد الغامدی',                name: 'Saad Al-Ghamdi'              },
  // Khalil Al-Jalil
  { id: 'ar.khalilaljaleel',     nameAr: 'خلیل الجلیل',                name: 'Khalil Al-Jalil'             },
  { id: 'ar.mahermuaiqly',       nameAr: 'ماھر المعیقلی',              name: 'Maher Al Muaiqly'            },
  { id: 'ar.shaatree',           nameAr: 'ابوبکر الشاطری',             name: 'Abu Bakr Ash-Shaatree'       },
  { id: 'ar.abdulsamad',         nameAr: 'عبدالباسط عبدالصمد',         name: 'Abdul Basit Abdul Samad'     },
  { id: 'ar.husary',             nameAr: 'محمود خلیل الحصری',          name: 'Mahmoud Khalil Al-Husary'    },
  { id: 'ar.hanirifai',          nameAr: 'ھانی الرفاعی',               name: 'Hani Ar-Rifai'               },
  { id: 'ar.muhammadayyoub',     nameAr: 'محمد أیوب',                  name: 'Muhammad Ayyoub'             },
  { id: 'ar.saoodshuraym',       nameAr: 'سعود الشریم',                name: 'Saud Ash-Shuraym'            },
  { id: 'ar.minshawi',           nameAr: 'محمد صدیق المنشاوی',         name: 'Muhammad Siddiq Al-Minshawi' },
  { id: 'ar.ibrahimakhbar',      nameAr: 'ابراہیم الاخضر',             name: 'Ibrahim Al-Akhdar'           },
];

// ─── Urdu Audio ──────────────────────────────────────────────────
export const URDU_AUDIO_TRANSLATIONS: Translation[] = [
  { id: 'ur.khan', name: 'شمشاد علی خان — Urdu Audio Translation' },
];

// ─── Urdu Text ───────────────────────────────────────────────────
export const URDU_TEXT_TRANSLATIONS: Translation[] = [
  { id: 'ur.junagarhi',  name: 'مولانا محمد جوناگڑھی' },
  { id: 'ur.maududi',    name: 'سیدابوالاعلیٰ مودودیؒ — تفہیم القرآن' },
  { id: 'ur.jalandhry',  name: 'مولانا فتح محمد جالندھری' },
  { id: 'ur.qadri',      name: 'ڈاکٹر طاہر القادری' },
  { id: 'ur.kanzuliman', name: 'اعلیٰ حضرت احمد رضا خانؒ — کنز الایمان' },
  { id: 'ur.ahmedali',   name: 'مولانا احمد علی' },
  { id: 'ur.najafi',     name: 'محمد حسین نجفی' },
];

// ─── Word-by-Word Languages ──────────────────────────────────────
export const WBW_LANGUAGES = [
  { code: 'ur', name: 'اردو', nameEn: 'Urdu' },
  { code: 'en', name: 'انگریزی', nameEn: 'English' },
  { code: 'id', name: 'انڈونیشی', nameEn: 'Indonesian' },
  { code: 'bn', name: 'بنگالی', nameEn: 'Bengali' },
  { code: 'tr', name: 'ترکی', nameEn: 'Turkish' },
  { code: 'de', name: 'جرمن', nameEn: 'German' },
  { code: 'fr', name: 'فرانسیسی', nameEn: 'French' },
  { code: 'ru', name: 'روسی', nameEn: 'Russian' },
  { code: 'ms', name: 'ملائی', nameEn: 'Malay' },
];

// ─── Tafsir Editions ─────────────────────────────────────────────
export const TAFSIR_EDITIONS: TafsirEdition[] = [
  { id: 'ar.muyassar',   nameAr: 'تفسیر المیسر',          name: 'Tafsir Al-Muyassar',    author: 'مجمع الملک فہد',                  lang: 'ar' },
  { id: 'ar.jalalayn',   nameAr: 'تفسیر الجلالین',        name: 'Tafsir Al-Jalalayn',    author: 'جلال الدین المحلی و السیوطی',    lang: 'ar' },
  { id: 'ar.qurtubi',    nameAr: 'تفسیر القرطبی',         name: 'Tafsir Al-Qurtubi',     author: 'امام ابوعبداللہ القرطبیؒ',       lang: 'ar' },
  { id: 'ar.baghawi',    nameAr: 'تفسیر البغوی',          name: 'Tafsir Al-Baghawi',     author: 'امام البغویؒ',                   lang: 'ar' },
  { id: 'ar.waseet',     nameAr: 'التفسیر الوسیط',        name: 'Al-Wasit (Al-Azhar)',   author: 'الأزھر',                         lang: 'ar' },
  { id: 'ar.miqbas',     nameAr: 'تنویر المقباس',         name: 'Tanwir Al-Miqbas',      author: 'عبداللہ ابن عباسؓ',              lang: 'ar' },
  { id: 'en.maududi',    nameAr: 'تفہیم القرآن (انگریزی)',name: 'Tafheem Al-Quran (EN)', author: 'Sayyid Abul Ala Maududi',         lang: 'en' },
];

// ─── Themes (24 total — 20+ live display variants) ───────────────
export const THEMES: Theme[] = [
  // ── 1. Pearl White — crystal clear pure milky white
  {
    id: 'pearl', name: 'Pearl White ✦ Crystal Clear', nameUr: 'موتی — کرسٹل کلیئر سفید',
    bgClass: 'theme-bg-pearl',
    orb1: 'rgba(180,170,255,0.18)', orb2: 'rgba(100,220,200,0.14)', orb3: 'rgba(255,210,120,0.12)',
    accent: '#7c5cbf', accentLight: 'rgba(124,92,191,0.1)',
    bismillahColor: '#4a3480', bismillahGlow: 'rgba(124,92,191,0.10)',
  },
  // ── 2. Aurora — 24/7 live vibrant dynamic
  {
    id: 'aurora', name: 'Aurora Borealis ⚡ Live', nameUr: 'شفقِ قطبی — لائیو',
    bgClass: 'theme-bg-aurora',
    orb1: 'rgba(150,120,255,0.22)', orb2: 'rgba(80,230,200,0.18)', orb3: 'rgba(255,180,80,0.16)',
    accent: '#5b4bac', accentLight: 'rgba(91,75,172,0.1)',
    bismillahColor: '#3d2f80', bismillahGlow: 'rgba(91,75,172,0.12)',
  },
  // ── 3. Crystal Blue — super bright digital
  {
    id: 'crystal', name: 'Crystal Blue ◆ Bright', nameUr: 'نیلم کرسٹل — سپر برائٹ',
    bgClass: 'theme-bg-crystal',
    orb1: 'rgba(120,180,255,0.22)', orb2: 'rgba(160,140,255,0.18)', orb3: 'rgba(120,230,210,0.16)',
    accent: '#3b6bbf', accentLight: 'rgba(59,107,191,0.1)',
    bismillahColor: '#1a3d80', bismillahGlow: 'rgba(59,107,191,0.12)',
  },
  // ── 4. Golden Sunrise — warm luminous
  {
    id: 'sunrise', name: 'Golden Sunrise ☀ Warm', nameUr: 'طلوع آفتاب — سنہری',
    bgClass: 'theme-bg-sunrise',
    orb1: 'rgba(255,200,80,0.24)', orb2: 'rgba(255,150,80,0.18)', orb3: 'rgba(200,240,160,0.16)',
    accent: '#b5740a', accentLight: 'rgba(181,116,10,0.1)',
    bismillahColor: '#7a4a06', bismillahGlow: 'rgba(181,116,10,0.12)',
  },
  // ── 5. Emerald Garden — luminous glowing
  {
    id: 'emerald', name: 'Emerald Garden ✦ Glow', nameUr: 'زمرد باغ — چمکدار',
    bgClass: 'theme-bg-emerald',
    orb1: 'rgba(80,200,150,0.24)', orb2: 'rgba(120,240,180,0.20)', orb3: 'rgba(160,200,255,0.16)',
    accent: '#0f7a5a', accentLight: 'rgba(15,122,90,0.1)',
    bismillahColor: '#065a3e', bismillahGlow: 'rgba(15,122,90,0.12)',
  },
  // ── 6. Royal Violet — deep vibrant
  {
    id: 'royal', name: 'Royal Violet ♛ Deep', nameUr: 'شاہی بنفشی — گہرا',
    bgClass: 'theme-bg-royal',
    orb1: 'rgba(160,100,255,0.26)', orb2: 'rgba(200,130,255,0.20)', orb3: 'rgba(100,180,255,0.16)',
    accent: '#6b2abf', accentLight: 'rgba(107,42,191,0.1)',
    bismillahColor: '#4a1a8a', bismillahGlow: 'rgba(107,42,191,0.14)',
  },
  // ── 7. Rose Garden — pink vibrant
  {
    id: 'roseGarden', name: 'Rose Garden 🌹 Vivid', nameUr: 'گلشنِ گل — گلابی',
    bgClass: 'theme-bg-rose',
    orb1: 'rgba(255,170,180,0.22)', orb2: 'rgba(255,200,210,0.16)', orb3: 'rgba(255,150,200,0.14)',
    accent: '#be185d', accentLight: 'rgba(190,24,93,0.1)',
    bismillahColor: '#9d174d', bismillahGlow: 'rgba(190,24,93,0.12)',
  },
  // ── 8. Midnight Blue — cool electric
  {
    id: 'midnightBlue', name: 'Midnight Blue ◈ Electric', nameUr: 'رات کا نیلا',
    bgClass: 'theme-bg-midnight',
    orb1: 'rgba(100,150,255,0.18)', orb2: 'rgba(80,200,240,0.14)', orb3: 'rgba(160,100,255,0.12)',
    accent: '#2563eb', accentLight: 'rgba(37,99,235,0.1)',
    bismillahColor: '#1d4ed8', bismillahGlow: 'rgba(37,99,235,0.13)',
  },
  // ── 9. Desert Gold — warm amber
  {
    id: 'desertGold', name: 'Desert Gold ◇ Amber', nameUr: 'صحرائی سونا',
    bgClass: 'theme-bg-desert',
    orb1: 'rgba(255,215,100,0.28)', orb2: 'rgba(255,180,60,0.20)', orb3: 'rgba(255,230,150,0.18)',
    accent: '#92400e', accentLight: 'rgba(146,64,14,0.1)',
    bismillahColor: '#78350f', bismillahGlow: 'rgba(146,64,14,0.13)',
  },
  // ── 10. Sky Azure — pure bright sky
  {
    id: 'skyAzure', name: 'Sky Azure ◯ Pure', nameUr: 'آسمانی نیلا — خالص',
    bgClass: 'theme-bg-sky',
    orb1: 'rgba(150,230,255,0.26)', orb2: 'rgba(100,200,255,0.20)', orb3: 'rgba(200,240,255,0.16)',
    accent: '#0369a1', accentLight: 'rgba(3,105,161,0.1)',
    bismillahColor: '#0c4a6e', bismillahGlow: 'rgba(3,105,161,0.12)',
  },
  // ── 11. Sakura Blossom — soft pink
  {
    id: 'sakura', name: 'Sakura Blossom 🌸 Soft', nameUr: 'چیری بلوسم',
    bgClass: 'theme-bg-sakura',
    orb1: 'rgba(255,182,193,0.28)', orb2: 'rgba(255,218,230,0.22)', orb3: 'rgba(255,160,200,0.18)',
    accent: '#db2777', accentLight: 'rgba(219,39,119,0.1)',
    bismillahColor: '#be185d', bismillahGlow: 'rgba(219,39,119,0.12)',
  },
  // ── 12. Mint Breeze — fresh cool
  {
    id: 'mintBreeze', name: 'Mint Breeze 🍃 Fresh', nameUr: 'پودینہ — ٹھنڈک',
    bgClass: 'theme-bg-mint',
    orb1: 'rgba(110,231,183,0.26)', orb2: 'rgba(167,243,208,0.20)', orb3: 'rgba(200,255,230,0.16)',
    accent: '#065f46', accentLight: 'rgba(6,95,70,0.1)',
    bismillahColor: '#064e3b', bismillahGlow: 'rgba(6,95,70,0.12)',
  },
  // ── 13. Neon Cyber — vibrant neon
  {
    id: 'neonCyber' as any, name: 'Neon Cyber ⚡ Vibrant', nameUr: 'نیون سائبر',
    bgClass: 'theme-bg-neon',
    orb1: 'rgba(0,255,255,0.14)', orb2: 'rgba(128,0,255,0.12)', orb3: 'rgba(0,200,100,0.10)',
    accent: '#06b6d4', accentLight: 'rgba(6,182,212,0.12)',
    bismillahColor: '#0891b2', bismillahGlow: 'rgba(6,182,212,0.15)',
  },
  // ── 14. Lemon Lime — super bright yellow-green
  {
    id: 'lemonLime' as any, name: 'Lemon Lime ◉ Bright', nameUr: 'لیموں — روشن',
    bgClass: 'theme-bg-lemon',
    orb1: 'rgba(200,255,60,0.20)', orb2: 'rgba(120,255,80,0.16)', orb3: 'rgba(255,240,80,0.14)',
    accent: '#65a30d', accentLight: 'rgba(101,163,13,0.1)',
    bismillahColor: '#3f6212', bismillahGlow: 'rgba(101,163,13,0.12)',
  },
  // ── 15. Twilight Purple — semi-transparent
  {
    id: 'twilight' as any, name: 'Twilight Purple ◈ Semi', nameUr: 'شام بنفشی — نیم شفاف',
    bgClass: 'theme-bg-twilight',
    orb1: 'rgba(200,180,255,0.22)', orb2: 'rgba(140,100,255,0.18)', orb3: 'rgba(255,160,220,0.14)',
    accent: '#9333ea', accentLight: 'rgba(147,51,234,0.12)',
    bismillahColor: '#7e22ce', bismillahGlow: 'rgba(147,51,234,0.14)',
  },
  // ── 16. Ocean Deep — deep teal gradient
  {
    id: 'oceanDeep' as any, name: 'Ocean Deep 🌊 Teal', nameUr: 'گہرا سمندر',
    bgClass: 'theme-bg-ocean',
    orb1: 'rgba(20,184,166,0.22)', orb2: 'rgba(56,189,248,0.18)', orb3: 'rgba(99,102,241,0.14)',
    accent: '#0d9488', accentLight: 'rgba(13,148,136,0.12)',
    bismillahColor: '#0f766e', bismillahGlow: 'rgba(13,148,136,0.14)',
  },
  // ── 17. Fire Ember — warm glowing
  {
    id: 'fireEmber' as any, name: 'Fire Ember 🔥 Glow', nameUr: 'آتشی شعلہ',
    bgClass: 'theme-bg-fire',
    orb1: 'rgba(255,100,50,0.20)', orb2: 'rgba(255,160,30,0.16)', orb3: 'rgba(255,80,120,0.12)',
    accent: '#dc2626', accentLight: 'rgba(220,38,38,0.12)',
    bismillahColor: '#b91c1c', bismillahGlow: 'rgba(220,38,38,0.15)',
  },
  // ── 18. Snow White — pure 24/7 bright milky
  {
    id: 'snowWhite' as any, name: 'Snow White ❄ Pure Bright', nameUr: 'برفی سفید — 24/7',
    bgClass: 'theme-bg-snow',
    orb1: 'rgba(200,230,255,0.20)', orb2: 'rgba(180,210,255,0.16)', orb3: 'rgba(220,240,255,0.14)',
    accent: '#3b82f6', accentLight: 'rgba(59,130,246,0.1)',
    bismillahColor: '#1e40af', bismillahGlow: 'rgba(59,130,246,0.12)',
  },
  // ── 19. Jade Forest — emerald live
  {
    id: 'jadeForest' as any, name: 'Jade Forest 🌿 Emerald', nameUr: 'جیڈ جنگل — زمردی',
    bgClass: 'theme-bg-jade',
    orb1: 'rgba(34,197,94,0.22)', orb2: 'rgba(74,222,128,0.18)', orb3: 'rgba(52,211,153,0.14)',
    accent: '#16a34a', accentLight: 'rgba(22,163,74,0.12)',
    bismillahColor: '#15803d', bismillahGlow: 'rgba(22,163,74,0.14)',
  },
  // ── 20. Candy Pop — vibrant multicolor
  {
    id: 'candyPop' as any, name: 'Candy Pop 🍬 Vivid', nameUr: 'کینڈی رنگ — شوخ',
    bgClass: 'theme-bg-candy',
    orb1: 'rgba(251,113,133,0.20)', orb2: 'rgba(167,139,250,0.18)', orb3: 'rgba(56,189,248,0.16)',
    accent: '#ec4899', accentLight: 'rgba(236,72,153,0.12)',
    bismillahColor: '#be185d', bismillahGlow: 'rgba(236,72,153,0.14)',
  },
  // ── 21. Ivory Gold — warm semi-transparent
  {
    id: 'ivoryGold' as any, name: 'Ivory Gold ◈ Warm Semi', nameUr: 'آئیوری سونا — نیم شفاف',
    bgClass: 'theme-bg-ivory',
    orb1: 'rgba(255,235,160,0.26)', orb2: 'rgba(255,200,80,0.20)', orb3: 'rgba(255,220,130,0.16)',
    accent: '#d97706', accentLight: 'rgba(217,119,6,0.12)',
    bismillahColor: '#b45309', bismillahGlow: 'rgba(217,119,6,0.14)',
  },
  // ── 22. Lavender Dream — soft pastel
  {
    id: 'lavenderDream' as any, name: 'Lavender Dream ◇ Pastel', nameUr: 'لیوینڈر خواب',
    bgClass: 'theme-bg-lavender',
    orb1: 'rgba(216,180,254,0.24)', orb2: 'rgba(196,181,253,0.20)', orb3: 'rgba(167,139,250,0.16)',
    accent: '#7c3aed', accentLight: 'rgba(124,58,237,0.12)',
    bismillahColor: '#6d28d9', bismillahGlow: 'rgba(124,58,237,0.14)',
  },
  // ── 23. Forest Dew — dark green digital
  {
    id: 'forestDew' as any, name: 'Forest Dew 🌲 Digital', nameUr: 'جنگل شبنم — ڈیجیٹل',
    bgClass: 'theme-bg-forestdew',
    orb1: 'rgba(6,78,59,0.15)', orb2: 'rgba(5,150,105,0.12)', orb3: 'rgba(52,211,153,0.10)',
    accent: '#059669', accentLight: 'rgba(5,150,105,0.12)',
    bismillahColor: '#065f46', bismillahGlow: 'rgba(5,150,105,0.14)',
  },
  // ── 24. Ice Crystal — brightest white live
  {
    id: 'iceCrystal' as any, name: 'Ice Crystal ❄ Live Bright', nameUr: 'برفانی کرسٹل — 24/7 لائیو',
    bgClass: 'theme-bg-ice',
    orb1: 'rgba(186,230,253,0.30)', orb2: 'rgba(147,197,253,0.24)', orb3: 'rgba(165,243,252,0.20)',
    accent: '#0284c7', accentLight: 'rgba(2,132,199,0.12)',
    bismillahColor: '#075985', bismillahGlow: 'rgba(2,132,199,0.14)',
  },
];

// ─── Multi-Color Ayah Palette ─────────────────────────────────────
export const AYAH_COLOR_PALETTE = [
  { bg: 'rgba(255,107,107,0.08)', text: '#c0392b', border: 'rgba(255,107,107,0.25)', glow: 'rgba(255,107,107,0.12)' },
  { bg: 'rgba(78,205,196,0.08)', text: '#0d7a72', border: 'rgba(78,205,196,0.25)', glow: 'rgba(78,205,196,0.12)' },
  { bg: 'rgba(107,152,255,0.08)', text: '#2c4baf', border: 'rgba(107,152,255,0.25)', glow: 'rgba(107,152,255,0.12)' },
  { bg: 'rgba(255,179,71,0.08)', text: '#a05c00', border: 'rgba(255,179,71,0.25)', glow: 'rgba(255,179,71,0.12)' },
  { bg: 'rgba(150,111,214,0.08)', text: '#5b21b6', border: 'rgba(150,111,214,0.25)', glow: 'rgba(150,111,214,0.12)' },
  { bg: 'rgba(74,222,128,0.08)', text: '#166534', border: 'rgba(74,222,128,0.25)', glow: 'rgba(74,222,128,0.12)' },
  { bg: 'rgba(249,115,22,0.08)', text: '#9a3412', border: 'rgba(249,115,22,0.25)', glow: 'rgba(249,115,22,0.12)' },
  { bg: 'rgba(236,72,153,0.08)', text: '#9d174d', border: 'rgba(236,72,153,0.25)', glow: 'rgba(236,72,153,0.12)' },
  { bg: 'rgba(20,184,166,0.08)', text: '#134e4a', border: 'rgba(20,184,166,0.25)', glow: 'rgba(20,184,166,0.12)' },
  { bg: 'rgba(99,102,241,0.08)', text: '#312e81', border: 'rgba(99,102,241,0.25)', glow: 'rgba(99,102,241,0.12)' },
  { bg: 'rgba(245,158,11,0.08)', text: '#78350f', border: 'rgba(245,158,11,0.25)', glow: 'rgba(245,158,11,0.12)' },
  { bg: 'rgba(16,185,129,0.08)', text: '#064e3b', border: 'rgba(16,185,129,0.25)', glow: 'rgba(16,185,129,0.12)' },
  { bg: 'rgba(6,182,212,0.08)', text: '#0e7490', border: 'rgba(6,182,212,0.25)', glow: 'rgba(6,182,212,0.12)' },
  { bg: 'rgba(168,85,247,0.08)', text: '#6b21a8', border: 'rgba(168,85,247,0.25)', glow: 'rgba(168,85,247,0.12)' },
];

// ─── PDF Quran Sources ────────────────────────────────────────────
export const PDF_SOURCES = [
  { name: 'مصحف (عربی)',                url: 'https://ia600107.us.archive.org/29/items/FEMushaf/p1.pdf',                                        lang: 'ar' },
  { name: 'قرآن اردو ترجمہ (جوناگڑھی)', url: 'https://ia600105.us.archive.org/31/items/QuranWithUrduTranslation_201407/Quran_Junagarhi.pdf', lang: 'ur' },
  { name: 'Quran English (Sahih Intl)',  url: 'https://ia800100.us.archive.org/22/items/QuranTransliteration/Quran_Transliteration.pdf',        lang: 'en' },
  { name: 'تفہیم القرآن (مودودیؒ)',      url: 'https://ia800500.us.archive.org/0/items/TafheemulQuranUrdu/TafheemulQuran_Urdu.pdf',             lang: 'ur' },
];

// ─── JUZ / Para Data ─────────────────────────────────────────────
export const JUZ_LIST: JuzInfo[] = [
  { juz:  1, nameAr: 'الجزء الأول',                 nameUr: 'پہلا پارہ — الم',               startSurah:  1, startAyah: 1,   endSurah:  2, endAyah: 141 },
  { juz:  2, nameAr: 'الجزء الثاني',                nameUr: 'دوسرا پارہ — سیقول',            startSurah:  2, startAyah: 142, endSurah:  2, endAyah: 252 },
  { juz:  3, nameAr: 'الجزء الثالث',                nameUr: 'تیسرا پارہ — تلک الرسل',        startSurah:  2, startAyah: 253, endSurah:  3, endAyah: 92  },
  { juz:  4, nameAr: 'الجزء الرابع',                nameUr: 'چوتھا پارہ — لن تنالوا',        startSurah:  3, startAyah: 93,  endSurah:  4, endAyah: 23  },
  { juz:  5, nameAr: 'الجزء الخامس',                nameUr: 'پانچواں پارہ — والمحصنات',      startSurah:  4, startAyah: 24,  endSurah:  4, endAyah: 147 },
  { juz:  6, nameAr: 'الجزء السادس',                nameUr: 'چھٹا پارہ — لا یحب اللہ',      startSurah:  4, startAyah: 148, endSurah:  5, endAyah: 81  },
  { juz:  7, nameAr: 'الجزء السابع',                nameUr: 'ساتواں پارہ — وإذا سمعوا',      startSurah:  5, startAyah: 82,  endSurah:  6, endAyah: 110 },
  { juz:  8, nameAr: 'الجزء الثامن',                nameUr: 'آٹھواں پارہ — ولو أننا',        startSurah:  6, startAyah: 111, endSurah:  7, endAyah: 87  },
  { juz:  9, nameAr: 'الجزء التاسع',                nameUr: 'نواں پارہ — قال الملأ',          startSurah:  7, startAyah: 88,  endSurah:  8, endAyah: 40  },
  { juz: 10, nameAr: 'الجزء العاشر',                nameUr: 'دسواں پارہ — واعلموا',           startSurah:  8, startAyah: 41,  endSurah:  9, endAyah: 92  },
  { juz: 11, nameAr: 'الجزء الحادي عشر',            nameUr: 'گیارہواں پارہ — یعتذرون',       startSurah:  9, startAyah: 93,  endSurah: 11, endAyah: 5   },
  { juz: 12, nameAr: 'الجزء الثاني عشر',            nameUr: 'بارہواں پارہ — وما من دابۃ',    startSurah: 11, startAyah: 6,   endSurah: 12, endAyah: 52  },
  { juz: 13, nameAr: 'الجزء الثالث عشر',            nameUr: 'تیرہواں پارہ — وما أبری',       startSurah: 12, startAyah: 53,  endSurah: 14, endAyah: 52  },
  { juz: 14, nameAr: 'الجزء الرابع عشر',            nameUr: 'چودہواں پارہ — ربما',            startSurah: 15, startAyah: 1,   endSurah: 16, endAyah: 128 },
  { juz: 15, nameAr: 'الجزء الخامس عشر',            nameUr: 'پندرہواں پارہ — سبحان الذی',    startSurah: 17, startAyah: 1,   endSurah: 18, endAyah: 74  },
  { juz: 16, nameAr: 'الجزء السادس عشر',            nameUr: 'سولہواں پارہ — قال ألم',         startSurah: 18, startAyah: 75,  endSurah: 20, endAyah: 135 },
  { juz: 17, nameAr: 'الجزء السابع عشر',            nameUr: 'سترہواں پارہ — اقترب',           startSurah: 21, startAyah: 1,   endSurah: 22, endAyah: 78  },
  { juz: 18, nameAr: 'الجزء الثامن عشر',            nameUr: 'اٹھارہواں پارہ — قد أفلح',      startSurah: 23, startAyah: 1,   endSurah: 25, endAyah: 20  },
  { juz: 19, nameAr: 'الجزء التاسع عشر',            nameUr: 'انیسواں پارہ — وقال الذین',      startSurah: 25, startAyah: 21,  endSurah: 27, endAyah: 55  },
  { juz: 20, nameAr: 'الجزء العشرون',               nameUr: 'بیسواں پارہ — أمن خلق',          startSurah: 27, startAyah: 56,  endSurah: 29, endAyah: 45  },
  { juz: 21, nameAr: 'الجزء الواحد والعشرون',       nameUr: 'اکیسواں پارہ — اتل ما',          startSurah: 29, startAyah: 46,  endSurah: 33, endAyah: 30  },
  { juz: 22, nameAr: 'الجزء الثاني والعشرون',       nameUr: 'بائیسواں پارہ — ومن یقنت',       startSurah: 33, startAyah: 31,  endSurah: 36, endAyah: 27  },
  { juz: 23, nameAr: 'الجزء الثالث والعشرون',       nameUr: 'تئیسواں پارہ — وما لی',          startSurah: 36, startAyah: 28,  endSurah: 39, endAyah: 31  },
  { juz: 24, nameAr: 'الجزء الرابع والعشرون',       nameUr: 'چوبیسواں پارہ — فمن أظلم',       startSurah: 39, startAyah: 32,  endSurah: 41, endAyah: 46  },
  { juz: 25, nameAr: 'الجزء الخامس والعشرون',       nameUr: 'پچیسواں پارہ — إلیہ یرد',        startSurah: 41, startAyah: 47,  endSurah: 45, endAyah: 37  },
  { juz: 26, nameAr: 'الجزء السادس والعشرون',       nameUr: 'چھبیسواں پارہ — حم',             startSurah: 46, startAyah: 1,   endSurah: 51, endAyah: 30  },
  { juz: 27, nameAr: 'الجزء السابع والعشرون',       nameUr: 'ستائیسواں پارہ — قال فما',        startSurah: 51, startAyah: 31,  endSurah: 57, endAyah: 29  },
  { juz: 28, nameAr: 'الجزء الثامن والعشرون',       nameUr: 'اٹھائیسواں پارہ — قد سمع',       startSurah: 58, startAyah: 1,   endSurah: 66, endAyah: 12  },
  { juz: 29, nameAr: 'الجزء التاسع والعشرون',       nameUr: 'انتیسواں پارہ — تبارک',           startSurah: 67, startAyah: 1,   endSurah: 77, endAyah: 50  },
  { juz: 30, nameAr: 'الجزء الثلاثون',              nameUr: 'تیسواں پارہ — عمّ',               startSurah: 78, startAyah: 1,   endSurah:114, endAyah: 6   },
];

// ─── Surahs ──────────────────────────────────────────────────────
export const SURAHS: SurahMeta[] = [
  {n:1,  a:'ٱلْفَاتِحَة',    e:'Al-Fatihah',        u:'الفاتحہ',      ayahs:7,   type:'Meccan',  juz:1,  hasBismillah:false},
  {n:2,  a:'ٱلْبَقَرَة',     e:'Al-Baqarah',        u:'البقرہ',       ayahs:286, type:'Medinan', juz:1,  hasBismillah:true},
  {n:3,  a:'آلُ عِمْرَان',   e:'Aal-i-Imraan',      u:'آل عمران',     ayahs:200, type:'Medinan', juz:3,  hasBismillah:true},
  {n:4,  a:'ٱلنِّسَاء',      e:'An-Nisaa',          u:'النساء',       ayahs:176, type:'Medinan', juz:4,  hasBismillah:true},
  {n:5,  a:'ٱلْمَائِدَة',    e:'Al-Maaida',         u:'المائدہ',      ayahs:120, type:'Medinan', juz:6,  hasBismillah:true},
  {n:6,  a:'ٱلْأَنْعَام',    e:'Al-Anaam',          u:'الانعام',      ayahs:165, type:'Meccan',  juz:7,  hasBismillah:true},
  {n:7,  a:'ٱلْأَعْرَاف',    e:'Al-Araaf',          u:'الاعراف',      ayahs:206, type:'Meccan',  juz:8,  hasBismillah:true},
  {n:8,  a:'ٱلْأَنفَال',     e:'Al-Anfaal',         u:'الانفال',      ayahs:75,  type:'Medinan', juz:9,  hasBismillah:true},
  {n:9,  a:'ٱلتَّوْبَة',     e:'At-Tawba',          u:'التوبہ',       ayahs:129, type:'Medinan', juz:10, hasBismillah:false},
  {n:10, a:'يُونُس',         e:'Yunus',             u:'یونس',         ayahs:109, type:'Meccan',  juz:11, hasBismillah:true},
  {n:11, a:'هُود',           e:'Hud',               u:'ہود',          ayahs:123, type:'Meccan',  juz:11, hasBismillah:true},
  {n:12, a:'يُوسُف',         e:'Yusuf',             u:'یوسف',         ayahs:111, type:'Meccan',  juz:12, hasBismillah:true},
  {n:13, a:'ٱلرَّعْد',       e:'Ar-Rad',            u:'الرعد',        ayahs:43,  type:'Medinan', juz:13, hasBismillah:true},
  {n:14, a:'إِبْرَاهِيم',    e:'Ibrahim',           u:'ابراہیم',      ayahs:52,  type:'Meccan',  juz:13, hasBismillah:true},
  {n:15, a:'ٱلْحِجْر',       e:'Al-Hijr',           u:'الحجر',        ayahs:99,  type:'Meccan',  juz:14, hasBismillah:true},
  {n:16, a:'ٱلنَّحْل',       e:'An-Nahl',           u:'النحل',        ayahs:128, type:'Meccan',  juz:14, hasBismillah:true},
  {n:17, a:'ٱلْإِسْرَاء',    e:'Al-Israa',          u:'الاسراء',      ayahs:111, type:'Meccan',  juz:15, hasBismillah:true},
  {n:18, a:'ٱلْكَهْف',       e:'Al-Kahf',           u:'الکہف',        ayahs:110, type:'Meccan',  juz:15, hasBismillah:true},
  {n:19, a:'مَرْيَم',        e:'Maryam',            u:'مریم',         ayahs:98,  type:'Meccan',  juz:16, hasBismillah:true},
  {n:20, a:'طه',             e:'Taa-Haa',           u:'طٰہٰ',         ayahs:135, type:'Meccan',  juz:16, hasBismillah:true},
  {n:21, a:'ٱلْأَنبِيَاء',   e:'Al-Anbiyaa',        u:'الانبیاء',     ayahs:112, type:'Meccan',  juz:17, hasBismillah:true},
  {n:22, a:'ٱلْحَجّ',        e:'Al-Hajj',           u:'الحج',         ayahs:78,  type:'Medinan', juz:17, hasBismillah:true},
  {n:23, a:'ٱلْمُؤْمِنُون',  e:'Al-Muminoon',       u:'المومنون',     ayahs:118, type:'Meccan',  juz:18, hasBismillah:true},
  {n:24, a:'ٱلنُّور',        e:'An-Noor',           u:'النور',        ayahs:64,  type:'Medinan', juz:18, hasBismillah:true},
  {n:25, a:'ٱلْفُرْقَان',    e:'Al-Furqaan',        u:'الفرقان',      ayahs:77,  type:'Meccan',  juz:18, hasBismillah:true},
  {n:26, a:'ٱلشُّعَرَاء',    e:'Ash-Shuaraa',       u:'الشعراء',      ayahs:227, type:'Meccan',  juz:19, hasBismillah:true},
  {n:27, a:'ٱلنَّمْل',       e:'An-Naml',           u:'النمل',        ayahs:93,  type:'Meccan',  juz:19, hasBismillah:true},
  {n:28, a:'ٱلْقَصَص',       e:'Al-Qasas',          u:'القصص',        ayahs:88,  type:'Meccan',  juz:20, hasBismillah:true},
  {n:29, a:'ٱلْعَنكَبُوت',   e:'Al-Ankaboot',       u:'العنکبوت',     ayahs:69,  type:'Meccan',  juz:20, hasBismillah:true},
  {n:30, a:'ٱلرُّوم',        e:'Ar-Room',           u:'الروم',        ayahs:60,  type:'Meccan',  juz:21, hasBismillah:true},
  {n:31, a:'لُقْمَان',       e:'Luqman',            u:'لقمان',        ayahs:34,  type:'Meccan',  juz:21, hasBismillah:true},
  {n:32, a:'ٱلسَّجْدَة',     e:'As-Sajda',          u:'السجدہ',       ayahs:30,  type:'Meccan',  juz:21, hasBismillah:true},
  {n:33, a:'ٱلْأَحْزَاب',    e:'Al-Ahzaab',         u:'الاحزاب',      ayahs:73,  type:'Medinan', juz:21, hasBismillah:true},
  {n:34, a:'سَبَإ',          e:'Saba',              u:'سبا',          ayahs:54,  type:'Meccan',  juz:22, hasBismillah:true},
  {n:35, a:'فَاطِر',         e:'Faatir',            u:'فاطر',         ayahs:45,  type:'Meccan',  juz:22, hasBismillah:true},
  {n:36, a:'يس',             e:'Yaseen',            u:'یٰسٓ',         ayahs:83,  type:'Meccan',  juz:22, hasBismillah:true},
  {n:37, a:'ٱلصَّافَّات',    e:'As-Saaffaat',       u:'الصافات',      ayahs:182, type:'Meccan',  juz:23, hasBismillah:true},
  {n:38, a:'ص',              e:'Saad',              u:'صٓ',           ayahs:88,  type:'Meccan',  juz:23, hasBismillah:true},
  {n:39, a:'ٱلزُّمَر',       e:'Az-Zumar',          u:'الزمر',        ayahs:75,  type:'Meccan',  juz:23, hasBismillah:true},
  {n:40, a:'غَافِر',         e:'Al-Ghaafir',        u:'غافر',         ayahs:85,  type:'Meccan',  juz:24, hasBismillah:true},
  {n:41, a:'فُصِّلَت',       e:'Fussilat',          u:'فصلت',         ayahs:54,  type:'Meccan',  juz:24, hasBismillah:true},
  {n:42, a:'ٱلشُّورَىٰ',     e:'Ash-Shura',         u:'الشوریٰ',      ayahs:53,  type:'Meccan',  juz:25, hasBismillah:true},
  {n:43, a:'ٱلزُّخْرُف',     e:'Az-Zukhruf',        u:'الزخرف',       ayahs:89,  type:'Meccan',  juz:25, hasBismillah:true},
  {n:44, a:'ٱلدُّخَان',      e:'Ad-Dukhaan',        u:'الدخان',       ayahs:59,  type:'Meccan',  juz:25, hasBismillah:true},
  {n:45, a:'ٱلْجَاثِيَة',    e:'Al-Jaathiya',       u:'الجاثیہ',      ayahs:37,  type:'Meccan',  juz:25, hasBismillah:true},
  {n:46, a:'ٱلْأَحْقَاف',    e:'Al-Ahqaf',          u:'الاحقاف',      ayahs:35,  type:'Meccan',  juz:26, hasBismillah:true},
  {n:47, a:'مُحَمَّد',       e:'Muhammad',          u:'محمد ﷺ',       ayahs:38,  type:'Medinan', juz:26, hasBismillah:true},
  {n:48, a:'ٱلْفَتْح',       e:'Al-Fath',           u:'الفتح',        ayahs:29,  type:'Medinan', juz:26, hasBismillah:true},
  {n:49, a:'ٱلْحُجُرَات',    e:'Al-Hujuraat',       u:'الحجرات',      ayahs:18,  type:'Medinan', juz:26, hasBismillah:true},
  {n:50, a:'ق',              e:'Qaaf',              u:'قٓ',           ayahs:45,  type:'Meccan',  juz:26, hasBismillah:true},
  {n:51, a:'ٱلذَّارِيَات',   e:'Adh-Dhaariyat',     u:'الذاریات',     ayahs:60,  type:'Meccan',  juz:26, hasBismillah:true},
  {n:52, a:'ٱلطُّور',        e:'At-Tur',            u:'الطور',        ayahs:49,  type:'Meccan',  juz:27, hasBismillah:true},
  {n:53, a:'ٱلنَّجْم',       e:'An-Najm',           u:'النجم',        ayahs:62,  type:'Meccan',  juz:27, hasBismillah:true},
  {n:54, a:'ٱلْقَمَر',       e:'Al-Qamar',          u:'القمر',        ayahs:55,  type:'Meccan',  juz:27, hasBismillah:true},
  {n:55, a:'ٱلرَّحْمَٰن',    e:'Ar-Rahmaan',        u:'الرحمن',       ayahs:78,  type:'Medinan', juz:27, hasBismillah:true},
  {n:56, a:'ٱلْوَاقِعَة',    e:'Al-Waaqia',         u:'الواقعہ',      ayahs:96,  type:'Meccan',  juz:27, hasBismillah:true},
  {n:57, a:'ٱلْحَدِيد',      e:'Al-Hadid',          u:'الحدید',       ayahs:29,  type:'Medinan', juz:27, hasBismillah:true},
  {n:58, a:'ٱلْمُجَادِلَة',  e:'Al-Mujaadila',      u:'المجادلہ',     ayahs:22,  type:'Medinan', juz:28, hasBismillah:true},
  {n:59, a:'ٱلْحَشْر',       e:'Al-Hashr',          u:'الحشر',        ayahs:24,  type:'Medinan', juz:28, hasBismillah:true},
  {n:60, a:'ٱلْمُمْتَحَنَة', e:'Al-Mumtahana',      u:'الممتحنہ',     ayahs:13,  type:'Medinan', juz:28, hasBismillah:true},
  {n:61, a:'ٱلصَّف',         e:'As-Saff',           u:'الصف',         ayahs:14,  type:'Medinan', juz:28, hasBismillah:true},
  {n:62, a:'ٱلْجُمُعَة',     e:'Al-Jumua',          u:'الجمعہ',       ayahs:11,  type:'Medinan', juz:28, hasBismillah:true},
  {n:63, a:'ٱلْمُنَافِقُون', e:'Al-Munaafiqoon',    u:'المنافقون',    ayahs:11,  type:'Medinan', juz:28, hasBismillah:true},
  {n:64, a:'ٱلتَّغَابُن',    e:'At-Taghaabun',      u:'التغابن',      ayahs:18,  type:'Medinan', juz:28, hasBismillah:true},
  {n:65, a:'ٱلطَّلَاق',      e:'At-Talaaq',         u:'الطلاق',       ayahs:12,  type:'Medinan', juz:28, hasBismillah:true},
  {n:66, a:'ٱلتَّحْرِيم',    e:'At-Tahrim',         u:'التحریم',      ayahs:12,  type:'Medinan', juz:28, hasBismillah:true},
  {n:67, a:'ٱلْمُلْك',       e:'Al-Mulk',           u:'الملک',        ayahs:30,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:68, a:'ٱلْقَلَم',       e:'Al-Qalam',          u:'القلم',        ayahs:52,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:69, a:'ٱلْحَاقَّة',     e:'Al-Haaqqa',         u:'الحاقہ',       ayahs:52,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:70, a:'ٱلْمَعَارِج',    e:'Al-Maaarij',        u:'المعارج',      ayahs:44,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:71, a:'نُوح',           e:'Nooh',              u:'نوح',          ayahs:28,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:72, a:'ٱلْجِن',         e:'Al-Jinn',           u:'الجن',         ayahs:28,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:73, a:'ٱلْمُزَّمِّل',   e:'Al-Muzzammil',      u:'المزمل',       ayahs:20,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:74, a:'ٱلْمُدَّثِّر',   e:'Al-Muddaththir',    u:'المدثر',       ayahs:56,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:75, a:'ٱلْقِيَامَة',    e:'Al-Qiyaama',        u:'القیامہ',      ayahs:40,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:76, a:'ٱلْإِنسَان',     e:'Al-Insaan',         u:'الانسان',      ayahs:31,  type:'Medinan', juz:29, hasBismillah:true},
  {n:77, a:'ٱلْمُرْسَلَات',  e:'Al-Mursalaat',      u:'المرسلات',     ayahs:50,  type:'Meccan',  juz:29, hasBismillah:true},
  {n:78, a:'ٱلنَّبَإ',       e:'An-Naba',           u:'النبا',        ayahs:40,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:79, a:'ٱلنَّازِعَات',   e:'An-Naaziaat',       u:'النازعات',     ayahs:46,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:80, a:'عَبَسَ',         e:'Abasa',             u:'عبس',          ayahs:42,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:81, a:'ٱلتَّكْوِير',    e:'At-Takwir',         u:'التکویر',      ayahs:29,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:82, a:'ٱلْإِنفِطَار',   e:'Al-Infitaar',       u:'الانفطار',     ayahs:19,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:83, a:'ٱلْمُطَفِّفِين', e:'Al-Mutaffifin',     u:'المطففین',     ayahs:36,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:84, a:'ٱلْإِنشِقَاق',   e:'Al-Inshiqaaq',      u:'الانشقاق',     ayahs:25,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:85, a:'ٱلْبُرُوج',      e:'Al-Burooj',         u:'البروج',       ayahs:22,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:86, a:'ٱلطَّارِق',      e:'At-Taariq',         u:'الطارق',       ayahs:17,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:87, a:'ٱلْأَعْلَىٰ',    e:'Al-Ala',            u:'الاعلیٰ',      ayahs:19,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:88, a:'ٱلْغَاشِيَة',    e:'Al-Ghaashiya',      u:'الغاشیہ',      ayahs:26,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:89, a:'ٱلْفَجْر',       e:'Al-Fajr',           u:'الفجر',        ayahs:30,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:90, a:'ٱلْبَلَد',       e:'Al-Balad',          u:'البلد',        ayahs:20,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:91, a:'ٱلشَّمْس',       e:'Ash-Shams',         u:'الشمس',        ayahs:15,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:92, a:'ٱللَّيْل',       e:'Al-Lail',           u:'اللیل',        ayahs:21,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:93, a:'ٱلضُّحَىٰ',      e:'Ad-Dhuhaa',         u:'الضحیٰ',       ayahs:11,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:94, a:'ٱلشَّرْح',       e:'Ash-Sharh',         u:'الانشراح',     ayahs:8,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:95, a:'ٱلتِّين',        e:'At-Tin',            u:'التین',        ayahs:8,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:96, a:'ٱلْعَلَق',       e:'Al-Alaq',           u:'العلق',        ayahs:19,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:97, a:'ٱلْقَدْر',       e:'Al-Qadr',           u:'القدر',        ayahs:5,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:98, a:'ٱلْبَيِّنَة',    e:'Al-Bayyina',        u:'البینہ',       ayahs:8,   type:'Medinan', juz:30, hasBismillah:true},
  {n:99, a:'ٱلزَّلْزَلَة',   e:'Az-Zalzala',        u:'الزلزلہ',      ayahs:8,   type:'Medinan', juz:30, hasBismillah:true},
  {n:100,a:'ٱلْعَادِيَات',   e:'Al-Aadiyaat',       u:'العادیات',     ayahs:11,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:101,a:'ٱلْقَارِعَة',    e:'Al-Qaaria',         u:'القارعہ',      ayahs:11,  type:'Meccan',  juz:30, hasBismillah:true},
  {n:102,a:'ٱلتَّكَاثُر',    e:'At-Takaathur',      u:'التکاثر',      ayahs:8,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:103,a:'ٱلْعَصْر',       e:'Al-Asr',            u:'العصر',        ayahs:3,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:104,a:'ٱلْهُمَزَة',     e:'Al-Humaza',         u:'الہمزہ',       ayahs:9,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:105,a:'ٱلْفِيل',        e:'Al-Fil',            u:'الفیل',        ayahs:5,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:106,a:'قُرَيْش',        e:'Quraish',           u:'قریش',         ayahs:4,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:107,a:'ٱلْمَاعُون',     e:"Al-Maaoon",         u:'الماعون',      ayahs:7,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:108,a:'ٱلْكَوْثَر',     e:'Al-Kawthar',        u:'الکوثر',       ayahs:3,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:109,a:'ٱلْكَافِرُون',   e:'Al-Kaafiroon',      u:'الکافرون',     ayahs:6,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:110,a:'ٱلنَّصْر',       e:'An-Nasr',           u:'النصر',        ayahs:3,   type:'Medinan', juz:30, hasBismillah:true},
  {n:111,a:'ٱلْمَسَد',       e:'Al-Masad',          u:'المسد',        ayahs:5,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:112,a:'ٱلْإِخْلَاص',    e:'Al-Ikhlaas',        u:'الاخلاص',      ayahs:4,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:113,a:'ٱلْفَلَق',       e:'Al-Falaq',          u:'الفلق',        ayahs:5,   type:'Meccan',  juz:30, hasBismillah:true},
  {n:114,a:'ٱلنَّاس',        e:'An-Naas',           u:'الناس',        ayahs:6,   type:'Meccan',  juz:30, hasBismillah:true},
];
