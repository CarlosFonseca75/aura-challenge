import { useId } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";
import styles from "./styles/FormInput.module.scss";

interface FormInputProps {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  error?: FieldError;
  valueAsNumber?: boolean;
  register: UseFormRegister<any>;
}

const FormInput = ({
  type,
  label,
  name,
  placeholder,
  register,
  error,
  valueAsNumber,
}: FormInputProps) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <input
        id={id}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />

      {error && (
        <span id={`${id}-error`} className={styles.error}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export { FormInput };
