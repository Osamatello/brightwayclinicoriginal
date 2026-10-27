// Homepage content. Text is taken from the current homepage (post 2) so Google keeps reading the same words.
// Items marked [..] are placeholders waiting for the client.

export const homeSeo = {
  title: "Dental Services Clinic in Dubai | Digital Dentistry Near Me",
  description:
    "Bright Way offers advanced digital dentistry and dental services in Dubai. Looking for a dental clinic near you? Book expert care today.",
};

export const services = [
  { title: "Dental Implants", text: "A long-lasting replacement for lost teeth, planned digitally and placed with computer guidance.", img: "/images/services/approved/dental-implants.webp", href: "/dentalimplants-en/" },
  { title: "Teeth Cleaning and Gum Treatment", text: "Maintain optimal oral health with our deep cleaning services that prevent gum disease and enhance overall dental hygiene.", img: "/images/services/approved/teeth-cleaning-portrait.webp", href: "/teeth-cleaning-and-gum-treatment/" },
  { title: "Teeth Whitening", text: "Brighten your smile with our professional whitening treatments, tailored to safely achieve a radiant and lasting shine.", img: "/images/services/approved/teeth-whitening-portrait.webp", href: "/teeth-whitening/" },
  { title: "Tooth Extraction", text: "Expert, gentle removal of problematic teeth to alleviate pain and prevent further dental issues.", img: "/images/services/approved/tooth-extraction.webp", href: "/tooth-extraction/" },
  { title: "Oral Surgery", text: "Specialized procedures, including wisdom tooth removal and corrective surgery, performed with cutting-edge technology.", img: "/images/services/approved/oral-surgery.webp", href: "/oral-surgery/" },
  { title: "Root Canal Treatment", text: "Save and restore infected teeth with our efficient and comfortable root canal therapies.", img: "/images/services/approved/root-canal.webp", href: "/root-canal-treatment/" },
  { title: "Veneers", text: "Transform your smile with custom-made veneers designed to cover imperfections and enhance aesthetics.", img: "/images/services/approved/veneers-porcelain-shells.webp", href: "/veneer-en/" },
  { title: "Cosmetic Dentistry", text: "Comprehensive cosmetic services to improve your smile's appearance, from simple enhancements to complete makeovers.", img: "/images/services/approved/cosmetic-dentistry.webp", href: "/cosmetic-dentistry/" },
  { title: "Pediatric Dentistry", text: "Friendly, compassionate care for our youngest patients, focusing on preventive measures and dental education.", img: "/images/services/approved/pediatric-dentistry.webp", href: "/pediatric-dentistry/" },
  { title: "Orthodontics", text: "Tailored orthodontic solutions, including braces and aligners, to straighten teeth and correct bites.", img: "/images/services/approved/orthodontics-metal-braces.webp", href: "/orthodontics-en/" },
  { title: "Prosthodontics", text: "Expert restoration of teeth with implants, bridges, and dentures, aiming for functional, natural-looking results.", img: "/images/services/approved/prosthodontics.webp", href: "/prosthodontics/" },
];

// Most requested treatments (what the clinic advertises most: implant offer, landing pages, Dr. Hasan's videos) —
// shown first on the homepage and at the top of /services/
export const topServiceHrefs = ["/dentalimplants-en/", "/veneer-en/", "/orthodontics-en/", "/teeth-whitening/"];

export const whyPoints = [
  "Smart and advanced digital dentistry solutions.",
  "Skilled DHA licensed dentists.",
  "Nonsurgical procedures which cause pain less than surgery.",
  "On-the-spot crowns & restorations.",
  "Family-friendly environment.",
  "Convenient Dubai location.",
];

export const doctors = [
  {
    name: "Dr. Hasan A. Mahdy",
    tag: "Founder",
    role: "Specializing in cosmetic dentistry, dental implants, oral surgery, prosthetics, and general comprehensive dental care.",
    img: "/images/dr-hasan.jpg",
    href: "/dr-hasan-a-mahdy/",
  },
  { name: "Dr. Raghad K. Al-Harbawee", tag: "Orthodontist", role: "Orthodontist and Dentofacial Orthopedic.", img: "/images/dr-raghad.jpg" },
  {
    name: "Dr. Ali M. Mahdy",
    tag: "General Dentist",
    role: "General Dentist specializing in Cosmetic Dentistry and Oral Care and Treatment of Dental and Oral Diseases.",
    img: "/images/dr-ali.jpg",
  },
];

