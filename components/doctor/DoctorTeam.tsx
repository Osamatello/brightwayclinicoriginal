import Image from "next/image";
import styles from "./DoctorTeam.module.css";

// Names, roles and alt text word for word from the old page
const team = [
  {
    name: "Dr. Raghad K. Al-Harbawee",
    role: "Orthodontist and Dentofacial Orthopedic",
    img: "/images/dr-raghad.jpg",
    alt: "Dr. Raghad K. Al-Harbawee - Orthodontist & Dentofacial Orthopedic Specialist at Bright Way Dental Clinic.",
  },
  {
    name: "Dr. Ali M. Mahdy",
    role: "General Dentist specializing in Cosmetic Dentistry and Oral Care and Treatment of Dental and Oral Diseases.",
    img: "/images/dr-ali.jpg",
    alt: "Dr. Ali M. Mahdy - General Dentist & Cosmetic Dentistry Specialist at Bright Way Dental Clinic.",
  },
];

/** The two other doctors, as on the old page: portrait in a gold ring beside the name and role. */
export default function DoctorTeam() {
  return (
    <section className={styles.section}>
      <ul className={styles.team}>
        {team.map((doctor) => (
          <li key={doctor.name} className={styles.card}>
            <div className={styles.ring}>
              <Image src={doctor.img} alt={doctor.alt} fill sizes="168px" className={styles.photo} />
            </div>
            <div>
              <h3 className={styles.name}>{doctor.name}</h3>
              <p className={styles.role}>{doctor.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
