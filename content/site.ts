import { services } from "./home";

// Clinic facts shared by every page. Source: current brightway.clinic contact page + LocalBusiness schema.
export const clinic = {
  name: "Bright Way Dental Clinic",
  url: "https://brightway.clinic",
  phone: "+971554971986",
  phoneDisplay: "+971 55 497 1986",
  landline: "+97142699947",
  landlineDisplay: "+971 4 269 9947",
  email: "d.hasan.m@hotmail.com",
  address: "Al Garhoud, Ithraa Tower, Office 802, Dubai",
  hours: "Saturday – Thursday, 11:00 AM – 8:00 PM",
  whatsapp: "https://wa.me/971554971986",
  geo: { lat: 25.244243, lng: 55.339719 },
  mapEmbed:
    "https://www.google.com/maps?q=Bright%20way%20dental%20clinic%2C%20Ithraa%20Tower%2C%20Garhoud%2C%20Dubai&z=16&output=embed",
  social: {
    facebook: "http://www.facebook.com/brightwaydentalclinic",
    instagram: "https://www.instagram.com/dr.hasanmahdy/",
    youtube: "https://www.youtube.com/@dr.hasanmahdy2999",
  },
};

/** The Services drop-down on large screens: the 11 treatments in 5 groups (Osama, 2026-11-14, after the Lux Dental reference). */
export const serviceGroups: { label: string; hrefs: string[] }[] = [
  { label: "General dentistry", hrefs: ["/teeth-cleaning-and-gum-treatment/", "/root-canal-treatment/", "/pediatric-dentistry/"] },
  { label: "Cosmetic dentistry", hrefs: ["/veneer-en/", "/teeth-whitening/", "/cosmetic-dentistry/"] },
  { label: "Implants and prosthodontics", hrefs: ["/dentalimplants-en/", "/prosthodontics/"] },
  { label: "Orthodontics", hrefs: ["/orthodontics-en/"] },
  { label: "Oral surgery", hrefs: ["/oral-surgery/", "/tooth-extraction/"] },
];

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about/",
    children: [
      { label: "Dr. Hasan A. Mahdy", href: "/dr-hasan-a-mahdy/" },
      { label: "Career", href: "/career/" },
    ],
  },
  { label: "Services", href: "/services/", children: services.map((s) => ({ label: s.title, href: s.href })) },
  { label: "Blog", href: "/blog/" },
  { label: "Smile Gallery", href: "/smile-gallery/" },
  { label: "Contact us", href: "/contact-us/" },
];
