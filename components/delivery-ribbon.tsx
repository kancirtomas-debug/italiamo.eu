import type { Locale } from "@/lib/i18n/routing";

export function DeliveryRibbon({ locale }: { locale: Locale }) {
  return (
    <div className="delivery-ribbon">
      <span>
        {locale === "it" ? "Spedizione il martedì" : "Doručenie v utorok"}
      </span>
      <span className="dot" />
      <b>
        {locale === "it" ? "Gratis sopra €60" : "Doprava zdarma nad €60"}
      </b>
    </div>
  );
}
