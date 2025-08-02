import { LoginForm } from "./LoginForm";
import Link from "next/link";
import styles from "./styles/LoginCard.module.scss";

const LoginCard = () => {
  return (
    <section className={styles.container}>
      <div className={styles.loginCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Get Started</h1>
          <p className={styles.subtitle}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className={styles.signUpLink}>
              Sign Up
            </Link>
          </p>
        </header>

        <LoginForm />
      </div>
    </section>
  );
};

export { LoginCard };
