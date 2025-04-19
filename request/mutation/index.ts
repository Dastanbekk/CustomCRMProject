import { useMutation } from "@tanstack/react-query";
import { request } from "..";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: object) =>
      request
        .post("/api/auth/sign-in", {
          ...data,
        })
        .then((res) => res.data.data),
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err.message);
    },
  });
};
