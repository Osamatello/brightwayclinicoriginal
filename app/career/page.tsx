import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { BreadcrumbSchema, PageHero } from "@/components/page/PageParts";
import LeadForm from "@/components/page/LeadForm";
import { nameFields } from "@/content/forms";
import { Eyebrow, GoldButton, Heading } from "@/components/ui";

const CAREER_ID = 620;
const CAREER_EMAIL = "info@brightway.clinic";

export function generateMetadata(): Metadata {
  const page = getById(CAREER_ID);
  return page ? seoMetadata(page) : { title: "Career" };
}

const reasons = [
  { title: "Innovative Environment", text: "Work with the latest dental technologies and methodologies." },
  { title: "Career Development", text: "Benefit from continuous learning opportunities and professional growth." },
  { title: "Patient-Centered Care", text: "Join a team that prioritizes the health and satisfaction of our patients." },
  { title: "Supportive Community", text: "Be part of a collaborative and supportive team dedicated to excellence in dentistry." },
];

export default function CareerPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Career", path: "/career/" }]} />
      <PageHero
        eyebrow="Careers at Bright Way"
        title="Join Our Leading Dental Team in Dubai"
        intro="At Bright Way Dental Clinic, we're always on the lookout for passionate and skilled professionals to join our best leading dental team in Dubai."
        crumbs={[{ label: "Career" }]}
        image="/images/digital-photo.jpg"
        imageAlt="Dentist working with digital technology at Bright Way"
      >
        <GoldButton href="#apply">Apply now</GoldButton>
      </PageHero>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-5">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <Eyebrow>Why work with us?</Eyebrow>
              <Heading lead="A center of" accent="dental excellence" />
            </div>
            <p className="leading-relaxed">
              As a center of dental excellence, we offer a dynamic work environment, opportunities for professional growth, and the chance to make a difference in our patients&apos; lives through top-tier dental care.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <article key={r.title} className={`relative overflow-hidden rounded-[2rem] p-8 ${i % 2 ? "bg-brown text-white/80" : "bg-white"}`}>
                <span aria-hidden="true" className="bg-gold-gradient absolute inset-x-0 top-0 h-1" />
                <span className={`font-display text-6xl font-semibold leading-none ${i % 2 ? "text-gold-light/50" : "text-gold-soft"}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={`mt-4 text-xl font-extrabold ${i % 2 ? "text-white" : "text-brown-dark"}`}>{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-32 bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-2">
          <div className="space-y-6">
            <Eyebrow>How to apply</Eyebrow>
            <Heading lead="Ready to take" accent="the next step?" />
            <p className="leading-relaxed">
              We would love to hear from you. Please send your application and resume to{" "}
              <a href={`mailto:${CAREER_EMAIL}`} className="font-bold text-gold-dark">{CAREER_EMAIL}</a> or use the form to submit your details directly.
            </p>
            <div className="rounded-[2rem] bg-cream p-8">
              <p className="text-lg font-extrabold text-brown-dark">Have questions about our career opportunities?</p>
              <p className="mt-2 text-sm leading-relaxed">
                Feel free to reach out at <a href={`mailto:${CAREER_EMAIL}`} className="font-bold text-gold-dark">{CAREER_EMAIL}</a>. We&apos;re here to provide the information you need to make an informed decision about your career.
              </p>
            </div>
          </div>
          <LeadForm
            title="Send your application"
            subtitle="Tell us about yourself — attach your CV by email to complete your application."
            fields={[...nameFields, { name: "position", label: "Position you are applying for", required: true }, { name: "message", label: "Short introduction", textarea: true }]}
            submitLabel="Submit application"
          />
        </div>
      </section>
    </>
  );
}
