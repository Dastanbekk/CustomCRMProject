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
  leave_history: [
    {
      start_date: string;
      end_date: string;
      reason: string;
      _id: string;
    }
  ];
}
