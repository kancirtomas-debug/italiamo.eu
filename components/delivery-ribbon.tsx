import type { Locale } from "@/lib/i18n/routing";

export function DeliveryRibbon({ locale }: { locale: Locale }) {
  return (
    <div className="delivery-ribbon">
      <span>
        {locale === "en" ? "Delivery on Tuesday" : "Doručenie v utorok"}
      </span>
      <span className="dot" />
      <b>
        {locale === "en" ? "Free over €60" : "Doprava zdarma nad €60"}
      </b>
    </div>
  );
}
