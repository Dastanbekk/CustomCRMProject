"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "..";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie from "js-cookie";
import { ManagersType, UserType } from "@/@types";

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
      cookie.set("user", JSON.stringify(data));
      toast.success("Tizimga kirdingiz");
      router.push("/dashboard");
    },
    onError(err) {
      console.log(err.message);
      toast.error(`Xatolik | ${err.message}`);
    },
  });
};

export const useLogOutMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      return new Promise<void>((resolve) => {
        cookie.remove("jwt");
        cookie.remove("user");
        resolve();
      });
    },
    onSuccess() {
      toast.success("Tizimdan chiqdingiz");
      router.push("login");
    },
    onError(err) {
      toast.error(`Tizimdan chiqishda xatolik ${err.message}`);
    },
  });
};

export const useGetManagersMutation = () => {
  const token = cookie.get("jwt");
  return useMutation({
    mutationKey: ["managers"],
    mutationFn: async () => {
      const res = await request.get("/api/staff/all-managers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res;
      return data.data.data;
    },
    onError: (err: any) => {
      toast.error(`Xatolik: ${err.message}`);
    },
  });
};

export const useGetAdminsMutation = () => {
  return useMutation({
    mutationKey: ["admins"],
    mutationFn: async () => {
      const res = await request.get("/api/staff/all-admins");
      const data = await res;
      return data.data.data;
    },
    onError: (err: any) => {
      toast.error(`Xatolik: ${err.message}`);
    },
  });
};

// const updateAdminsCache = (queryClient, data) => {
//   queryClient.setQueryData(["admins"], (oldData) => {
//     if (!oldData) return [];
//     return oldData.map((value) =>
//       value._id === data._id ? { ...value, ...data } : value
//     );
//   });
// };

export const useEditAdminsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editAdmin"],
    mutationFn: (data: object) => {
      // updateAdminsCache(queryClient, data);
      return request.post("/api/staff/edited-admin", data);
    },
    onSuccess() {
      toast.success("Admin o'zgartirildi");
    },
    onError(err) {
      toast.error(`Xatolik: ${err.message}`);
    },
  });
};

export const useDeleteAdminsMutation = () => {
  return useMutation({
    mutationKey: ["deleteAdmin"],
    mutationFn: (data: ManagersType) => {
      return request({
        url: "/api/staff/deleted-admin",
        data: { _id: data?._id },
        method: "DELETE",
      });
    },
    onSuccess() {
      toast.success("Admin tizimdan chiqarildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err.message}`);
    },
  });
};