// Real Bright Way before/after pairs (from the old site's smile gallery). No treatment names on purpose.
// To add a case: put both photos in /public and add one line (photos are shown whole, never cropped).
export type SmileCase = { before: string; after: string };
export const smileCases: SmileCase[] = [
  { before: "/wp-content/uploads/2024/05/1-1.jpg", after: "/wp-content/uploads/2024/05/1-2.jpg" },
  { before: "/wp-content/uploads/2024/05/444.jpg", after: "/wp-content/uploads/2024/05/44.jpg" },
  { before: "/wp-content/uploads/2024/05/33.jpg", after: "/wp-content/uploads/2024/05/333.jpg" },
  { before: "/wp-content/uploads/2024/05/555.jpg", after: "/wp-content/uploads/2024/05/55.jpg" },
];

export const digitalFeatures = [
  "No Messy Impression: 3D Digital Scanners.",
  "Digital Smile Design",
  "CAD/CAM same-day crowns",
  "Computer-guided implants",
  "Low radiation digital X-rays.",
  "Accurately planned treatment.",
  "AI-assisted treatment planning",
];
export const digitalBenefits = ["Less waiting", "More accuracy", "Fewer visits", "Better results"];

export const careFocus = ["Comfortable treatments", "Transparent pricing", "Clear communication", "Individualized treatment care"];

export const offerPoints = [
  "Offering a long-lasting replacement for lost teeth.",
  "Improving the appearance, functionality, and speech.",
  "Enjoying the benefits of restored chewing and speech.",
];

// Google Business Profile figures, checked on Google Maps 2026-10-27 (4.9 from 157 reviews, 154 of them 5-star) — update when they change.
// Live reviews are pulled from the Google Places API when GOOGLE_PLACES_API_KEY is set (lib/googleReviews.ts); these numbers are the fallback.
export const googleReviews = {
  rating: 4.9,
  count: 157,
  fiveStar: 154,
  url: "https://www.google.com/maps?cid=4456386569709899538",
  topics: ["Dental implants", "Veneers", "Dr. Hasan", "Smile makeover", "Root canals"],
};

// Patient reviews shown as cards (max 6). `source: "google"` = review the patient posted on Google Maps (supplied by Osama, 2026-10-27);
// long reviews are trimmed to complete sentences, with "…" where words were left out. Live Places API reviews (if a key is set) come first.
export type Testimonial = { quote: string; name: string; source: "google" | "clinic"; photo?: string; lang?: "ar" };
export const testimonials: Testimonial[] = [
  {
    quote: "I have been a patient of Dr. Hasan for 11 years, and I can confidently say that he is the best doctor I have ever met in my life. … My veneers are now 11 years old, and I have never had a single issue. No pain, no complications, no corrections…just outstanding, long-lasting work.",
    name: "Mina Doryani",
    source: "google",
    photo: "/images/reviews/mina-doryani.png",
  },
  {
    quote: "أتقدم بجزيل الشكر والتقدير للدكتور حسن على احترافيته وإتقانه في إجراء الزراعة الفورية. بفضل الله، كانت التجربة ناجحة جدًا، وتم الإجراء في الوقت المتوقع تمامًا، دون أي أعراض جانبية أو ألم يُذكر، مما يعكس دقته وخبرته وحرصه على راحة المريض.",
    name: "Rola Dajani",
    source: "google",
    photo: "/images/reviews/rola-dajani.jpg",
    lang: "ar",
  },
  {
    quote: "I visited this clinic for composite dental work and a dental implant, and the experience was excellent. The doctor took time to explain each step of the procedure, which made me feel comfortable and confident. The treatment was smooth, with minimal pain, and the results look very natural.",
    name: "Jonalyn Orbina",
    source: "google",
  },
  { quote: "I highly recommend Bright Way Dental Clinic. I couldn’t be happier with my veneers! Dr. Hassan did an outstanding job from start to finish.", name: "Zeinab Hamad", source: "google" },
  { quote: "I’ve been a patient of Dr. Hasan Mahdy for 16 years now, and my regard for him has only grown with time.", name: "Nassif Nas", source: "google" },
  { quote: "I cannot recommend this dental clinic enough! Before starting my treatment, I was incredibly self-conscious about my smile.", name: "Serap Ayrenk", source: "google" },
  { quote: "Dr. Hasan is not Only a dentist! He is a dentist with artistic touch. His work is perfectly done with real value for what you pay. I highly recommend him for friends and family.", name: "Dania M.", source: "clinic" },
  { quote: "The one and only Dr. Hasan is one of the most experienced dentists in the field, highly recommended for all dental procedures and especially for the brightest ever Hollywood Smile.", name: "Ali D.", source: "clinic" },
];

