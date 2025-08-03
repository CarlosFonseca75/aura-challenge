"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./styles/NavItem.module.scss";
import classNames from "classnames";

interface NavItemProps {
  title: string;
  href: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const NavItem = (props: NavItemProps) => {
  const { title, href, ariaLabel, onClick } = props;

  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        aria-label={ariaLabel || title}
        onClick={onClick}
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
