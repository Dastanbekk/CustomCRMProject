"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import backgroundImg from "@/public/profileBg.png";
import userDefaultImg from "@/public/user.svg";
import { UserType } from "@/@types";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [edit, setEdit] = useState(true);
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const user: UserType = userCookie ? JSON.parse(userCookie) : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="px-5 py-5">
      <Image
        src={backgroundImg}
        alt="profile-bg"
        className="min-h-[70px] w-full"
      />
      <div className="flex items-center mt-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 rounded-full">
            <Image
              src={userDefaultImg}
              alt="default-user-img"
              className="max-w-[100px] max-h-[100px] w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">{`${user?.first_name}  ${user?.last_name}`}</h3>
            <h3 className="text-[15px] text-zinc-400">{user?.email}</h3>
          </div>
        </div>
        <Button onClick={() => setEdit(!edit)} className="cursor-pointer">
          <span className="hidden sm:block">O'zgartirish</span> <Edit />
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 mt-5 sm:grid-cols-2 gap-3 sm:gap-5"
      >
        <div className="flex flex-col space-y-3">
          <Label htmlFor="first_name">First Name:</Label>
          <Input
            id="first_name"
            disabled={edit}
            defaultValue={user?.first_name}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <Label htmlFor="last_name">Last Name:</Label>
          <Input
            id="last_name"
            disabled={edit}
            defaultValue={user?.last_name}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            disabled={edit}
            defaultValue={user?.email}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <Label htmlFor="role">Role:</Label>
          <Input id="role" disabled={edit} defaultValue={user?.role} />
        </div>
        <div>
          <Button disabled={edit} className="flex items-start">
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
