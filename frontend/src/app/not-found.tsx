import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import styles from "@/components/common/styles/NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <Icon name="Robot" size={100} />
      <h1 className={styles.title}>Not Found</h1>
      <p className={styles.subtitle}>Could not find requested resource</p>
      <Link href="/" className={styles.link}>
        Return Home
      </Link>
    </div>
  );
}
