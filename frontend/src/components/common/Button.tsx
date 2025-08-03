import type { ReactNode, ButtonHTMLAttributes as BtnAttrs } from "react";
import classNames from "classnames";
import styles from "./styles/Button.module.scss";

interface ButtonProps extends BtnAttrs<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  isLoading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    size = "md",
    className,
    isLoading,
    disabled,
    ...rest
  } = props;

  return (
    <button
      className={classNames(
        {
          [styles.button]: true,
          [styles[`button--${size}`]]: true,
          [styles["button--blocked"]]: isLoading || disabled,
        },
        className
      )}
      {...rest}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export { Button };
