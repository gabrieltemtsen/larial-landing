export const site = {
  name: "LARIAL LTD",
  legalName: "LARIAL LTD",
  tagline: "Verified CAC Merchant — Company registration for Nigerians worldwide.",
  description:
    "LARIAL LTD is a verified CAC merchant helping Nigerians worldwide register CAC businesses and companies — fast, guided, and reliable — with an onsite office in Kaduna State.",
  address:
    "Malha Plaza opp Carwash Kamazou, Yakowa Express Way, Kaduna, Nigeria.",
  hours: "Mon–Fri, 9:00 AM – 5:00 PM",
  whatsappE164: "+2348094791288",
  email: "larialltd@gmail.com",
} as const;

export function whatsappLink(message?: string) {
  const phone = site.whatsappE164.replace(/\+/g, "");
  const text = encodeURIComponent(
    message ??
      "Hi LARIAL LTD — I want to register a business/company with CAC. Please guide me."
  );
  return `https://wa.me/${phone}?text=${text}`;
}
