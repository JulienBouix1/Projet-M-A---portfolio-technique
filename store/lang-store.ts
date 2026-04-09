"use client";
import { create } from "zustand";

type LangState = {
  lang: "en" | "fr";
  toggleLang: () => void;
};

export const useLangStore = create<LangState>((set) => ({
  lang: "fr",
  toggleLang: () => set((s) => ({ lang: s.lang === "en" ? "fr" : "en" }))
}));
