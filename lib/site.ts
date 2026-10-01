export const SITE_URL = "https://www.adotelcilikfioregokceada.com";
export const SITE_NAME = "Ad Otelcilik Fiore Gökçeada";

export function getAbsoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
