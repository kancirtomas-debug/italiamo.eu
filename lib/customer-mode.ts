"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

export type CustomerMode = "b2c" | "b2b" | null;

type State = {
  mode: CustomerMode;
  setMode: (m: CustomerMode) => void;
};

export const useCustomerMode = create<State>()(
  persist(
    (set) => ({
      mode: null,
      setMode: (mode) => set({ mode }),
    }),
    { name: "italiamo-customer-mode" },
  ),
);

/** Companion cookie to the signed httpOnly one - display only. */
export function readB2bCompany(): string | null {
  if (typeof document === "undefined") return null;
  const hit = document.cookie
    .split("; ")
    .find((c) => c.startsWith("italiamo-b2b-name="));
  if (!hit) return null;
  try {
    return decodeURIComponent(hit.split("=").slice(1).join("="));
  } catch {
    return null;
  }
}

/**
 * Effective purchase mode. `b2b` only survives while a verified company
 * session exists - a stale localStorage value is downgraded to `b2c`, so
 * nobody keeps business pricing by flipping a switch in devtools.
 */
export function useVerifiedCustomerMode(): {
  mode: CustomerMode;
  company: string | null;
  mounted: boolean;
} {
  const mode = useCustomerMode((s) => s.mode);
  const setMode = useCustomerMode((s) => s.setMode);
  const [mounted, setMounted] = useState(false);
  const [company, setCompany] = useState<string | null>(null);

  useEffect(() => {
    const name = readB2bCompany();
    setCompany(name);
    setMounted(true);
    if (mode === "b2b" && !name) setMode("b2c");
  }, [mode, setMode]);

  const effective: CustomerMode = mode === "b2b" && !company ? "b2c" : mode;
  return { mode: effective, company, mounted };
}
