import { Icon } from "@/components/common/Icon";
import styles from "./styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <span>
        Crafted with{" "}
        <Icon
          name="HeartFill"
          className={styles.heart}
          title="Love"
          size={12}
        />{" "}
        by me!
      </span>
    </footer>
  );
};

export { Footer };
