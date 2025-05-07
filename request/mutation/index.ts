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
      cookie.set("jwt", data.token, { expires: 1 / 24 });
      cookie.set("user", JSON.stringify(data), { expires: 1 / 24 });
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
  return useQuery({
    queryKey: ["managers"],
    queryFn: async () => {
      const res = await request.get("/api/staff/all-managers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
  });
};

// Adminlarni backendan  olish uchun mutation
export const useGetAdminsMutation = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await request.get("/api/staff/all-admins");
      return await res.data.data;
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
  const { refetch: adminRefetch } = useGetAdminsMutation();
  return useMutation({
    mutationKey: ["editAdmin"],
    mutationFn: (data: object) => {
      // updateAdminsCache(queryClient, data);
      return request.post("/api/staff/edited-admin", data);
    },
    onSuccess() {
      toast.success("Admin o'zgartirildi");
      adminRefetch();
    },
    onError(err) {
      toast.error(`Xatolik: ${err.message}`);
    },
  });
};

// Adminni o'chirish uchun mutation
export const useDeleteAdminsMutation = () => {
  const { refetch: adminRefetch } = useGetAdminsMutation();
  const { refetch: managerRefetch } = useGetManagersMutation();

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
      managerRefetch();
    },
    onError(err) {
      toast.error(`Xatolik ${err.message}`);
    },
  });
};

