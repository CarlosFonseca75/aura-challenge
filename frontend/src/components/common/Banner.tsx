import styles from "./styles/Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.banner}>
      🎉 Welcome! This project was built with Next.js, TypeScript, and lots of
      care. It showcases a clean and scalable architecture as part of a
      technical assessment. Thank you for taking the time to review it!
    </div>
  );
};

export { Banner };
