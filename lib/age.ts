import { cookies } from "next/headers";
import { AGE_COOKIE, isAlcohol } from "./age-cookie";

export { AGE_COOKIE, isAlcohol };

/** Server-side: has the visitor confirmed they are 18+? */
export async function isAdult(): Promise<boolean> {
  const store = await cookies();
  return store.get(AGE_COOKIE)?.value === "1";
}
