"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.slug === item.slug);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.slug === item.slug
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, quantity: qty }] };
        }),
      remove: (slug) =>
        set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      setQuantity: (slug, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.slug === slug ? { ...i, quantity: qty } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    { name: "italiamo-cart" },
  ),
);
