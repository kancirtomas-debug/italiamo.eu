"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export function LeadForm({ locale }: { locale: "sk" | "en" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const t = locale === "en"
    ? {
        name: "Nome e cognome",
        email: "E-mail",
        phone: "Telefono (facoltativo)",
        message: "Messaggio",
        submit: "Invia",
        sending: "Invio in corso…",
        ok: "Grazie. Ti risponderemo a breve.",
        err: "Errore. Riprova o scrivici a info@italiamo.sk.",
      }
    : {
        name: "Meno a priezvisko",
        email: "E-mail",
        phone: "Telefón (nepovinné)",
        message: "Správa",
        submit: "Odoslať",
        sending: "Odosielam…",
        ok: "Ďakujeme. Ozveme sa vám čo najskôr.",
        err: "Chyba. Skúste znova alebo napíšte na info@italiamo.sk.",
      };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      locale,
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? "");
        setStatus("error");
        return;
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="border border-terracotta-500/40 bg-terracotta-50 p-6 text-ink-700">
        <p className="font-display italic text-lg">{t.ok}</p>
      </div>
    );
  }

  const field =
    "mt-2 w-full border border-ink-700/15 bg-cream-50 px-4 py-3 text-sm font-sans text-ink-900 placeholder:text-ink-500 focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 transition";
  const label = "label-meta";

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <label className="block">
        <span className={label}>{t.name}</span>
        <input name="name" required type="text" className={field} />
      </label>
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className={label}>{t.email}</span>
          <input name="email" required type="email" className={field} />
        </label>
        <label className="block">
          <span className={label}>{t.phone}</span>
          <input name="phone" type="tel" className={field} />
        </label>
      </div>
      <label className="block">
        <span className={label}>{t.message}</span>
        <textarea name="message" required rows={5} className={field} />
      </label>

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-orange btn-lg"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
        {status === "error" && (
          <p className="body-sm !text-terracotta-700" role="alert">
            {error || t.err}
          </p>
        )}
      </div>
    </form>
  );
}
