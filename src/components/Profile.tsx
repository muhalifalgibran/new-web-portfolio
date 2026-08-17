"use client";

import React from "react";
import { Github, Linkedin, Twitter, MapPin, Award, Code2, Heart } from "lucide-react";

interface ProfileProps {
  language?: "id" | "en";
}

export default function Profile({ language = "id" }: ProfileProps) {
  const content = {
    id: {
      name: "Muh Alif Al Gibran Arif",
      title: "Flutter Engineer",
      bio: "Hi, saya Muh Alif Al Gibran, seorang Flutter Engineer yang passionate dengan pengalaman hampir 5 tahun. Saat ini saya bekerja di sebuah perusahaan crypto exchange di Indonesia dan pernah berkontribusi di proyek internasional.\n\nSaya menjalani hari dengan penuh semangat: berdoa, bekerja, belajar, dan grinding LeetCode. Di luar coding, saya gemar bermain sepakbola dan lari.",
      location: "Makassar, Indonesia",
      skillsLabel: "Keahlian",
      awardsLabel: "Sertifikasi & Penghargaan",
      connectLabel: "Terhubung",
      skills: ["Flutter", "Dart", "Python", "Go", "JavaScript", "Firebase"],
      awards: [
        { name: "Kotlin Android Developer Expert", year: "2019", org: "Dicoding Indonesia" },
        { name: "AWS Hackathon Finalist", year: "", org: "Top 5 Apps" },
      ],
      socials: {
        github: { label: "GitHub", url: "https://github.com/muhalifalgibran" },
        linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/muh-alif-al-gibran-64a60112a/" },
        twitter: { label: "X / Twitter", url: "https://x.com/khalif0898" },
      },
      hashtags: "#SafePalestine 🇵🇸 🍉",
    },
    en: {
      name: "Muh Alif Al Gibran Arif",
      title: "Flutter Engineer",
      bio: "Hi, I'm Muh Alif Al Gibran, a passionate Flutter Engineer with almost 5 years of experience. Currently working at a crypto exchange company in Indonesia, I've also contributed to international projects.\n\nMy days are fueled by faith, innovation, and perseverance—praying, working, learning, and grinding LeetCode. When not coding, you'll find me playing football or running.",
      location: "Makassar, Indonesia",
      skillsLabel: "Skills",
      awardsLabel: "Certifications & Awards",
      connectLabel: "Connect",
      skills: ["Flutter", "Dart", "Python", "Go", "JavaScript", "Firebase"],
      awards: [
        { name: "Kotlin Android Developer Expert", year: "2019", org: "Dicoding Indonesia" },
        { name: "AWS Hackathon Finalist", year: "", org: "Top 5 Apps" },
      ],
      socials: {
        github: { label: "GitHub", url: "https://github.com/muhalifalgibran" },
        linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/muh-alif-al-gibran-64a60112a/" },
        twitter: { label: "X / Twitter", url: "https://x.com/khalif0898" },
      },
      hashtags: "#SafePalestine 🇵🇸 🍉",
    },
  };

  const d = content[language];

  return (
    <section className="w-full">
      {/* Main Profile Card */}
      <div className="card-brutal-hover p-8 sm:p-10">
        {/* Header with Photo - Centered */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Pixel Art Avatar Placeholder */}
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-paper-dark border-3 border-ink flex items-center justify-center overflow-hidden">
              <span className="font-pixel text-5xl sm:text-6xl text-ink">GA</span>
            </div>
            {/* Pixel decoration */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-accent border-2 border-ink" />
          </div>

          <div className="text-center">
            <h1 className="font-pixel text-3xl sm:text-4xl text-ink leading-none mb-2">
              {d.name}
            </h1>
            <p className="text-lg text-ink-light font-medium mb-2">{d.title}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-ink-light">
              <MapPin size={16} />
              <span>{d.location}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <p className="text-ink whitespace-pre-line leading-relaxed text-center">{d.bio}</p>
        </div>

        {/* Hashtag */}
        <div className="flex items-center justify-center gap-2 mb-8 text-sm font-pixel">
          <Heart size={14} className="text-accent fill-accent" />
          <span className="text-ink-light">{d.hashtags}</span>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 size={18} className="text-ink" />
            <h2 className="font-bold text-ink">{d.skillsLabel}</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {d.skills.map((skill) => (
              <span
                key={skill}
                className="badge-category bg-paper-dark text-ink border-2 border-ink px-3 py-1 text-xs font-bold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award size={18} className="text-ink" />
            <h2 className="font-bold text-ink">{d.awardsLabel}</h2>
          </div>
          <ul className="space-y-3">
            {d.awards.map((award) => (
              <li
                key={award.name}
                className="flex items-start gap-2 text-sm text-ink-light justify-center"
              >
                <span className="w-2 h-2 bg-accent mt-2 flex-shrink-0" />
                <span className="text-center">
                  <span className="font-medium text-ink">{award.name}</span>
                  {award.year && (
                    <span className="text-ink-light">, {award.year}</span>
                  )}
                  <span className="text-ink-light"> — {award.org}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="font-bold text-ink mb-4 text-center">{d.connectLabel}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={d.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal-sm flex items-center gap-2"
            >
              <Github size={16} />
              <span>{d.socials.github.label}</span>
            </a>
            <a
              href={d.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal-sm flex items-center gap-2"
            >
              <Linkedin size={16} />
              <span>{d.socials.linkedin.label}</span>
            </a>
            <a
              href={d.socials.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal-sm flex items-center gap-2"
            >
              <Twitter size={16} />
              <span>{d.socials.twitter.label}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Email Card */}
      <div className="mt-6 card-brutal p-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="text-sm text-ink-light">Email:</span>
        <a
          href="mailto:muhalifalgibran@gmail.com"
          className="font-medium text-ink hover:underline"
        >
          muhalifalgibran@gmail.com
        </a>
      </div>
    </section>
  );
}
