"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { NavItem } from "./NavItem";
import { MenuItem } from "@/common/types";
import { SignOutButton } from "./SignOutButton";
import classNames from "classnames";
import styles from "./styles/MobileNav.module.scss";

interface MobileNavProps {
  items: MenuItem[];
}

const MobileNav = (props: MobileNavProps) => {
  const { items } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNav = () => setIsOpen((prev) => !prev);

  const closeNav = () => setIsOpen(false);

  const iconName = isOpen ? "XLg" : "List";

  return (
    <nav className={styles.nav}>
      <Icon name={iconName} size={35} isBtn onClick={handleNav} />

      <div
        className={classNames(styles.menu, {
          [styles.open]: isOpen,
        })}
      >
        <ul className={styles.navItems} role="menubar">
          {items.map(({ title, href, ariaLabel }) => (
            <NavItem
              key={title}
              title={title}
              href={href}
              ariaLabel={ariaLabel}
              onClick={closeNav}
            />
          ))}
        </ul>

        <SignOutButton />
      </div>
    </nav>
  );
};

export { MobileNav };
