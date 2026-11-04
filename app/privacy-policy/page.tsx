import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/content/site";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "./Privacy.module.css";

const TITLE = "Privacy Policy | Bright Way Dental Clinic";
const DESCRIPTION = "How Bright Way Dental Clinic in Dubai handles the information you share through this website, including enquiry forms and cookies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/privacy-policy/", images: ["/images/logo.png"] },
};

// Draft for the clinic's approval (see CLINIC_REQUIRED_DOCUMENTS.md). Keep it matching what the site really does.
export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Privacy Policy", path: "/privacy-policy/" }]} />
      <section className={styles.hero}>
        <ScatteredTeeth />
        <div className={styles.heroInner}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>
          <h1 className={styles.heading}>
            Privacy <em>Policy</em>
          </h1>
          <p className={styles.updated}>Last updated: 4 November 2026</p>
        </div>
      </section>

      <section className={styles.body}>
        <article className={styles.article}>
          <p>
            This policy explains how {clinic.name} (“we”) handles information you share through this website. It covers the website only. Your dental treatment records are handled separately by the clinic.
          </p>

          <h2>Information you send us</h2>
          <p>When you fill in a form on this website, we receive the details you enter. Depending on the form, these can include:</p>
          <ul>
            <li>your name, phone number and email address</li>
            <li>your message, and any details about the treatment you are asking about</li>
            <li>for job applications, the position you are applying for</li>
          </ul>
          <p>Please only share what we need to answer you. If you would rather not use a form, you can call or message us instead.</p>

          <h2>How we use it</h2>
          <p>We use these details to reply to your enquiry, arrange your appointment or review your job application.</p>

          <h2>Who handles it</h2>
          <p>We use trusted services to run this website and receive enquiries:</p>
          <ul>
            <li><strong>Telegram</strong>, where website enquiries are delivered to our team</li>
            <li><strong>Vercel</strong>, which hosts this website</li>
            <li><strong>WhatsApp</strong>, if you choose to message us there</li>
            <li><strong>Google Maps</strong>, for the map on our pages, which Google loads directly</li>
            <li><strong>YouTube</strong>, when you press play on one of our videos</li>
            <li><strong>Meta</strong>, for the Meta Pixel</li>
          </ul>
          <p>These services may process information outside the UAE.</p>

          <h2>Cookies</h2>
          <p>
            This website uses the Meta Pixel, which sets cookies and sends Meta information about your visit, such as the pages you view and when a form is sent. This helps us measure and improve our Facebook and Instagram advertising. You can block or delete cookies in your browser settings.
          </p>

          <h2>How long we keep it</h2>
          <p>We keep enquiries only for as long as we need them for the purposes above, or as the law requires.</p>

          <h2>Your choices</h2>
          <p>You can ask us to show you, correct or delete the details you have sent through this website, subject to what the law requires us to keep.</p>

          <h2>Contact us</h2>
          <p>
            {clinic.name}, {clinic.address}
            <br />
            Email: <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
            <br />
            Phone: <a href={`tel:${clinic.phone}`}>{clinic.phoneDisplay}</a>
          </p>

          <h2>Changes to this policy</h2>
          <p>If we change this policy, we will update it on this page and change the date at the top.</p>
        </article>
      </section>
    </>
  );
}
