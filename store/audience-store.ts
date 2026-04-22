"use client";
import { create } from "zustand";

// Two reader personas:
//   "banker"   — M&A professional evaluating the POC against real deal execution
//   "operator" — Chief of Staff / Product / Program Management lens:
//                how the project was scoped, built, and delivered by a 2-person team
export type Audience = "banker" | "operator";

type AudienceState = {
  audience: Audience;
  setAudience: (a: Audience) => void;
  toggleAudience: () => void;
};

export const useAudienceStore = create<AudienceState>((set) => ({
  audience: "banker",
  setAudience: (audience) => set({ audience }),
  toggleAudience: () =>
    set((s) => ({ audience: s.audience === "banker" ? "operator" : "banker" })),
}));
