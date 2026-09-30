"use client";
import { AGE_COOKIE } from "@/lib/age-cookie";

export function AgeConfirmButton({ label }: { label: string }) {
  function confirm() {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${AGE_COOKIE}=1; path=/; max-age=${maxAge}; samesite=lax${
      location.protocol === "https:" ? "; secure" : ""
    }`;
    // Full reload so the product renders and the age bubble re-reads the cookie.
    location.reload();
  }
  return (
    <button
      type="button"
      onClick={confirm}
      className="age-btn btn btn-orange justify-center"
    >
      {label}
    </button>
  );
}
