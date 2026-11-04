import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getById, seoMetadata } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import LeadForm from "@/components/page/LeadForm";
import { nameFields } from "@/content/forms";
import styles from "@/components/career/Career.module.css";

const CAREER_ID = 620;
const CAREER_EMAIL = "info@brightway.clinic";
const OLD_SHARE_IMAGE = "/wp-content/uploads/2024/03/logo-Bright-Way-01.png"; // the old page's og:image

export function generateMetadata(): Metadata {
  const page = getById(CAREER_ID);
  if (!page) return { title: "Career" };
  const seo = seoMetadata(page);
  return { ...seo, openGraph: { ...seo.openGraph, images: [OLD_SHARE_IMAGE] } };
}

const icon = (d: ReactNode) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const TOOTH = "M7.5 3.5c-2.2 0-3.6 2-3 4.6.5 2.2 1 4 1.3 6.3.3 2.6.7 5.600 2 5.600 1.200 0 1.400-2.600 1.800-4.600.3-1.400.8-2 2.400-2s2.100.6 2.400 2c.4 2 .6 4.600 1.800 4.600 1.300 0 1.700-3 2-5.600.3-2.300.8-4.100 1.300-6.300.6-2.600-.8-4.600-3-4.600-1.800 0-2.600 1-4.500 1s-2.700-1-4.500-1Z";

// Text word for word from the old page
const reasons = [
  { title: "Innovative Environment", text: "Work with the latest dental technologies and methodologies.", icon: icon(<><path d={TOOTH} /><path d="M2 9V4.500A2.500 2.500 0 0 1 4.500 2H8M16 2h3.500A2.500 2.500 0 0 1 22 4.500V9" /></>) },
  { title: "Career Development", text: "Benefit from continuous learning opportunities and professional growth.", icon: icon(<><path d="M4 20V14M10 20V10M16 20V6" /><path d="m14 5 3-3 3 3M2 22h20" /></>) },
  { title: "Patient-Centered Care", text: "Join a team that prioritizes the health and satisfaction of our patients.", icon: icon(<><path d={TOOTH} /><path d="M12 12.500s-2.500-1.500-2.500-3.200a1.400 1.400 0 0 1 2.500-.8 1.400 1.400 0 0 1 2.500.8c0 1.700-2.500 3.200-2.500 3.200Z" /></>) },
  { title: "Supportive Community", text: "Be part of a collaborative and supportive team dedicated to excellence in dentistry.", icon: icon(<><circle cx="9" cy="8" r="3.300" /><path d="M2.500 20c.7-3.500 3.200-5.300 6.500-5.300s5.800 1.800 6.500 5.300" /><path d="M16 5a3.300 3.300 0 0 1 0 6.300M18.500 15c1.600.8 2.600 2.500 3 5" /></>) },
];

export default function CareerPage() {
  const email = (
    <a href={`mailto:${CAREER_EMAIL}`} className={styles.email}>
      {CAREER_EMAIL}
    </a>
  );
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Career", path: "/career/" }]} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true" className={styles.chevron}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4.500 2.500 3.500 3.500-3.500 3.500" /></svg>
              </li>
              <li aria-current="page">Career</li>
            </ol>
          </nav>
          <h1 className={styles.heading}>
            Join Our Team <em>at Bright Way Dental Clinic</em>
          </h1>
          <p className={styles.intro}>
            At Bright Way Dental Clinic, we’re always on the lookout for passionate and skilled professionals to join our best leading dental team in Dubai. As a center of dental excellence, we offer a
            dynamic work environment, opportunities for professional growth, and the chance to make a difference in our patients’ lives through top-tier dental care.
          </p>
        </div>
      </section>

      <section id="apply" className={styles.apply}>
        <div className={styles.applyInner}>
          <div>
            <h2 className={styles.title}>How to Apply</h2>
            <p className={styles.lede}>Ready to take the next step in your career with Bright Way Dental Clinic?</p>
            <p className={styles.body}>We would love to hear from you. Please send your application and resume to {email} or utilize the form below to submit your details directly.</p>
            {/* free Pexels 10711075; swap for a real team photo when the clinic sends one */}
            <div className={styles.photo}>
              <Image src="/images/career/team-at-work.webp" alt="Dental team in maroon scrubs working together in a modern dental clinic" fill sizes="(min-width: 900px) 520px, 100vw" className={styles.photoImg} />
            </div>
          </div>
          <LeadForm
            fields={[...nameFields, { name: "position", label: "Position you are applying for", required: true }, { name: "message", label: "Message", textarea: true }]}
            submitLabel="Send"
          />
        </div>
      </section>

      <section className={styles.why}>
        <div className={styles.whyInner}>
          <h2 className={styles.titleCentered}>
            Why <em>Work with Us?</em>
          </h2>
          <ul className={styles.reasons}>
            {reasons.map((r) => (
              <li key={r.title} className={styles.reason}>
                <span className={styles.reasonIcon}>{r.icon}</span>
                <h3 className={styles.reasonTitle}>{r.title}</h3>
                <p className={styles.reasonText}>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.contact}>
        <div className={styles.contactCard}>
          <h3 className={styles.contactTitle}>Contact Us</h3>
          <p className={styles.contactText}>
            Have questions or need more information about our career opportunities? Feel free to reach out to us at {email}. We’re here to provide the information you need to make an informed decision about
            your career.
          </p>
        </div>
      </section>
    </>
  );
}
