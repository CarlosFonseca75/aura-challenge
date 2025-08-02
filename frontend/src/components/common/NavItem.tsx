"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./styles/NavItem.module.scss";
import classNames from "classnames";

interface NavProps {
  title: string;
  href: string;
  ariaLabel?: string;
}

const NavItem = (props: NavProps) => {
  const { title, href, ariaLabel } = props;

  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        aria-label={ariaLabel || title}
        className={classNames(styles.navLink, {
          [styles.active]: pathname === href,
        })}
      >
        {title}
      </Link>
    </li>
  );
};

export { NavItem };
