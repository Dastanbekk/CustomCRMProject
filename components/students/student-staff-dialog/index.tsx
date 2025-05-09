"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { UserType } from "@/@types";
import Cookies from "js-cookie";
import { useStudentStaffMutation } from "@/request/mutation";
import toast from "react-hot-toast";

const StudentStaffDialog = ({ prop }: { prop: string }) => {
  const { mutate, isPending } = useStudentStaffMutation();
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const user: UserType = userCookie ? JSON.parse(userCookie) : null;
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    student_id: prop,
    leave_days: "",
    reason: "",
  });
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Button
          onClick={() =>
            user?.role?.toLowerCase() !== "manager"
              ? toast.error("Sizga ruxsat berilmagan!")
              : setOpenDialog(!openDialog)
          }
          className="cursor-pointer bg-transparent flex items-start ml-[-10px] dark:text-gray-200 hover:!bg-transparent text-start text-zinc-900 "
        >
          Sabab bildirish
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sabab bildirish</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="days" className="text-right">
                Necha kun
              </Label>
              <Input
                id="days"
                value={formData.leave_days}
                onChange={(e) =>
                  setFormData({ ...formData, leave_days: e.target.value })
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
                mutate(formData);
                setOpenDialog(false);
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

export default StudentStaffDialog;
