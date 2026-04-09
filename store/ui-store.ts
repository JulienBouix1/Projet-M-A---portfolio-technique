"use client";

import { create } from "zustand";

type UIState = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeSection: "architecture",
  setActiveSection: (activeSection) => set({ activeSection })
}));
