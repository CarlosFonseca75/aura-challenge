import * as Icons from "react-bootstrap-icons";
import Link from "next/link";

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  className?: string;
  href?: string;
  title?: string;
}

const Icon = (props: IconProps) => {
  const { name, size = 20, className, href, title } = props;

  const BootstrapIcon = Icons[name];

  if (!BootstrapIcon) {
    console.warn(`⚠️ Icon "${name}" does not exist react-bootstrap-icons.`);
  }

  const iconElement = <BootstrapIcon size={size} className={className} />;

  if (!href) return iconElement;

  return (
    <Link href={href} title={title} target="_blank" rel="noopener noreferrer">
      {iconElement}
    </Link>
  );
};

export { Icon };
