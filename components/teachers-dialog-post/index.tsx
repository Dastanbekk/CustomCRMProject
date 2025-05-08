"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UserType } from "@/@types";
import Cookies from "js-cookie";
import { useCreateTeachersMutation } from "@/request/mutation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const GroupsDialog = () => {
  const [selectValue, setSelectValue] = useState("");
  const { mutate, isPending } = useCreateTeachersMutation();
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const user: UserType = userCookie ? JSON.parse(userCookie) : null;
  const [openDialog, setOpenDialog] = useState(false);

  //   const handleChange = (value: string) => {
  //     setSelectValue(value);
  //   };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    field: "",
  });
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <Button
          onClick={() => setOpenDialog(!openDialog)}
          className="cursor-pointer"
        >
          <Plus /> <span className="hidden sm:block">Qo'shish</span>
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Admin Qo'shish</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name :
              </Label>
              <Input
                id="name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username :
              </Label>
              <Input
                id="username"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email :
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Parol :
              </Label>
              <Input
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="flex gap-4 justify-between w-full items-center ">
              <Label htmlFor="phone" className="text-right">
                Raqam:
              </Label>
              <div className="flex justify-end items-center w-full">
                <span className="text-sm px-3 py-2 rounded-l-md border bg-transparent ">
                  +998
                </span>
                <Input
                  id="phone"
                  className="w-[70%] rounded-l-none bg-black"
                  placeholder="90 123-45-67"
                  type="tel"
                  maxLength={9}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: `+998${e.target.value}` })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="field" className="text-right">
                Yonalish :
              </Label>
              <Select
                value={selectValue}
                onValueChange={(e: string) =>
                  setFormData({ ...formData, field: e })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Yo'nalishni tanlash" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Yo'nalishlar</SelectLabel>
                    <SelectItem value="Frontend dasturlash">
                      Frontend
                    </SelectItem>
                    <SelectItem value="Backend dasturlash">Backend</SelectItem>
                    <SelectItem value="Rus tili">Rus tili</SelectItem>
                    <SelectItem value="Ingliz tili">Ingliz tili</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                setOpenDialog(!openDialog);
                mutate(formData);
              }}
            >
              {isPending ? "Saqlanmoqda..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupsDialog;
