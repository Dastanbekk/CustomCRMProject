import React from "react";

export interface FormDataType {
  email: string;
  password: string;
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
