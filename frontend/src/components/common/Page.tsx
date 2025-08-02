import classNames from "classnames";
import styles from "./styles/Page.module.scss";

interface PageProps {
  children: React.ReactNode;
  isPublic?: boolean;
}

const Page = ({ children, isPublic = false }: PageProps) => {
  return (
    <main className={classNames({ [styles.main]: !isPublic })}>{children}</main>
  );
};

export { Page };
