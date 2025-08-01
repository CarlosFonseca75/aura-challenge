"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { FormInput } from "@/components/common/FormInput";
import { SignupSchema } from "@/schemas";
import styles from "./styles/SignupForm.module.scss";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Works!", data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Email:"
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        maxLength={100}
        error={errors.email}
      />

      <FormInput
        label="Password:"
        type="password"
        placeholder="Password"
        name="password"
        register={register}
        maxLength={20}
        error={errors.password}
      />

      <FormInput
        label="Confirm Password:"
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        register={register}
        maxLength={20}
        error={errors.confirmPassword}
      />

      <Button size="md" title="Let's Go!">
        <Icon name="Stars" aria-hidden="true" />
        Join the ride!
      </Button>
    </form>
  );
};

export { SignupForm };
