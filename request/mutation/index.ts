"use client";
import { useMutation } from "@tanstack/react-query";
import { request } from "..";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie from "js-cookie";

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: object) =>
      request
        .post("/api/auth/sign-in", {
          ...data,
        })
        .then((res) => res.data.data),
    onSuccess(data) {
      cookie.set("jwt", data.token);
      toast.success("Tizimga kirdingiz");
      router.push("/dashboard");
    },
    onError(err) {
      console.log(err.message);
      toast.error(`Xatolik | ${err.message}`);
    },
  });
};
