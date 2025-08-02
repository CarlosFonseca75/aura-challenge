"use client";

import { useState } from "react";
import type { Status } from "@/common/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { FormInput } from "@/components/common/FormInput";
import { LoginSchema } from "@/common/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./styles/LoginForm.module.scss";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [status, setStatus] = useState<Status>("idle");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "cardfonseca07@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!res?.ok) {
      // TODO: Add alert system.
      console.log("Error", { error: res?.error, status });
      setStatus("error");
      return;
    }

    setStatus("success");

    router.push("/dashboard");
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

      <Button size="md" title="Let's Go!">
        <Icon name="RocketTakeoffFill" aria-hidden="true" />
        Let&apos;s Go!
      </Button>
    </form>
  );
};

export { LoginForm };
