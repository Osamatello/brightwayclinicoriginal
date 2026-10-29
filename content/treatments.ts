// Extra explanatory photos inside each treatment article, placed right under the heading whose text starts with `after`.
// Generated with Codex as one set per page; originals in design/treatment-photos/<page>/.
export type TreatmentFigure = { after: string; src: string; alt: string };

// Pages where the old WordPress article images are hidden so only the new photos show (content file left untouched).
export const hideOldImages = new Set(["/dentalimplants-en/"]);

// Title-area photo when it should differ from the page's Services-card photo
export const heroImages: Record<string, string> = {
  "/dentalimplants-en/": "/images/treatments/dental-implants/hero-implant-model.webp", // free Pexels 5355719
};

export const treatmentFigures: Record<string, TreatmentFigure[]> = {
  "/dentalimplants-en/": [
    { after: "What Are Dental Implants?", src: "/images/treatments/dental-implants/implant-in-jaw.webp", alt: "Dental model showing a titanium implant anchored in the jawbone under a ceramic crown" },
    { after: "Advanced Digital Dentistry", src: "/images/treatments/dental-implants/digital-planning.webp", alt: "Intraoral 3D scanner beside a jaw model, with the implant position planned on a digital scan" },
    { after: "Dental Implants Treatment in Dubai Our Step-By-Step Process", src: "/images/treatments/dental-implants/implant-parts.webp", alt: "Implant screw, abutment and ceramic crown laid out beside an assembled implant model" },
  ],
};
