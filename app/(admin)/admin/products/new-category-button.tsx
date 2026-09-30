"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "../actions";

export function NewCategoryButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sk, setSk] = useState("");
  const [it, setIt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function close() {
    setOpen(false);
    setSk("");
    setIt("");
    setError(null);
  }

  function submit() {
    setError(null);
    startTransition(async () => {
      const res = await createCategory({ sk, it: it || undefined });
      if (res.error) {
        setError(res.error);
        return;
      }
      close();
      router.refresh();
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 h-11 px-5 border border-ink-900/20 text-ink-900 rounded-md font-mono text-xs uppercase tracking-[0.15em] shadow-sm transition-all duration-200 ease-out hover:bg-terracotta-700 hover:text-cream-50 hover:border-terracotta-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta-700/20 active:translate-y-0 active:scale-[0.98] active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/40 focus-visible:ring-offset-2"
      >
        <span className="inline-block transition-transform duration-300 ease-out group-hover:rotate-90">
          +
        </span>
        <span>Nová kategória</span>
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-80 border border-cream-300 bg-cream-50 rounded-lg shadow-xl p-4 space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-ink-500">
            Nová kategória
          </p>
          <label className="block">
            <span className="text-xs text-ink-500">Názov (SK) *</span>
            <input
              autoFocus
              value={sk}
              onChange={(e) => setSk(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="napr. Sirupy"
              className="mt-1 w-full px-3 py-2 border border-ink-700/15 rounded-md"
            />
          </label>
          <label className="block">
            <span className="text-xs text-ink-500">Názov (EN) — voliteľné</span>
            <input
              value={it}
              onChange={(e) => setIt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="napr. Syrups"
              className="mt-1 w-full px-3 py-2 border border-ink-700/15 rounded-md"
            />
          </label>
          {error && <p className="text-sm text-terracotta-700">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={close}
              className="h-9 px-3 text-sm rounded-md border border-ink-700/20 hover:bg-cream-100"
            >
              Zrušiť
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={pending || !sk.trim()}
              className="h-9 px-4 text-sm rounded-md bg-ink-900 text-cream-50 hover:bg-terracotta-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {pending ? "Ukladám…" : "Pridať"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
