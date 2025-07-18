import React from "react";

export interface FormDataType {
  email: string;
  password: string;
}

export interface NewUserType {
  email: string;
  first_name: string;
  last_name: string;
}

export interface ChildrenType {
  children: React.ReactNode;
}

export interface UserType {
  createdAt: string;
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  role: string;
  token: string;
  updatedAt: string;
  work_date: string;
  work_end: null;
  _id: string;
  status: string;
}

export interface ManagersType {
  _id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  status?: string;
  role?: string;
  active?: boolean;
  phone?: string;
  gender?: string;
  birthday?: string;
  address?: string;
  email: string;
  createdAt?: string;
  image?: string;
  is_deleted?: boolean;
  updatedAt?: string;
  work_date?: string;
  work_end?: null;
  groups: {
    group: {
      course: string;
      createdAt: string;
      disable: boolean;
      end_group: string;
      is_deleted: boolean;
      name: string;
      price: number;
      started_group: string;
      teacher: string;
      updatedAt: string;
      _id: string;
    };
  }[];
  leave_history: [
    {
      start_date: string;
      end_date: string;
      reason: string;
      _id: string;
    }
  ];
}

export interface TeacherType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  field: string;
  salary: number;
  status: "faol" | "ta'tilda" | "ishdan bo'shatilgan" | string; // agar aniq enumlar bo'lsa, ularga cheklash qo'yish mumkin
  image: string | null;
  createdAt: string; // yoki Date agar parse qilinsa
  updatedAt: string;
  work_date: string;
  work_end: string | null;
  is_deleted: boolean;
  groups: any[]; // yoki agar grouplar turi ma'lum bo‘lsa: GroupType[]
}

export interface GroupsType {
  _id: string;
  name: string;
  teacher: string;
  price: number;
  started_group: string;
  group: {
    course: string;
    createdAt: string;
    disable: boolean;
    end_group: string;
    is_deleted: boolean;
    name: string;
    price: number;
    started_group: string;
    teacher: string;
    updatedAt: string;
    _id: string;
  };
}

export interface GroupType {
    course: string;
    createdAt: string;
    disable: boolean;
    end_group: string;
    is_deleted: boolean;
    name: string;
    price: number;
    started_group: string;
    teacher: string;
    updatedAt: string;
    _id: string;
}

export interface StudentsType {
  _id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  status?: string;
  role?: string;
  active?: boolean;
  phone?: string;
  gender?: string;
  birthday?: string;
  address?: string;
  email: string;
  createdAt?: string;
  image?: string;
  is_deleted?: boolean;
  updatedAt?: string;
  work_date?: string;
  work_end?: null;
  groups: {
    group: {
      course: string;
      createdAt: string;
      disable: boolean;
      end_group: string;
      is_deleted: boolean;
      name: string;
      price: number;
      started_group: string;
      teacher: string;
      updatedAt: string;
      _id: string;
    };
    exitedAt: string;
    joinedAt: string;
    payments: [];
    status: string;
  }[];
  leave_history: [
    {
      _id: string;
      start_date: string;
      end_date: string;
      days: number;
      reason: string;
    }
  ];
}

export interface CoursesType {
  createdAt: string;
  description: string;
  duration: string;
  is_freeze: boolean;
  name: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  price: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface APIError {
  response?: {
    data?: {
      message: string;
      status?: number;
    };
  };
}

export interface AdminsType {
  active: boolean;
  createdAt: string;
  email: string;
  first_name: string;
  image: string;
  is_deleted: boolean;
  last_name: string;
  leave_history: [
    {
      start_date: string;
      end_date: string;
      reason: string;
      _id: string;
    }
  ];
  password: string;
  role: string;
  status: string;
  updatedAt: string;
  work_date: string;
  work_end: null;
  _id: string;
}

export interface PaymentsType {
  student_id: string;
  group_id: string;
  payment_price: number;
  month?: string;
  method: string;
  paidAt?: string ;
}