export const aboutCards = [
  { title: "Why We Care", text: "Providing personalized, top-tier dental care with cutting-edge technology and globally recognized methods. We're dedicated to combating dental diseases and promoting total oral health." },
  { title: "Where We're Heading", text: "As a contemporary dental clinic, we provide a full range of dental services, from advanced diagnostics to comprehensive treatments, all within a luxurious, patient-first environment." },
  { title: "How We Treat You", text: "Focusing on your comfort, with a skilled team committed to crafting aesthetically pleasing, functional prosthetics tailored for each patient." },
]

export const insurers = ["/images/ins-1.png", "/images/ins-2.png", "/images/ins-3.png", "/images/ins-4.png", "/images/ins-5.png", "/images/ins-6.png", "/images/ins-7.png"];

// Drafted from existing site content — client to approve. [..] = waiting for the client.
export const faqs = [
  { q: "What dental services do you offer?", a: "Dental implants, veneers, cosmetic dentistry, teeth whitening, orthodontics (braces and clear aligners), teeth cleaning and gum treatment, root canal treatment, prosthodontics, oral surgery, tooth extraction and pediatric dentistry." },
  { q: "What is digital dentistry and how does it help me?", a: "We use 3D digital scanners instead of messy impressions, Digital Smile Design, CAD/CAM same-day crowns, computer-guided implants and low-radiation digital X-rays — less waiting, more accuracy, fewer visits and better results." },
  { q: "Are your dentists licensed in Dubai?", a: "Yes. Our dentists are licensed by the Dubai Health Authority (DHA). Dr. Hasan A. Mahdy is DHA-licensed as a Dental Implant Specialist and General Dentist." },
  { q: "Do you accept dental insurance?", a: "Yes, we accept a wide range of insurance companies. Contact us with your provider and we will confirm your coverage." },
  { q: "Is there an offer on dental implants?", a: "Yes — save 10% on our dental implants, a long-lasting replacement for lost teeth that restores appearance, chewing and speech." },
  { q: "Do you treat children?", a: "Yes. Our pediatric dentistry offers friendly, compassionate care for our youngest patients, focusing on preventive measures and dental education." },
  { q: "Where are you located and when are you open?", a: "Al Garhoud, Ithraa Tower, Office 802, Dubai — Saturday to Thursday, 11:00 AM to 8:00 PM. Call +971 55 497 1986 or message us on WhatsApp." },
];

// Photos used as Instagram tiles until the live feed is connected
export const instagramTiles = ["/images/digital-photo.jpg", "/images/cta-dr.jpeg", "/images/svc-cosmetic.jpg", "/images/bg-woman.jpg", "/images/svc-whitening.jpg", "/images/bg-clinic.jpg"];

// Dr. Hasan's YouTube channel (latest videos)
export const videos = [
  { id: "1YRcXOqboVk", title: "Immediate dental implants — same-day implant", lang: "Arabic" },
  { id: "fx9X_Nbp-nQ", title: "Digital implants: modern implant dentistry", lang: "Arabic" },
  { id: "M9V3F95SkN8", title: "Zirconia implants — biocompatible and cosmetic", lang: "English" },
  { id: "a-fm5iY0Vac", title: "Veneers or crowns? When each one is right", lang: "Arabic" },
  { id: "JEUB9kPquHQ", title: "How long implants need to bond with the bone", lang: "Arabic" },
  { id: "vN4eQlytJH4", title: "Digital implant planning with 3D X-rays", lang: "Arabic" },
];
