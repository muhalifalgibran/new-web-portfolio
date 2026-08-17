"use client";

import React from "react";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  language: "id" | "en";
  setLanguage: (lang: "id" | "en") => void;
}

export default function LanguageSwitcher({ language, setLanguage }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe size={18} className="text-ink" />
      <div className="flex border-2 border-ink bg-paper shadow-[2px_2px_0px_0px_#1a1a1a]">
        <button
          onClick={() => setLanguage("id")}
          className={`lang-btn ${language === "id" ? "lang-btn-active" : "lang-btn-inactive"}`}
          aria-label="Switch to Indonesian"
        >
          ID
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`lang-btn ${language === "en" ? "lang-btn-active" : "lang-btn-inactive"}`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  );
}
