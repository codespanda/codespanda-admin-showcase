import { SITE } from "@/lib/constants";

const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Sends an enquiry to SITE.email through Web3Forms. It's posted as FormData (a "simple"
 * cross-origin request), so the browser doesn't need a CORS preflight first. Web3Forms
 * replies to the address in the `email` field when we hit Reply.
 */
export async function sendEnquiry(fields: Record<string, string>): Promise<boolean> {
  const body = new FormData();
  body.append("access_key", SITE.web3formsKey);
  body.append("from_name", "codespanda.com");
  for (const [key, value] of Object.entries(fields)) body.append(key, value);
  const res = await fetch(ENDPOINT, { method: "POST", body, headers: { Accept: "application/json" } });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean | string };
  return res.ok && String(data.success) === "true";
}
