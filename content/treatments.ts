// Extra explanatory photos inside each treatment article, placed right under the heading whose text starts with `after`.
// Generated with Codex as one set per page; originals in design/treatment-photos/<page>/.
// `afterAr`: the same place in the page's Arabic article.
export type TreatmentFigure = { after: string; afterAr?: string; src: string; alt: string };

// Pages where the old WordPress article images are hidden so only the new photos show (content file left untouched).
export const hideOldImages = new Set(["/dentalimplants-en/", "/veneer-en/", "/orthodontics-en/", "/teeth-whitening/"]);

// Title-area photo when it should differ from the page's Services-card photo
export const heroImages: Record<string, string> = {
  "/dentalimplants-en/": "/images/treatments/dental-implants/hero-implant-model.webp", // free Pexels 5355719
  "/veneer-en/": "/images/treatments/veneers/hero-shade-try.webp", // free Pexels 6627572
};

// The 4 treatments shown under "Explore other dental services" — different on each page
export const moreTreatments: Record<string, string[]> = {
  "/dentalimplants-en/": ["/teeth-cleaning-and-gum-treatment/", "/teeth-whitening/", "/tooth-extraction/", "/oral-surgery/"],
  "/veneer-en/": ["/cosmetic-dentistry/", "/orthodontics-en/", "/dentalimplants-en/", "/prosthodontics/"],
  "/teeth-cleaning-and-gum-treatment/": ["/teeth-whitening/", "/pediatric-dentistry/", "/root-canal-treatment/", "/cosmetic-dentistry/"],
  "/teeth-whitening/": ["/veneer-en/", "/cosmetic-dentistry/", "/teeth-cleaning-and-gum-treatment/", "/orthodontics-en/"],
  "/tooth-extraction/": ["/dentalimplants-en/", "/oral-surgery/", "/prosthodontics/", "/root-canal-treatment/"],
  "/oral-surgery/": ["/dentalimplants-en/", "/tooth-extraction/", "/prosthodontics/", "/teeth-cleaning-and-gum-treatment/"],
  "/root-canal-treatment/": ["/tooth-extraction/", "/prosthodontics/", "/teeth-cleaning-and-gum-treatment/", "/dentalimplants-en/"],
  "/cosmetic-dentistry/": ["/veneer-en/", "/teeth-whitening/", "/orthodontics-en/", "/dentalimplants-en/"],
  "/pediatric-dentistry/": ["/teeth-cleaning-and-gum-treatment/", "/orthodontics-en/", "/teeth-whitening/", "/root-canal-treatment/"],
  "/orthodontics-en/": ["/veneer-en/", "/cosmetic-dentistry/", "/pediatric-dentistry/", "/teeth-whitening/"],
  "/prosthodontics/": ["/dentalimplants-en/", "/veneer-en/", "/tooth-extraction/", "/cosmetic-dentistry/"],
};

