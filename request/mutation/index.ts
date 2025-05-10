"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "..";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import cookie from "js-cookie";
import { ManagersType } from "@/@types";
import Cookies from "js-cookie";
type APIError = {
  response?: {
    data?: {
      message: string;
      status?: number;
    };
  };
};

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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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

      return await res.data.data;
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// O'qituvchilarni beckenddan olish uchun query
export const useGetTeachersMutation = () => {
  return useQuery({
    queryKey: ["get-teacher"],
    queryFn: async () => {
      const res = await request.get("/api/teacher/get-all-teachers");
      return await res.data.data;
    },
  });
};

// O'qituvchilarni o'chirish uchun mutation
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// O'qituvchini ishga qaytarish uchun mutation
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// guruhlarni beckenddan olish
export const useGetAllGroups = () => {
  return useQuery({
    queryKey: ["get-groups"],
    queryFn: async () => {
      const res = await request.get("/api/group/get-all-group");
      return await res.data.data;
    },
  });
};

// Guruh yaratish uchun mutation
export const useCreateGroup = () => {
  const { refetch } = useGetAllGroups();
  return useMutation({
    mutationKey: ["create-group"],
    mutationFn: (data: object) => request.post("/api/group/create-group", data),
    onSuccess() {
      refetch();
      toast.success("Guruh qoshildi");
    },
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// Ustozni qidirish uchun mutation
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

// Guruhni narxini o'zgartirish uchun mutate
export const useEditGroupPrice = () => {
  return useMutation({
    mutationKey: ["edit-group-price"],
    mutationFn: (data: object) =>
      request.post("/api/group/edit-price-group", data),
    onSuccess() {
      toast.success("Guruh narxi o'zgardi");
    },
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// Id orqali ustozlarni o'lish
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

// Guruhni o'chirish uchun mutation
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// Params orqali studentni chiqaish uchun mutation
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
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
export const useAdminsWithID = (studentId: string) => {
  return useQuery({
    queryKey: ["get-admins-with-id", studentId],
    queryFn: async () => {
      const res = await request.get(`/api/staff/info/${studentId}`);
      return await res.data.data;
    },
    enabled: !!studentId,
  });
};

// Studentni yangi guruhga qo'shish
export const useAddNewGroupStudent = () => {
  return useMutation({
    mutationKey: ["add-new-group-for-student"],
    mutationFn: (data: object) =>
      request.post("/api/student/added-new-group-student", data),
    onSuccess() {
      toast.success("O'quvchi guruhga qoshildi");
    },
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// GET Courses
export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["get-all-courses"],
    queryFn: async () => {
      const res = request.get("/api/course/get-courses");
      return (await res).data.data;
    },
  });
};

// Categoriya yaratish uchun mutation
export const useCreateCourseCategory = () => {
  return useMutation({
    mutationKey: ["create-category"],
    mutationFn: (data: object) =>
      request.post("/api/course/create-category", data),
  });
};

// Kurs yaratish uchun mutation
export const useCreateCourse = () => {
  const { refetch } = useGetAllCourses();
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: (data: object) =>
      request.post("/api/course/create-course", data),
    onSuccess() {
      refetch();
      toast.success("Kurs muvaffaqiyatli yaratildi");
    },
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// Kursni o'chirish uchun mutation
export const useDeleteCourse = () => {
  const { refetch } = useGetAllCourses();
  return useMutation({
    mutationKey: ["delete-course"],
    mutationFn: (data: object) =>
      request({ url: "/api/course/delete-course", data, method: "DELETE" }),
    onSuccess() {
      refetch();
      toast.success("Kurs o'chirildi");
    },
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// Kursni o'zgartirish uchun mutation
export const useEditCourse = () => {
  const { refetch } = useGetAllCourses();
  return useMutation({
    mutationKey: ["edit-course"],
    mutationFn: (data: object) => request.post("/api/course/edit-course", data),
    onSuccess() {
      refetch();
      toast.success("Kurs ma'lumotlari o'zgartirildi");
    },
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// Kursni muzlatish uchun mutation
export const useFreezeCourse = () => {
  return useMutation({
    mutationKey: ["freeze-course"],
    mutationFn: (data: object) =>
      request.put("/api/course/freeze-course", data),
    onSuccess() {
      toast.success("Kurs muzlatildi");
    },
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};

// Kursni muzlatishdan chiqarish uchun mutation
export const useUnFreezeCourse = () => {
  return useMutation({
    mutationKey: ["freeze-course"],
    mutationFn: (data: object) =>
      request.put("/api/course/unfreeze-course", data),
    onSuccess() {
      toast.success("Kurs aktivlashtirildi");
    },
    onError(err: APIError) {
      toast.error(`Xatolik ${err?.response?.data?.message}`);
    },
  });
};
