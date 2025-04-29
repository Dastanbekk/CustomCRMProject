"use client";
import React, { lazy, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import backgroundImg from "@/public/profileBg.png";
import userDefaultImg from "@/public/user.svg";
import { NewUserType, UserType } from "@/@types";
import { Button } from "@/components/ui/button";
import { Camera, Edit, Eye, EyeOff, Glasses } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useForgotPasswordMutation,
  useUpdateUserProfile,
  useUploadImgMutation,
} from "@/request/mutation";

const Profile = () => {
  const [curPas, setCurPas] = useState(true);
  const [newPas, setNewPas] = useState(false);
  const [edit, setEdit] = useState(true);
  const cookie = Cookies;
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);
  const { mutate } = useUploadImgMutation();
  const { mutate: updateProfile } = useUpdateUserProfile();
  const { mutate: forgotPassword } = useForgotPasswordMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [newUser, setNewUser] = useState<NewUserType>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [newPassword, setNewPassword] = useState({
    current_password: "",
    new_password: "",
  });

  const handlePush = () => {
    updateProfile(newUser);
    cookie.set(
      "user",
      JSON.stringify({
        ...user,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      })
    );
  };

  const handlePassword = () => {
    forgotPassword(newPassword);
    console.log(newPassword);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Iltimos, rasm tanlang!");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    mutate(formData);
  };

  return (
    <div className="px-5 py-5">
      <Image
        src={backgroundImg}
        alt="profile-bg"
        className="min-h-[70px] max-h-[150px] object-cover rounded-t-xl h-full w-full"
      />
      <div className="flex items-end mt-[-3%] px-5 justify-between">
        <div className="flex items-end gap-3">
          <div className="bg-gray-200 rounded-full relative ">
            <label
              htmlFor="file-upload"
              className="cursor-pointer absolute bottom-[-5px] right-[-5px] z-90 flex items-center justify-center bg-[#7777776c] dark:border-white border border-black text-black  dark:text-white  px-2 py-[2px] rounded-full w-10 h-10 text-sm text-center"
            >
              <Camera />
            </label>
            <Image
              src={
                user
                  ? user?.image
                    ? user?.image
                    : userDefaultImg
                  : userDefaultImg
              }
              alt="default-user-img"
              loading="lazy"
              width={100}
              height={100}
              className="rounded-full object-cover "
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">{`${
              user ? user?.first_name : ""
            }  ${user ? user?.first_name : ""}`}</h3>
            <h3 className="text-[15px] text-zinc-400">
              {user ? user?.first_name : ""}
            </h3>
          </div>
        </div>
        <Button onClick={() => setEdit(!edit)} className="cursor-pointer">
          <span className="hidden sm:block">O'zgartirish</span> <Edit />
        </Button>
      </div>

      <div className="flex items-start">
        <div className="flex  gap-1 p-4">
          <div className="flex">
            <Input
              id="file-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <Button size="sm" onClick={handleUpload}>
            Rasmni yuklash
          </Button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 mt-5 px-5 sm:grid-cols-2 gap-3 sm:gap-5"
      >
        <div className="flex flex-col space-y-3">
          <Label htmlFor="first_name">First Name:</Label>
          <Input
            id="first_name"
            disabled={edit}
            defaultValue={user?.first_name}
            onChange={(e) =>
              setNewUser({ ...newUser, first_name: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col space-y-3">
          <Label htmlFor="last_name">Last Name:</Label>
          <Input
            id="last_name"
            disabled={edit}
            defaultValue={user?.last_name}
            onChange={(e) =>
              setNewUser({ ...newUser, last_name: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col space-y-3">
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            disabled={edit}
            defaultValue={user?.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <Label htmlFor="role">Role:</Label>
          <Input id="role" disabled={true} defaultValue={user?.role} />
        </div>
        <div>
          <Button
            onClick={handlePush}
            disabled={edit}
            className="flex items-start"
          >
            Saqlash
          </Button>
        </div>
      </form>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 mt-5 px-5 sm:grid-cols-2 gap-3 sm:gap-5"
      >
        <div className="flex flex-col space-y-3 relative">
          <Label htmlFor="current_password">Joriy parol:</Label>
          <Input
            id="current_password"
            type={`${curPas ? "text" : "password"}`}
            disabled={edit}
            placeholder="********"
            onChange={(e) =>
              setNewPassword({
                ...newPassword,
                current_password: e.target.value,
              })
            }
          />
          <Button
            type="button"
            variant="link"
            disabled={edit}
            size="icon"
            className="absolute right-2 top-6 cursor-pointer"
            onClick={() => setCurPas(!curPas)}
          >
            {curPas ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="flex flex-col space-y-3 relative">
          <Label htmlFor="new_password">Yangi parol:</Label>
          <Input
            type={`${newPas ? "text" : "password"}`}
            id="new_password"
            disabled={edit}
            placeholder="********"
            onChange={(e) =>
              setNewPassword({ ...newPassword, new_password: e.target.value })
            }
          />
          <Button
            type="button"
            variant="link"
            disabled={edit}
            size="icon"
            className="absolute right-2 top-6 cursor-pointer"
            onClick={() => setNewPas(!newPas)}
          >
            {newPas ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div>
          <Button
            onClick={handlePassword}
            disabled={edit}
            className="flex items-start"
          >
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
