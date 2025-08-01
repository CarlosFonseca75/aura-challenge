import * as Icons from "react-bootstrap-icons";
import Link from "next/link";
import styles from "./styles/Icon.module.scss";
import classNames from "classnames";

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  className?: string;
  href?: string;
  title?: string;
  isBtn?: boolean;
  onClick?: () => void;
}

const Icon = (props: IconProps) => {
  const {
    name,
    size = 20,
    className,
    href,
    title,
    isBtn = false,
    onClick,
  } = props;

  const BootstrapIcon = Icons[name];

  if (!BootstrapIcon) {
    console.warn(`⚠️ Icon "${name}" does not exist in react-bootstrap-icons.`);
    return null;
  }

  const ariaLabel = title || name;

  const classes = classNames(styles.icon, className);

  if (isBtn) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        title={title}
        className={classes}
      >
        <BootstrapIcon size={size} />
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        title={title}
        aria-label={ariaLabel}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BootstrapIcon size={size} />
      </Link>
    );
  }

  return <BootstrapIcon size={size} className={classes} />;
};

export { Icon };
