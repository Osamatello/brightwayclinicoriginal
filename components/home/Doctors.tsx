import Image from "next/image";
import Link from "next/link";
import { doctors } from "@/content/home";
import { Arrow } from "@/components/ui";
import styles from "./Doctors.module.css";

export default function Doctors() {
  const [founder, ...team] = doctors;

  return (
    <section id="doctors" className={styles.section} aria-labelledby="doctors-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="doctors-heading" className={styles.heading}>
            Our Specialized Doctors{" "}
            <span>at Bright Way Dental Clinic</span>
          </h2>
          <p className={styles.intro}>Discover Our Best Dentists In Dubai</p>
        </header>
        <div className={styles.gallery}>
          <article className={styles.founder}>
            <Link href={founder.href!} className={styles.portraitLink} aria-label={"Meet " + founder.name}>
              <div className={styles.founderPortrait}>
                <Image src={founder.img} alt={founder.name} fill sizes="(min-width: 1280px) 544px, (min-width: 760px) 45vw, 100vw" className={styles.photo} />
              </div>
              <span className={styles.portraitCta} aria-hidden="true">Meet Dr. Hasan <Arrow /></span>
            </Link>
            <div className={styles.founderInfo}>
              <p className={styles.specialty}>{founder.tag}</p>
              <h3 className={styles.name}><Link href={founder.href!}>{founder.name}</Link></h3>
              <p className={styles.description}>{founder.role}</p>
            </div>
          </article>
          <div className={styles.team}>
            {team.map((doctor) => (
              <article key={doctor.name} className={styles.profile}>
                <div className={styles.teamPortrait}>
                  <Image src={doctor.img} alt={doctor.name} fill sizes="(min-width: 1280px) 270px, (min-width: 760px) 22vw, (min-width: 540px) 40vw, 100vw" className={styles.photo} />
                </div>
                <div className={styles.profileInfo}>
                  <p className={styles.specialty}>{doctor.tag}</p>
                  <h3 className={styles.name}>{doctor.name}</h3>
                  <p className={styles.description}>{doctor.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
