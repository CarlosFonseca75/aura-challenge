"use client";

import { useState } from "react";
import type { Status, SignupUser } from "@/common/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { FormInput } from "@/components/common/FormInput";
import { SignupSchema } from "@/common/schemas";
import { toast } from "react-toastify";
import { signup } from "./services";
import { useRouter } from "next/navigation";
import styles from "./styles/SignupForm.module.scss";

const SignupForm = () => {
  const [status, setStatus] = useState<Status>("idle");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupUser>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "cardfonseca07@gmail.com",
      firstName: "Carlos Antonio",
      lastName: "Díaz Fonseca",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  const onSubmit = async (user: SignupUser) => {
    setStatus("loading");

    const res = await signup(user);

    if (!res.success) {
      toast.error(res.message);
      setStatus("error");
      return;
    }

    toast.info("Signed up! Please log in 🎉");
    setStatus("success");
    router.push("/");
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
        label="First Name:"
        type="text"
        placeholder="First Name"
        name="firstName"
        register={register}
        maxLength={100}
        error={errors.firstName}
      />

      <FormInput
        label="Last Name:"
        type="text"
        placeholder="Last Name"
        name="lastName"
        register={register}
        maxLength={100}
        error={errors.lastName}
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

      <Button size="md" title="Let's Go!" disabled={status === "loading"}>
        <Icon name="Stars" aria-hidden="true" />
        Join the ride!
      </Button>
    </form>
  );
};

export { SignupForm };
