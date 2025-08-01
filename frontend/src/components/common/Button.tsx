import type { ReactNode, ButtonHTMLAttributes as BtnAttrs } from "react";
import classNames from "classnames";
import styles from "./styles/Button.module.scss";

interface ButtonProps extends BtnAttrs<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, size = "md", className, ...rest } = props;

  return (
    <button
      className={classNames(
        styles.button,
        styles[`button--${size}`],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button };
