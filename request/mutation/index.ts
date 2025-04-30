"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "..";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie from "js-cookie";
import { ManagersType, NewUserType, UserType } from "@/@types";
import Cookies from "js-cookie";

// Tizimga kirish uchun mutation
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
      toast.error(`Xatolik | ${err.message}`);
    },
  });
};

// Tizimdan chiqish uchun mutation
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

// Managerlarni backendan  olish uchun mutation
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

// Adminlarni backendan  olish uchun mutation
export const useGetAdminsMutation = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await request.get("/api/staff/all-admins");
      return res.data.data;
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

// Adminni ozgartirish uchun mutation
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

// Adminni o'chirish uchun mutation
export const useDeleteAdminsMutation = () => {
  const { refetch: adminRefetch } = useGetAdminsMutation();

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
      adminRefetch();
    },
    onError(err) {
      toast.error(`Xatolik ${err.message}`);
    },
  });
};

// Admin qo'shish uchun mutation
export const useAddAdminMutation = () => {
  return useMutation({
    mutationKey: ["add-admin"],
    mutationFn: (data: object) => request.post("/api/staff/create-admin", data),
    onSuccess() {
      toast.success("Admin qo'shildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err.message}`);
    },
  });
};

// Profile Img ozgartirish uchun mutation
export const useUploadImgMutation = () => {
  return useMutation({
    mutationKey: ["upload-img"],
    mutationFn: (data: FormData) =>
      request.post("/api/auth/edit-profile-img", data),
    onSuccess(data) {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const user = JSON.parse(userCookie);
        const updatedUser = { ...user, image: data?.data?.data?.image };
        Cookies.set("user", JSON.stringify(updatedUser));
      }
      toast.success("Rasm yuklandi");
    },
    onError(err) {
      toast.error(`Xatolik: ${err.message}`);
    },
  });
};

// Profile infoni ozgartirish uchun mutation
export const useUpdateUserProfile = () => {
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: (data: object) => request.post("/api/auth/edit-profile", data),
    onSuccess(data) {
      toast.success("Ma'lumotlaringiz o'zgartirildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err.message}`);
    },
  });
};

// Sababli qilish  uchun mutation
export const useAdminStaffMutation = () => {
  return useMutation({
    mutationKey: ["admin-staff"],
    mutationFn: (data: object) => request.post("/api/staff/leave-staff", data),
    onSuccess() {
      toast.success("Sabab qo'shildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err.message}`);
    },
  });
};

// Parolni ozgartirish uchun mutation
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (data: object) => request.post("/api/auth/edit-password", data),
    onSuccess() {
      toast.success("Parolingiz o'zgartirildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// Faollashtirish uchun mutation
export const useLeaveExitStaff = () => {
  const { refetch: adminRefetch } = useGetAdminsMutation();

  return useMutation({
    mutationKey: ["exit-staff"],
    mutationFn: (data: object) =>
      request.post("/api/staff/leave-exit-staff", data),
    onSuccess() {
      toast.success("Faollashtirildi");
      adminRefetch();
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// Ishga qaytarish uchun mutation
export const useReturnToWork = () => {
  const { refetch: adminRefetch } = useGetAdminsMutation();

  return useMutation({
    mutationKey: ["return-work"],
    mutationFn: (data: object) =>
      request.post("/api/staff/return-work-staff", data),
    onSuccess() {
      toast.success("Ishga qaytarildi");

      adminRefetch();
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};
