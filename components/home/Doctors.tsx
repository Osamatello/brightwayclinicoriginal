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
        {/* phones (2026-11-14): the three doctors together in one group, Dr. Hasan in the middle, names under the photos;
            their descriptions follow underneath, so no text is lost. The layout below this is for larger screens. */}
        <div className={styles.group}>
          <ul className={styles.groupPhotos}>
            {[team[0], founder, team[1]].map((doctor) => (
              <li key={doctor.name} className={doctor === founder ? styles.groupFounder : undefined}>
                {doctor.href ? (
                  <Link href={l(doctor.href)} className={styles.groupPortrait} aria-label={`${t("Meet")} ${t(doctor.name)}`}>
                    <Image src={doctor.img} alt={t(doctor.name)} fill unoptimized sizes="40vw" className={styles.photo} />
                  </Link>
                ) : (
                  <div className={styles.groupPortrait}>
                    <Image src={doctor.img} alt={t(doctor.name)} fill unoptimized sizes="30vw" className={styles.photo} />
                  </div>
                )}
                <p className={styles.groupTag}>{t(doctor.tag)}</p>
                <h3 className={styles.groupName}>{doctor.href ? <Link href={l(doctor.href)}>{t(doctor.name)}</Link> : t(doctor.name)}</h3>
              </li>
            ))}
          </ul>
          <dl className={styles.groupRoles}>
            {doctors.map((doctor) => (
              <div key={doctor.name}>
                <dt>{t(doctor.name)}</dt>
                <dd>{t(doctor.role)}</dd>
              </div>
            ))}
          </dl>
          <Link href={l(founder.href!)} className={styles.groupCta}>{t("Meet Dr. Hasan")}{" "}<Arrow /></Link>
        </div>

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
