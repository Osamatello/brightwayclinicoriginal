// Short direct answers on the treatment pages + "Sources" lists under treatments and articles
// (approved by Osama 2026-11-12, drafts in design/seo-content-drafts.md). Every link was opened and checked on 2026-11-12.

export type Source = { name: string; url: string };

const S = {
  implants: { name: "ADA MouthHealthy — Implants", url: "https://www.mouthhealthy.org/all-topics-a-z/implants" },
  bridges: { name: "ADA MouthHealthy — Bridges", url: "https://www.mouthhealthy.org/all-topics-a-z/bridges" },
  crowns: { name: "ADA MouthHealthy — Crowns", url: "https://www.mouthhealthy.org/all-topics-a-z/crowns" },
  dentures: { name: "ADA MouthHealthy — Dentures", url: "https://www.mouthhealthy.org/all-topics-a-z/dentures" },
  veneers: { name: "ADA MouthHealthy — Veneers", url: "https://www.mouthhealthy.org/all-topics-a-z/veneers" },
  whitening: { name: "ADA MouthHealthy — Teeth whitening", url: "https://www.mouthhealthy.org/all-topics-a-z/teeth-whitening" },
  rootCanals: { name: "ADA MouthHealthy — Root canals", url: "https://www.mouthhealthy.org/all-topics-a-z/root-canals" },
  braces: { name: "ADA MouthHealthy — Braces", url: "https://www.mouthhealthy.org/all-topics-a-z/braces" },
  gumDisease: { name: "ADA MouthHealthy — Gum disease", url: "https://www.mouthhealthy.org/all-topics-a-z/gum-disease" },
  extractions: { name: "ADA MouthHealthy — Extractions", url: "https://www.mouthhealthy.org/all-topics-a-z/extractions" },
  wisdomTeeth: { name: "ADA MouthHealthy — Wisdom teeth", url: "https://www.mouthhealthy.org/all-topics-a-z/wisdom-teeth" },
  nhsWhitening: { name: "NHS — Teeth whitening", url: "https://www.nhs.uk/tests-and-treatments/teeth-whitening/" },
  nhsRootCanal: { name: "NHS — Root canal treatment", url: "https://www.nhs.uk/conditions/root-canal-treatment/" },
  nhsOrthodontics: { name: "NHS — Orthodontics", url: "https://www.nhs.uk/conditions/orthodontics/" },
  nhsGumDisease: { name: "NHS — Gum disease", url: "https://www.nhs.uk/conditions/gum-disease/" },
  nhsWisdom: { name: "NHS — Wisdom tooth removal", url: "https://www.nhs.uk/conditions/wisdom-tooth-removal/" },
  nhsDentures: { name: "NHS — Dentures", url: "https://www.nhs.uk/conditions/dentures/" },
  nhsChildren: { name: "NHS — Taking care of children's teeth", url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/" },
  nhsDecay: { name: "NHS — Tooth decay", url: "https://www.nhs.uk/conditions/tooth-decay/" },
  nhsTmd: { name: "NHS — Temporomandibular disorder (TMD)", url: "https://www.nhs.uk/conditions/temporomandibular-disorder-tmd/" },
  aapd: { name: "American Academy of Pediatric Dentistry — Parent FAQ", url: "https://www.aapd.org/resources/parent/faq/" },
  who: { name: "World Health Organization — Oral health", url: "https://www.who.int/news-room/fact-sheets/detail/oral-health" },
} satisfies Record<string, Source>;

/** Treatment pages (English address): the direct answer shown under the title, in both languages, and its sources. */
export const treatmentAnswers: Record<string, { en: string; ar: string; sources: Source[] }> = {
  "/dentalimplants-en/": {
    en: "A dental implant is a small titanium post placed in the jawbone to replace the root of a missing tooth. Once it bonds with the bone, it holds a crown, bridge or denture that looks, feels and works like a natural tooth. At Bright Way, implants are planned digitally and placed with computer guidance.",
    ar: "زراعة الأسنان هي دعامة صغيرة من التيتانيوم تُثبَّت في عظم الفك لتعويض جذر السن المفقود. بعد أن تلتحم بالعظم، تحمل تاجًا أو جسرًا أو طقمًا يبدو ويعمل مثل السن الطبيعي. في برايت واي نخطط للزراعة رقميًا ونضعها بتوجيه الكمبيوتر.",
    sources: [S.implants, S.bridges],
  },
  "/veneer-en/": {
    en: "Dental veneers are thin, custom-made shells of porcelain or composite resin bonded to the front of the teeth. They cover chips, stains, small gaps and uneven shapes for a natural-looking, even smile. Porcelain veneers usually last longer and resist stains better than composite.",
    ar: "فينير الأسنان قشور رقيقة مصممة خصيصًا من البورسلين أو الكومبوزيت تُلصق على الواجهة الأمامية للأسنان. يغطي الكسور الصغيرة والتصبغات والفراغات وعدم تناسق الشكل ليمنح ابتسامة متناسقة وطبيعية. عادةً يدوم فينير البورسلين أطول ويقاوم التصبغ أكثر من الكومبوزيت.",
    sources: [S.veneers],
  },
  "/teeth-whitening/": {
    en: "Professional teeth whitening lightens the natural colour of your teeth with a whitening gel applied by a dentist, in the clinic or with custom trays at home. It lifts many stains from coffee, tea and smoking, but it does not change the colour of crowns, veneers or fillings.",
    ar: "تبييض الأسنان الاحترافي يفتّح اللون الطبيعي للأسنان باستخدام جل تبييض يضعه طبيب الأسنان في العيادة أو عبر قوالب مخصصة في المنزل. يزيل كثيرًا من تصبغات القهوة والشاي والتدخين، لكنه لا يغيّر لون التيجان أو الفينير أو الحشوات.",
    sources: [S.nhsWhitening, S.whitening],
  },
  "/root-canal-treatment/": {
    en: "Root canal treatment removes infected or inflamed pulp (the nerve and blood vessels) from inside a tooth, cleans and disinfects the canals, then fills and seals them. It relieves the pain and lets you keep your natural tooth instead of having it taken out. With local anaesthetic it usually feels much like having a filling.",
    ar: "علاج قناة الجذر يزيل اللب الملتهب أو المصاب (العصب والأوعية الدموية) من داخل السن، ثم ينظّف القنوات ويعقّمها ويحشوها ويغلقها. يخفف الألم ويحافظ على سنك الطبيعي بدلًا من خلعه. مع التخدير الموضعي يكون الإحساس عادةً قريبًا من عمل حشوة عادية.",
    sources: [S.nhsRootCanal, S.rootCanals],
  },
  "/orthodontics-en/": {
    en: "Orthodontic treatment straightens teeth and corrects the bite with braces or clear aligners that move the teeth gradually over months. It can fix crowding, gaps, overbites and underbites at any age, and straighter teeth are also easier to keep clean.",
    ar: "تقويم الأسنان يعدّل اصطفاف الأسنان ويصحح العضة باستخدام التقويم المعدني أو التقويم الشفاف الذي يحرّك الأسنان تدريجيًا على مدى أشهر. يعالج التزاحم والفراغات والعضة الأمامية والخلفية في أي عمر، كما أن الأسنان المستقيمة أسهل في التنظيف.",
    sources: [S.nhsOrthodontics, S.braces],
  },
  "/teeth-cleaning-and-gum-treatment/": {
    en: "A professional teeth cleaning (scaling and polishing) removes plaque and hardened tartar that brushing cannot reach. Gum treatment goes deeper, below the gum line, to stop gum disease, which causes bleeding gums and bad breath and, if left untreated, can loosen teeth.",
    ar: "تنظيف الأسنان الاحترافي (إزالة الجير والتلميع) يزيل البلاك والجير المتصلب الذي لا تصل إليه الفرشاة. أما علاج اللثة فيصل إلى ما تحت خط اللثة لإيقاف أمراض اللثة التي تسبب نزيف اللثة ورائحة الفم، وقد تؤدي إلى تخلخل الأسنان إذا لم تُعالج.",
    sources: [S.nhsGumDisease, S.gumDisease],
  },
  "/tooth-extraction/": {
    en: "A tooth extraction is the removal of a tooth that is too damaged, infected or crowded to keep, done under local anaesthetic. Common reasons are severe decay, advanced gum disease and impacted wisdom teeth. Afterwards the gap can be filled with an implant, bridge or denture.",
    ar: "خلع الأسنان هو إزالة السن الذي لا يمكن الحفاظ عليه بسبب التلف الشديد أو الالتهاب أو التزاحم، ويتم تحت التخدير الموضعي. من أكثر أسبابه التسوس الشديد وأمراض اللثة المتقدمة وأضراس العقل المنطمرة. بعد ذلك يمكن تعويض الفراغ بزراعة أو جسر أو طقم.",
    sources: [S.extractions, S.nhsWisdom],
  },
  "/oral-surgery/": {
    en: "Oral surgery covers procedures in the mouth and jaw that go beyond routine dentistry, such as removing impacted wisdom teeth, placing dental implants, bone grafting and minor jaw surgery. Most are done under local anaesthetic in the clinic.",
    ar: "جراحة الفم تشمل الإجراءات داخل الفم والفك التي تتجاوز العلاج الروتيني، مثل خلع أضراس العقل المنطمرة وزراعة الأسنان وترميم العظم والجراحات البسيطة للفك. ويتم معظمها تحت التخدير الموضعي في العيادة.",
    sources: [S.nhsWisdom, S.wisdomTeeth],
  },
  "/cosmetic-dentistry/": {
    en: "Cosmetic dentistry improves how your teeth and smile look. The most common treatments are teeth whitening, veneers, crowns and clear aligners, often combined in a smile makeover that is planned digitally before treatment starts.",
    ar: "طب الأسنان التجميلي يحسّن مظهر الأسنان والابتسامة. أكثر علاجاته شيوعًا تبييض الأسنان والفينير والتيجان والتقويم الشفاف، وغالبًا ما تُجمع في خطة لتجميل الابتسامة يتم تصميمها رقميًا قبل بدء العلاج.",
    sources: [S.veneers, S.whitening, S.crowns],
  },
  "/pediatric-dentistry/": {
    en: "Pediatric dentistry is dental care for babies, children and teenagers. It focuses on prevention (check-ups, fluoride and fissure sealants) and on treating young teeth gently, so children stay free of decay and comfortable at the dentist. A first visit is recommended when the first tooth appears, or by the first birthday.",
    ar: "طب أسنان الأطفال هو العناية بأسنان الرضع والأطفال والمراهقين. يركّز على الوقاية من خلال الفحوصات الدورية والفلورايد وسدّ الشقوق، وعلى علاج الأسنان اللبنية بلطف ليبقى الطفل بعيدًا عن التسوس ومرتاحًا عند طبيب الأسنان. يُنصح بأول زيارة عند ظهور أول سن أو قبل إتمام السنة الأولى.",
    sources: [S.aapd, S.nhsChildren],
  },
  "/prosthodontics/": {
    en: "Prosthodontics is the branch of dentistry that restores and replaces teeth. It includes crowns, bridges, dentures and implant-supported teeth, made to bring back chewing, clear speech and a natural-looking smile.",
    ar: "التعويضات السنية هي فرع طب الأسنان الذي يرمّم الأسنان ويعوّض المفقود منها. تشمل التيجان والجسور وأطقم الأسنان والأسنان المثبتة على الزرعات، وتهدف إلى استعادة المضغ والنطق السليم وابتسامة طبيعية.",
    sources: [S.crowns, S.bridges, S.nhsDentures],
  },
};

/** Articles (English address; the Arabic twin uses the same list). */
export const articleSources: Record<string, Source[]> = {
  "/can-smokers-get-dental-implants-learn-about-the-impact-of-smoking-on-implant-success-rate/": [S.implants, S.who],
  "/dental-implants-and-dentures-which-option-is-right-for-you/": [S.implants, S.nhsDentures, S.dentures],
  "/understanding-the-use-of-porcelain-veneers-to-achieve-a-hollywood-smile/": [S.veneers],
  "/everything-you-need-to-know-about-prosthodontics/": [S.crowns, S.bridges, S.nhsDentures],
  "/how-to-brush-your-toddlers-teeth-the-right-way/": [S.nhsChildren, S.aapd],
  "/how-can-you-tell-if-that-tooth-pain-is-a-cavity/": [S.nhsDecay, S.who],
  "/what-colour-lipstick-makes-your-teeth-look-whiter/": [S.whitening],
  "/why-pediatric-dentistry-is-not-just-regular-dentistry/": [S.aapd, S.nhsChildren],
  "/maintaining-your-dental-implants-tips-for-long-term-success/": [S.implants, S.nhsGumDisease],
  "/advancements-in-endodontics-painless-root-canal-treatments-in-dubai/": [S.nhsRootCanal, S.rootCanals],
  "/advancements-in-ai-driven-diagnostics-transforming-dental-care/": [S.who],
  "/choosing-the-right-pediatric-dentist-in-dubai-what-parents-should-consider/": [S.aapd, S.nhsChildren],
  "/taking-care-clear-aligners-practical-steps/": [S.nhsOrthodontics, S.braces],
  "/best-dental-implant-materials-quality/": [S.implants],
  "/how-digital-smile-design-can-transform-your-smile/": [S.veneers, S.whitening],
  "/3d-printed-dental-implantsrevolutionizing-dental-care/": [S.implants],
  "/discover-the-essentials-of-digital-dental-implants/": [S.implants, S.bridges],
  "/metal-braces-or-clear-aligners-which-is-best-for-your-needs/": [S.nhsOrthodontics, S.braces],
  "/the-difference-between-traditional-metal-braces-and-clear-aligners/": [S.nhsOrthodontics, S.braces],
  "/dental-veneers-the-perfect-solution-for-a-perfect-smile/": [S.veneers],
  "/temporomandibular-joint-tmj-pain-causes-symptoms-and-treatment/": [S.nhsTmd],
  "/digital-dental-implants-everything-you-need-to-know/": [S.implants, S.nhsGumDisease],
};

/** The one article that exists only in Arabic (digital whitening). */
export const arabicOnlySources: Record<string, Source[]> = {
  "/ar/التقنيات-الرقمية-الحديثة-في-تبييض-الأ/": [S.nhsWhitening, S.whitening],
};
