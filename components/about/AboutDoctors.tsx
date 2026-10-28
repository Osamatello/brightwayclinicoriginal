import Image from "next/image";
import Link from "next/link";
import { doctors } from "@/content/home";
import { Arrow } from "@/components/ui";
import styles from "./AboutDoctors.module.css";

/** About page version of the doctors: three equal profiles, each portrait in a gold-edged arch. */
export default function AboutDoctors() {
  return (
    <section id="doctors" aria-labelledby="about-doctors-heading" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="about-doctors-heading" className={styles.heading}>
            Our Specialized Doctors <span>at Bright Way Dental Clinic</span>
          </h2>
          <p className={styles.intro}>Discover Our Best Dentists In Dubai</p>
        </header>

        <ul className={styles.team}>
          {doctors.map((doctor) => (
            <li key={doctor.name} className={styles.card}>
              <div className={styles.arch}>
                <Image src={doctor.img} alt={doctor.name} fill sizes="(min-width: 960px) 340px, (min-width: 600px) 45vw, 80vw" className={styles.photo} />
              </div>
              <div className={styles.info}>
                <p className={styles.tag}>{doctor.tag}</p>
                <h3 className={styles.name}>{doctor.href ? <Link href={doctor.href}>{doctor.name}</Link> : doctor.name}</h3>
                <p className={styles.role}>{doctor.role}</p>
                {doctor.href && (
                  <Link href={doctor.href} className={styles.more}>
                    Meet Dr. Hasan <Arrow />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
