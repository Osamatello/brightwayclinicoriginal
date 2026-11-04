import { insurers } from "@/content/home";
import { clinic } from "@/content/site";

const insurerNames = insurers.map((i) => i.name).join(", ");

// Contact page FAQ, worded around what people search for. Only facts already on the site; client to approve before launch.
export const contactFaqs = [
  {
    q: "How can I book a dental appointment in Dubai at Bright Way Dental Clinic?",
    a: `You can book your dental appointment in Dubai by filling the form on this page, calling ${clinic.phoneDisplay} or ${clinic.landlineDisplay}, or sending us a message on WhatsApp. Our team will contact you as soon as possible.`,
  },
  {
    q: "Where is Bright Way Dental Clinic located in Dubai?",
    a: `Our dental clinic in Dubai is in ${clinic.address}. You can find directions to the clinic on the map on this page.`,
  },
  {
    q: "What are the opening hours of your dental clinic in Al Garhoud?",
    a: `Bright Way Dental Clinic in Al Garhoud is open ${clinic.hours}.`,
  },
  {
    q: "Which dental services do you offer at your clinic in Dubai?",
    a: "We offer dental implants, veneers, cosmetic dentistry, teeth whitening, orthodontics, teeth cleaning and gum treatment, root canal treatment, prosthodontics, oral surgery, tooth extraction and pediatric dentistry in Dubai.",
  },
  {
    q: "Who are the dentists at Bright Way Dental Clinic in Dubai?",
    a: "Our dentists in Dubai are Dr. Hasan A. Mahdy, the clinic's founder, who specializes in cosmetic dentistry, dental implants, oral surgery and prosthetics; Dr. Raghad K. Al-Harbawee, an orthodontist; and Dr. Ali M. Mahdy, a general dentist specializing in cosmetic dentistry and oral care.",
  },
  {
    q: "Are your dentists in Dubai licensed by the DHA?",
    a: "Yes. Our dentists are licensed by the Dubai Health Authority (DHA). Dr. Hasan A. Mahdy is DHA-licensed as a Dental Implant Specialist and General Dentist.",
  },
  {
    q: "Which dental insurance companies do you accept in Dubai?",
    a: `Bright Way Dental Clinic accepts a wide range of insurance companies, including ${insurerNames}. Contact us with your provider and we will confirm your coverage.`,
  },
  {
    q: "Do you have a children's dentist at your clinic in Dubai?",
    a: "Yes. Our pediatric dentistry in Dubai offers friendly, compassionate care for our youngest patients, focusing on preventive measures and dental education.",
  },
];
