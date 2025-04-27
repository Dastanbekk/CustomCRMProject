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
import toast from "react-hot-toast";
import { useAdminStaffMutation } from "@/request/mutation";

const AdminsStaffDialog = ({ prop }: { prop: string }) => {
  const { mutate, isPending } = useAdminStaffMutation();
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const user: UserType = userCookie ? JSON.parse(userCookie) : null;
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    _id: prop,
    start_date: "",
    end_date: "",
    reason: "",
  });

  return (
    <div>
      <Dialog onOpenChange={() => setOpenDialog(!openDialog)}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              user?.role.toLowerCase() !== "manager"
                ? toast.error("Sizga ruxsat berilmagan")
                : setOpenDialog(!openDialog);
            }}
            className="cursor-pointer bg-transparent flex items-start w-full dark:text-white hover:!bg-transparent text-start text-zinc-900 "
          >
            Sabab bildirish
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Admin Qo'shish</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-start">
                Boshlanish vaqti
              </Label>
              <Input
                id="start"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-start">
                Tamom bo'lish vaqti
              </Label>
              <Input
                id="end"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Sabab
              </Label>
              <Input
                id="reason"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                console.log(formData);
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

export default AdminsStaffDialog;
