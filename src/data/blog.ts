export type BlogCategory = 'engineering' | 'religion' | 'social';

export interface BlogPost {
  slug: string;
  title: {
    en: string;
    id: string;
  };
  date: string;
  draft: boolean;
  tags: BlogCategory[];
  readingTime: string;
  excerpt: {
    en: string;
    id: string;
  };
  content: {
    en: string;
    id: string;
  };
  featuredImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'vibe-code-new-programming-language',
    title: {
      en: 'Vibe Code is a New Programming Language',
      id: 'Vibe Code adalah Bahasa Pemrograman Baru'
    },
    date: '2026-08-20',
    draft: false,
    tags: ['engineering'],
    readingTime: '3 min',
    excerpt: {
      en: 'Like it or not, vibe code now is a new programming language that is probably a must in nowadays development workflow.',
      id: 'Suka atau tidak, vibe code kini menjadi bahasa pemrograman baru yang mungkin menjadi keharusan dalam alur kerja pengembangan saat ini.'
    },
    content: {
      en: `# Vibe Code is a New Programming Language

Like it or not, vibe code now is a new programming language that is probably a must in nowadays development workflow.

## What is Vibe Code?

Vibe code refers to the practice of using AI-assisted coding tools to generate, refactor, and understand code. It's not just about autocomplete anymore—it's about having a conversation with your IDE.

## Why It Matters

As developers, we need to adapt to this new paradigm. The tools are getting better every day, and those who embrace them will have a significant advantage.

\`\`\`dart
// Example of vibe coding with Flutter
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      // AI suggests: "Add padding for better UX"
      padding: EdgeInsets.all(16),
      child: Text('Hello, Vibe Code!'),
    );
  }
}
\`\`\`

## The Future

I believe vibe coding will become as fundamental as knowing how to write loops. It's not replacing developers—it's augmenting us.

Happy coding! 🚀`,
      id: `# Vibe Code adalah Bahasa Pemrograman Baru

Suka atau tidak, vibe code kini menjadi bahasa pemrograman baru yang mungkin menjadi keharusan dalam alur kerja pengembangan saat ini.

## Apa itu Vibe Code?

Vibe code mengacu pada praktik menggunakan alat pengkodean berbasis AI untuk menghasilkan, merefaktor, dan memahami kode. Ini bukan lagi hanya tentang autocomplete—ini tentang berbicara dengan IDE Anda.

## Mengapa Ini Penting

Sebagai pengembang, kita perlu beradaptasi dengan paradigma baru ini. Alat-alatnya semakin baik setiap hari, dan mereka yang mengadopsinya akan memiliki keuntungan yang signifikan.

\`\`\`dart
// Contoh vibe coding dengan Flutter
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      // AI menyarankan: "Tambahkan padding untuk UX yang lebih baik"
      padding: EdgeInsets.all(16),
      child: Text('Halo, Vibe Code!'),
    );
  }
}
\`\`\`

## Masa Depan

Saya percaya vibe coding akan menjadi sama fundamentalnya dengan mengetahui cara menulis loop. Ini tidak menggantikan pengembang—ini memperkuat kita.

Selamat coding! 🚀`
    },
    featuredImage: '/blog/pixel-code.png'
  },
  {
    slug: 'flutter-state-management-2026',
    title: {
      en: 'Flutter State Management in 2026',
      id: 'Manajemen State Flutter di 2026'
    },
    date: '2026-07-15',
    draft: false,
    tags: ['engineering'],
    readingTime: '5 min',
    excerpt: {
      en: 'A comprehensive look at the current state of state management in Flutter and what the future holds.',
      id: 'Tinjauan komprehensif tentang kondisi terkini manajemen state di Flutter dan apa yang akan datang.'
    },
    content: {
      en: `# Flutter State Management in 2026

After almost 5 years working with Flutter, I've seen state management solutions evolve dramatically. Let's talk about where we are in 2026.

## The Landscape

- **Riverpod** - Still the king for complex apps
- **BLoC** - Enterprise favorite
- **GetX** - Quick prototyping
- **Signals** - The new kid on the block

## My Recommendation

For production apps, I still recommend Riverpod. The compile-time safety and testing capabilities are unmatched.

\`\`\`dart
@riverpod
class Counter extends _$Counter {
  @override
  int build() => 0;
  
  void increment() => state++;
}
\`\`\`

## What's Next?

The community is moving towards more declarative patterns. Watch this space!`,
      id: `# Manajemen State Flutter di 2026

Setelah hampir 5 tahun bekerja dengan Flutter, saya telah melihat solusi manajemen state berkembang secara dramatis. Mari kita bicarakan tentang di mana kita berada di tahun 2026.

## Lanskap

- **Riverpod** - Masih raja untuk aplikasi kompleks
- **BLoC** - Favorit perusahaan
- **GetX** - Prototyping cepat
- **Signals** - Pendatang baru

## Rekomendasi Saya

Untuk aplikasi produksi, saya masih merekomendasikan Riverpod. Keamanan compile-time dan kemampuan pengujiannya tak tertandingi.

\`\`\`dart
@riverpod
class Counter extends _$Counter {
  @override
  int build() => 0;
  
  void increment() => state++;
}
\`\`\`

## Apa Selanjutnya?

Komunitas bergerak menuju pola yang lebih deklaratif. Pantau ruang ini!`
    },
    featuredImage: '/blog/pixel-flutter.png'
  },
  {
    slug: 'faith-and-code',
    title: {
      en: 'Faith and Code: Finding Balance',
      id: 'Iman dan Kode: Menemukan Keseimbangan'
    },
    date: '2026-06-10',
    draft: false,
    tags: ['religion'],
    readingTime: '4 min',
    excerpt: {
      en: 'How my faith shapes my approach to software engineering and life.',
      id: 'Bagaimana iman saya membentuk pendekatan saya terhadap rekayasa perangkat lunak dan kehidupan.'
    },
    content: {
      en: `# Faith and Code: Finding Balance

As a Muslim software engineer, I often reflect on how my faith influences my work. This is a personal journey of finding balance.

## The Five Daily Prayers

My daily rituals include:
- Fajr (Dawn prayer)
- Dhuhr (Noon prayer)
- Asr (Afternoon prayer)
- Maghrib (Sunset prayer)
- Isha (Night prayer)

These moments of pause help me reset and approach problems with a fresh mind.

## Ethics in Code

Islam teaches us to be honest and beneficial. I apply this by:
- Writing clean, maintainable code
- Not cutting corners
- Helping junior developers
- Building products that benefit society

## The Grind

> "Indeed, Allah will not change the condition of a people until they change what is in themselves." - Quran 13:11

This verse motivates me to keep learning, keep grinding LeetCode, and keep improving.

May we all find our balance. 🤲`,
      id: `# Iman dan Kode: Menemukan Keseimbangan

Sebagai seorang engineer software Muslim, saya sering merenungkan bagaimana iman saya mempengaruhi pekerjaan saya. Ini adalah perjalanan pribadi menemukan keseimbangan.

## Lima Waktu Sholat

Ritual harian saya meliputi:
- Sholat Fajr (Subuh)
- Sholat Dhuhr (Dzuhur)
- Sholat Asr (Ashar)
- Sholat Maghrib (Maghrib)
- Sholat Isha (Isya)

Momen-momen jeda ini membantu saya mereset dan mendekati masalah dengan pikiran segar.

## Etika dalam Kode

Islam mengajarkan kita untuk jujur dan bermanfaat. Saya menerapkan ini dengan:
- Menulis kode yang bersih dan dapat dipelihara
- Tidak memotong sudut
- Membantu developer junior
- Membangun produk yang bermanfaat bagi masyarakat

## Kerja Keras

> "Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah keadaan yang ada pada diri mereka sendiri." - Quran 13:11

Ayat ini memotivasi saya untuk terus belajar, terus mengerjakan LeetCode, dan terus berkembang.

Semoga kita semua menemukan keseimbangan kita. 🤲`
    },
    featuredImage: '/blog/pixel-mosque.png'
  },
  {
    slug: 'crypto-exchange-lessons',
    title: {
      en: 'Lessons from Working at a Crypto Exchange',
      id: 'Pelajaran dari Bekerja di Bursa Crypto'
    },
    date: '2026-05-22',
    draft: false,
    tags: ['engineering', 'social'],
    readingTime: '6 min',
    excerpt: {
      en: 'What I learned building fintech apps for millions of users in Indonesia.',
      id: 'Apa yang saya pelajari membangun aplikasi fintech untuk jutaan pengguna di Indonesia.'
    },
    content: {
      en: `# Lessons from Working at a Crypto Exchange

Working at a crypto exchange in Indonesia has been an incredible journey. Here are some lessons I've learned along the way.

## Performance is Everything

When you're dealing with financial transactions, every millisecond counts. Users expect instant feedback.

\`\`\`dart
// Optimize your builds
@override
Widget build(BuildContext context) {
  return const RepaintBoundary(
    child: PriceTicker(),
  );
}
\`\`\`

## Security First

- Never log sensitive data
- Use secure storage for tokens
- Implement proper certificate pinning
- Regular security audits

## User Experience

Financial apps need to build trust. Clear error messages, loading states, and confirmation dialogs are crucial.

## The Indonesian Market

Indonesia has unique challenges:
- Variable network conditions
- Multiple payment methods
- Diverse user demographics
- Regulatory compliance

Building for this market has made me a better engineer.

## #SafePalestine 🇵🇸 🍉`,
      id: `# Pelajaran dari Bekerja di Bursa Crypto

Bekerja di bursa crypto di Indonesia telah menjadi perjalanan yang luar biasa. Berikut adalah beberapa pelajaran yang saya pelajari di sepanjang jalan.

## Performa adalah Segalanya

Ketika Anda berurusan dengan transaksi keuangan, setiap milidetik penting. Pengguna mengharapkan umpan balik instan.

\`\`\`dart
// Optimalkan build Anda
@override
Widget build(BuildContext context) {
  return const RepaintBoundary(
    child: PriceTicker(),
  );
}
\`\`\`

## Keamanan Pertama

- Jangan pernah mencatat data sensitif
- Gunakan penyimpanan aman untuk token
- Implementasikan certificate pinning yang tepat
- Audit keamanan secara teratur

## Pengalaman Pengguna

Aplikasi keuangan perlu membangun kepercayaan. Pesan error yang jelas, state loading, dan dialog konfirmasi sangat penting.

## Pasar Indonesia

Indonesia memiliki tantangan unik:
- Kondisi jaringan yang bervariasi
- Beberapa metode pembayaran
- Demografi pengguna yang beragam
- Kepatuhan regulasi

Membangun untuk pasar ini telah membuat saya menjadi engineer yang lebih baik.

## #SafePalestine 🇵🇸 🍉`
    },
    featuredImage: '/blog/pixel-crypto.png'
  },
  {
    slug: 'learning-go-as-flutter-dev',
    title: {
      en: 'Learning Go as a Flutter Developer',
      id: 'Belajar Go sebagai Developer Flutter'
    },
    date: '2026-04-08',
    draft: true,
    tags: ['engineering'],
    readingTime: '4 min',
    excerpt: {
      en: 'My journey learning Go programming language and how it complements Flutter development.',
      id: 'Perjalanan saya mempelajari bahasa pemrograman Go dan bagaimana hal melengkapi pengembangan Flutter.'
    },
    content: {
      en: `# Learning Go as a Flutter Developer

*This post is still a draft - coming soon!*

I've been exploring Go (Golang) to expand my backend skills. Here's what I've learned so far...`,
      id: `# Belajar Go sebagai Developer Flutter

*Posting ini masih draft - segera hadir!*

Saya telah mengeksplorasi Go (Golang) untuk memperluas keterampilan backend saya. Berikut adalah yang telah saya pelajari sejauh ini...`
    },
    featuredImage: '/blog/pixel-go.png'
  }
];

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(post => !post.draft);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.includes(category) && !post.draft
  );
}

export const categoryLabels: Record<BlogCategory, { en: string; id: string }> = {
  engineering: { en: 'Engineering', id: 'Teknik' },
  religion: { en: 'Religion', id: 'Agama' },
  social: { en: 'Social', id: 'Sosial' }
};
