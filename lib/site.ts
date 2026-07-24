export const SITE_URL = "https://www.fioreotelgokceada.com";

export function getAbsoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
