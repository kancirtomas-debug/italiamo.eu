"use client";
import { useEffect, useState } from "react";
import { isAdultClient } from "@/lib/age-cookie";

/**
 * Client-side gate for a single alcohol product page. The page stays statically
 * rendered (no server cookies), so we decide on the client: an 18+ visitor sees
 * the product, everyone else sees the gate. Rendered blank until the cookie is
 * read to avoid flashing alcohol content to a minor.
 */
export function AlcoholGate({
  gate,
  children,
}: {
  gate: React.ReactNode;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<"pending" | "allowed" | "blocked">(
    "pending",
  );

  useEffect(() => {
    setState(isAdultClient() ? "allowed" : "blocked");
  }, []);

  if (state === "pending") return null;
  return <>{state === "allowed" ? children : gate}</>;
}
