import { SignupForm } from "./SignupForm";
import Link from "next/link";
import styles from "./styles/SignupCard.module.scss";

const SignupCard = () => {
  return (
    <section className={styles.container}>
      <div className={styles.signupCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Get Started</h1>
          <p className={styles.subtitle}>
            Already have an account?{" "}
            <Link href="/" className={styles.signUpLink}>
              Log In
            </Link>
          </p>
        </header>

        <SignupForm />
      </div>
    </section>
  );
};

export { SignupCard };
