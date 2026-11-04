import { l, t } from "@/lib/i18n";
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
          <h2 id="doctors-heading" className={styles.heading}>{t("Our Specialized Doctors")}{" "}
            <span>{t("at Bright Way Dental Clinic")}</span>
          </h2>
          <p className={styles.intro}>{t("Discover Our Best Dentists In Dubai")}</p>
        </header>
        <div className={styles.gallery}>
          <article className={styles.founder}>
            <Link href={l(founder.href!)} className={styles.portraitLink} aria-label={`${t("Meet")} ${t(founder.name)}`}>
              <div className={styles.founderPortrait}>
                <Image src={founder.img} alt={t(founder.name)} fill unoptimized className={styles.photo} />
              </div>
              <span className={styles.portraitCta} aria-hidden="true">{t("Meet Dr. Hasan")}{" "}<Arrow /></span>
            </Link>
            <div className={styles.founderInfo}>
              <p className={styles.specialty}>{t(founder.tag)}</p>
              <h3 className={styles.name}><Link href={l(founder.href!)}>{t(founder.name)}</Link></h3>
              <p className={styles.description}>{t(founder.role)}</p>
            </div>
          </article>
          <div className={styles.team}>
            {team.map((doctor) => (
              <article key={doctor.name} className={styles.profile}>
                <div className={styles.teamPortrait}>
                  <Image src={doctor.img} alt={t(doctor.name)} fill unoptimized className={styles.photo} />
                </div>
                <div className={styles.profileInfo}>
                  <p className={styles.specialty}>{t(doctor.tag)}</p>
                  <h3 className={styles.name}>{t(doctor.name)}</h3>
                  <p className={styles.description}>{t(doctor.role)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
