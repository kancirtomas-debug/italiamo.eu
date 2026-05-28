"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