export const treatmentFigures: Record<string, TreatmentFigure[]> = {
  "/dentalimplants-en/": [
    { after: "What Are Dental Implants?", afterAr: "ما هي زراعة الأسنان", src: "/images/treatments/dental-implants/implant-in-jaw.webp", alt: "Dental model showing a titanium implant anchored in the jawbone under a ceramic crown" },
    { after: "Advanced Digital Dentistry", afterAr: "زراعة الأسنان في دبي والتقنيات", src: "/images/treatments/dental-implants/digital-planning.webp", alt: "Intraoral 3D scanner beside a jaw model, with the implant position planned on a digital scan" },
    { after: "Dental Implants Treatment in Dubai Our Step-By-Step Process", afterAr: "زراعة الأسنان في يوم واحد", src: "/images/treatments/dental-implants/implant-parts.webp", alt: "Implant screw, abutment and ceramic crown laid out beside an assembled implant model" },
  ],
  "/veneer-en/": [
    { after: "What Are Dental Veneers?", afterAr: "ما هو فينير الأسنان", src: "/images/treatments/veneers/veneer-placing.webp", alt: "Thin porcelain veneer being placed on the front of a tooth on a dental model" },
    { after: "Digital Veneers", afterAr: "هل تعلم ما الفرق", src: "/images/treatments/veneers/composite-vs-porcelain.webp", alt: "Composite veneers and porcelain veneers compared on two dental models" },
    { after: "Our Process For Veneers", afterAr: "كيف يتم إجراء فينير", src: "/images/treatments/veneers/veneer-steps.webp", alt: "Three dental models showing the original teeth, the prepared teeth and the finished veneers" },
  ],
  "/orthodontics-en/": [
    { after: "Why Choose Orthodontics?", afterAr: "لماذا تختار تقويم", src: "/images/treatments/orthodontics/braces-types.webp", alt: "Metal braces, ceramic braces and a clear aligner compared on three dental models" },
    { after: "Why Choose Bright Way Dental Clinic for Orthodontics", afterAr: "كيف يتم علاج التقويم", src: "/images/treatments/orthodontics/aligner-steps.webp", alt: "A series of clear aligners showing step-by-step tooth movement, with the digital scan behind" },
  ],
  "/teeth-whitening/": [
    { after: "Why Choose Professional Teeth Whitening?", afterAr: "ابتسامة هوليود في دبي", src: "/images/treatments/teeth-whitening/shade-change.webp", alt: "Stained and professionally whitened teeth on two dental models with a shade guide between them" },
    { after: "Why is Bright Way Dental Clinic the Best", src: "/images/treatments/teeth-whitening/whitening-kit.webp", alt: "In-clinic LED whitening lamp beside take-home whitening trays and gel syringes" },
  ],
  // the article's original WordPress photo stays at the top (Osama); one new photo further down
  "/cosmetic-dentistry/": [
    { after: "Why Choose Bright Way Dental Clinic for Cosmetic Dentistry?", afterAr: "لماذا تختار عيادة برايت واي لطب الأسنان لطب الأسنان التجميلي", src: "/images/treatments/cosmetic-dentistry/cosmetic-toolkit.webp", alt: "Veneers, whitening gel, bonding syringe and shade guide arranged around a dental model" },
  ],
  // the article's original WordPress photo stays at the top (Osama); one new photo further down
  "/teeth-cleaning-and-gum-treatment/": [
    { after: "Why Choose Bright Way Dental Clinic for Gum Treatment", afterAr: "لماذا تختار عيادة برايت واي لطب الأسنان لعلاج اللثة", src: "/images/treatments/teeth-cleaning/tartar-vs-healthy.webp", alt: "Teeth with tartar and inflamed gums next to clean teeth with healthy gums on dental models" },
  ],
  // the article's original WordPress photo stays at the top (Osama); one new photo further down
  "/root-canal-treatment/": [
    { after: "Advanced Technology for Dental Canal Procedures", afterAr: "تقنيات متقدمة لإجراءات قنوات الأسنان", src: "/images/treatments/root-canal/infected-vs-saved.webp", alt: "Cut-away tooth models comparing an infected tooth with decay and inflamed pulp to a saved tooth with filled root canals and a ceramic crown" },
  ],
  // the article's original WordPress photo stays at the top (Osama); one new photo further down
  "/tooth-extraction/": [
    { after: "3. Extraction with Precision", afterAr: "3. الخلع بدقة", src: "/images/treatments/tooth-extraction/damaged-vs-clean-gap.webp", alt: "Two lower-jaw dental models comparing a badly decayed molar with the clean, healed gap after the tooth is removed" },
  ],
  // the article's original WordPress photo stays at the top (Osama); one new photo further down
  "/oral-surgery/": [
    { after: "Why Choose Bright Way Dental Clinic for Dental Surgery", afterAr: "لماذا تختار عيادة برايت واي لطب الأسنان لجراحة الأسنان", src: "/images/treatments/oral-surgery/surgical-guide.webp", alt: "Lower-jaw dental model with a clear 3D-printed surgical guide over a tooth gap, beside sterile titanium surgical instruments" },
  ],
  // the article's original WordPress photo stays at the top (Osama); one new photo further down
  "/pediatric-dentistry/": [
    { after: "Why Choose Bright Way Dental Clinic as the Best Pediatric Dentist", afterAr: "لماذا تختار عيادة برايت واي لطب الأسنان كأفضل طبيب أسنان أطفال", src: "/images/treatments/pediatric-dentistry/sealant-care-kit.webp", alt: "Child-sized lower-jaw dental model with sealed molars, beside fluoride varnish with an applicator brush and a child's soft toothbrush" },
  ],
  // the article's original WordPress photo stays at the top (Osama); one new photo further down
  "/prosthodontics/": [
    { after: "Why is Bright Way Dental Clinic the Best for Prosthodontics", afterAr: "لماذا تُعد عيادة برايت واي لطب الأسنان الأفضل في خدمات تركيبات الأسنان", src: "/images/treatments/prosthodontics/worn-vs-restored.webp", alt: "Two full-arch dental models comparing worn, chipped and missing teeth with a complete row of restored ceramic teeth" },
  ],
};
