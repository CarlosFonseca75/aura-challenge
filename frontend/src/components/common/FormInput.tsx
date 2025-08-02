import { useId, useState, type InputHTMLAttributes as InputAttrs } from "react";
import type {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";
import { Icon } from "./Icon";
import styles from "./styles/FormInput.module.scss";

interface FormInputProps<T extends FieldValues>
  extends InputAttrs<HTMLInputElement> {
  label: string;
  name: Path<T>;
  error?: FieldError;
  valueAsNumber?: boolean;
  register: UseFormRegister<T>;
}

interface PasswordToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

const PasswordToggle = ({ isVisible, onToggle }: PasswordToggleProps) => {
  const iconName = isVisible ? "EyeSlashFill" : "EyeFill";
  const iconTitle = isVisible ? "Hide Password" : "Show Password";

  return (
    <Icon
      name={iconName}
      title={iconTitle}
      aria-label={iconTitle}
      onClick={onToggle}
      className={styles.password}
      isBtn
    />
  );
};

const FormInput = <T extends FieldValues>({
  type = "text",
  label,
  name,
  placeholder,
  error,
  register,
  valueAsNumber,
  ...rest
}: FormInputProps<T>) => {
  const id = useId();
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && isPwdVisible ? "text" : type;

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputContainer}>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={styles.input}
          {...register(name, { valueAsNumber })}
          {...rest}
        />

        {isPassword && (
          <PasswordToggle
            isVisible={isPwdVisible}
            onToggle={() => setIsPwdVisible((prev) => !prev)}
          />
        )}
      </div>

      {error && (
        <span className={styles.error} role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
};

export { FormInput };
