import Link from "next/link";
import { Icon } from "./Icon";
import { NavItem } from "./NavItem";
import styles from "./styles/Nav.module.scss";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants";

interface Item {
  title: string;
  href: string;
  ariaLabel?: string;
}

const items: Item[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    ariaLabel: "Go to your dashboard",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    ariaLabel: "View and edit your profile",
  },
];

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link
        href="/dashboard"
        aria-label="Go to dashboard"
        className={styles.brandLink}
      >
        <Icon name="Robot" size={35} />
      </Link>

      <ul className={styles.navItems} role="menubar">
        {items.map(({ title, href, ariaLabel }) => (
          <NavItem
            key={title}
            title={title}
            href={href}
            ariaLabel={ariaLabel}
          />
        ))}
      </ul>

      <div className={styles.media}>
        <Icon
          name="Github"
          className={styles.icon}
          href={GITHUB_URL}
          title="Github"
          size={25}
        />
        <Icon
          name="Linkedin"
          className={styles.icon}
          href={LINKEDIN_URL}
          title="Linkedin"
          size={25}
        />
      </div>
    </nav>
  );
};

export { Nav };
