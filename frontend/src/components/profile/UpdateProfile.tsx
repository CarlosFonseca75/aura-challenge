"use client";

import { useState } from "react";
import type { Status, Profile } from "@/common/types";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/common/FormInput";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/common/schemas";
import { updateProfile } from "./services";
import { toast } from "react-toastify";
import styles from "./styles/UpdateProfile.module.scss";

const UpdateProfile = () => {
  const [status, setStatus] = useState<Status>("idle");

  const { data: session, status: sessionStatus } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    resolver: zodResolver(ProfileSchema),
    values: {
      firstName: session?.user.firstName ?? "",
      lastName: session?.user.lastName ?? "",
    },
  });

  // TODO: Add a nice skeleton loader.
  if (sessionStatus === "loading") return <p>Loading...</p>;

  if (!session) return <p>You are not logged in.</p>;

  const onSubmit = async (profile: Profile) => {
    setStatus("loading");

    const res = await updateProfile(profile);

    if (!res.success) {
      toast.error(res.message);
      setStatus("error");
      return;
    }

    toast.info("Profile Updated! 🎉");
    setStatus("success");
  };

  return (
    <section className={styles.profile}>
      <h1>Profile! 🚀</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

        <Button size="md" title="Let's Go!" disabled={status === "loading"}>
          <Icon name="Stars" aria-hidden="true" />
          Update Profile
        </Button>
      </form>
    </section>
  );
};

export { UpdateProfile };