// Admin qo'shish uchun mutation
export const useAddAdminMutation = () => {
  const { refetch: adminRefetch } = useGetAdminsMutation();

  return useMutation({
    mutationKey: ["add-admin"],
    mutationFn: (data: object) => request.post("/api/staff/create-admin", data),
    onSuccess() {
      toast.success("Admin qo'shildi");
      adminRefetch();
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
  const { refetch: adminRefetch } = useGetAdminsMutation();

  return useMutation({
    mutationKey: ["admin-staff"],
    mutationFn: (data: object) => request.post("/api/staff/leave-staff", data),
    onSuccess() {
      toast.success("Sabab qo'shildi");
      adminRefetch();
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
  const { refetch: managerRefetch } = useGetManagersMutation();
  return useMutation({
    mutationKey: ["return-work"],
    mutationFn: (data: object) =>
      request.post("/api/staff/return-work-staff", data),
    onSuccess() {
      toast.success("Ishga qaytarildi");
      managerRefetch();
      adminRefetch();
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// O'qituvchilarni qoshish uchun mutation
export const useCreateTeachersMutation = () => {
  const { refetch: teacherGet } = useGetTeachersMutation();
  return useMutation({
    mutationKey: ["create-teacher"],
    mutationFn: (data: object) => {
      return request.post("/api/teacher/create-teacher", data);
    },
    onSuccess() {
      toast.success("Qo'shildi");
      teacherGet();
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// O'qituvchilarni beckenddan olish uchun query
export const useGetTeachersMutation = () => {
  return useQuery({
    queryKey: ["get-teacher"],
    queryFn: async () => {
      const res = await request.get("/api/teacher/get-all-teachers");
      return res.data.data;
    },
  });
};

export const useDeleteTeachers = () => {
  const { refetch } = useGetTeachersMutation();
  return useMutation({
    mutationKey: ["delete-teacher"],
    mutationFn: (data: object) => {
      return request({
        url: "/api/teacher/fire-teacher",
        data,
        method: "DELETE",
      });
    },
    onSuccess() {
      refetch();
      toast.success("O'qituvchi ishdan bo'shatildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

export const useReturnToWorkTeacher = () => {
  const { refetch } = useGetTeachersMutation();

  return useMutation({
    mutationKey: ["return-teachers"],
    mutationFn: (data: object) => {
      return request.post("/api/teacher/return-teacher", data);
    },
    onSuccess() {
      toast.success("O'qituvchi ishga qaytarildi");
      refetch();
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// guruhlarni beckenddan olish
export const useGetAllGroups = () => {
  return useQuery({
    queryKey: ["get-groups"],
    queryFn: async () => {
      const res = await request.get("/api/group/get-all-group");
      return res.data.data;
    },
  });
};

export const useCreateGroup = () => {
  const { refetch } = useGetAllGroups();
  return useMutation({
    mutationKey: ["create-group"],
    mutationFn: (data: object) => request.post("/api/group/create-group", data),
    onSuccess() {
      refetch();
      toast.success("Guruh qoshildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

export const useSearchTeacher = (name: string, enabled = true) => {
  return useQuery({
    queryKey: ["search-teacher", name],
    queryFn: async () => {
      const res = await request.get("/api/group/search-teacher", {
        params: { name: name.trim() },
      });
      return await res.data.data;
    },
    enabled: !!name.trim(),
  });
};

export const useGetGroupsTeacherWithId = (teacherId: string) => {
  return useQuery({
    queryKey: ["get-teacher-id", teacherId],
    queryFn: async () => {
      const res = await request.get(`/api/teacher/get-teacher/${teacherId}`);
      return await res.data.data;
    },
    enabled: !!teacherId,
  });
};

export const useDeleteGroups = () => {
  const { refetch } = useGetAllGroups();
  return useMutation({
    mutationKey: ["delete-group"],
    mutationFn: (data: object) => {
      return request({ url: "/api/group/end-group", data, method: "DELETE" });
    },
    onSuccess() {
      refetch();
      toast.success("Guruh o'chirildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

export const useGetGroupsWithParams = (name: string) => {
  return useQuery({
    queryKey: ["get-group-id", name],
    queryFn: async () => {
      const res = await request.get("/api/student/search-group", {
        params: { name: name.trim() },
      });
      return await res.data.data;
    },
    enabled: !!name.trim(),
  });
};

// Students
export const useGetAllStudents = () => {
  return useQuery({
    queryKey: ["get-students"],
    queryFn: async () => {
      const res = await request.get("/api/student/get-all-students");
      return await res.data.data;
    },
  });
};

// Studentni tizimga qo'shish
export const useCreateStudent = () => {
  const { refetch } = useGetAllStudents();
  return useMutation({
    mutationKey: ["create-student"],
    mutationFn: (data: object) =>
      request.post("/api/student/create-student", data),

    onSuccess() {
      refetch();
      toast.success("O'quvchi tizimga qo'shildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

export const useGetGroupTeacher = (teacherId: string) => {
  return useQuery({
    queryKey: ["get-teacher-id", teacherId],
    queryFn: async () => {
      const res = await request.get(`/api/teacher/get-teacher/${teacherId}`);
      return await res.data.data;
    },
    enabled: !!teacherId,
  });
};

// Studentni tizimdan chiqarish
export const useDeleteStudent = () => {
  const { refetch } = useGetAllStudents();
  return useMutation({
    mutationKey: ["delete-student"],
    mutationFn: (data: object) => {
      return request({
        url: "/api/student/delete-student",
        data,
        method: "DELETE",
      });
    },
    onSuccess() {
      toast.success("O'quvchi o'chirildi");
      refetch();
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// Studentni tatilga chiqarish
export const useStudentStaffMutation = () => {
  const { refetch } = useGetAllStudents();
  return useMutation({
    mutationKey: ["student-staff"],
    mutationFn: (data: object) =>
      request.post("/api/student/leave-student", data),
    onSuccess() {
      refetch();
      toast.success("Ta'tilga chiqarildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// Studentni tatildan qaytarish
export const useReturnStaffStudentMutation = () => {
  const { refetch } = useGetAllStudents();
  return useMutation({
    mutationKey: ["return-staff"],
    mutationFn: (data: object) =>
      request.post("/api/student/return-leave-student", data),
    onSuccess() {
      refetch();
      toast.success("O'quvchi ta'tildan qaytarildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// Studentni tizimga qaytarish
export const useReturnStudentMutation = () => {
  const { refetch } = useGetAllStudents();
  return useMutation({
    mutationKey: ["return-student"],
    mutationFn: (data: object) =>
      request.post("/api/student/return-student", data),
    onSuccess() {
      refetch();
      toast.success("O'quvchi tizimga qaytarildi");
    },
    onError(err) {
      toast.error(`Xatolik ${err}`);
    },
  });
};

// Studentni id orqali olish
export const useGetStudentWithId = (studentId: string) => {
  return useQuery({
    queryKey: ["get-student-with-id", studentId],
    queryFn: async () => {
      const res = await request.get(`/api/student/student/${studentId}`);
      return await res.data.data;
    },
    enabled: !!studentId,
  });
};
