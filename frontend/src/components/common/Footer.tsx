import { Icon } from "@/components/common/Icon";
import { LINKEDIN_URL, GITHUB_URL } from "@/constants";
import styles from "./styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      Made with love!
      <div className={styles.icons}>
        <Icon
          name="Github"
          className={styles.icon}
          href={LINKEDIN_URL}
          title="Github"
        />
        <Icon
          name="Linkedin"
          className={styles.icon}
          href={GITHUB_URL}
          title="Linkedin"
        />
      </div>
    </footer>
  );
};

export { Footer };
