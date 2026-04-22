"use client";
import { create } from "zustand";

export type Audience = "banker" | "engineer";

type AudienceState = {
  audience: Audience;
  setAudience: (a: Audience) => void;
  toggleAudience: () => void;
};

export const useAudienceStore = create<AudienceState>((set) => ({
  audience: "banker",
  setAudience: (audience) => set({ audience }),
  toggleAudience: () =>
    set((s) => ({ audience: s.audience === "banker" ? "engineer" : "banker" })),
}));
