"use client";

export function flyToCart(_imageSrc: string, _fromEl: HTMLElement | null) {
  if (typeof window === "undefined") return;
  pulseCart();
}

function pulseCart() {
  const target = document.querySelector<HTMLElement>("[data-cart-target]");
  if (!target) return;
  target.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.18)" },
      { transform: "scale(0.95)" },
      { transform: "scale(1)" },
    ],
    { duration: 480, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  );
  window.dispatchEvent(new CustomEvent("italiamo:cart-added"));
}
