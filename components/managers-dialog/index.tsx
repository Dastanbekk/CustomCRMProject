"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Cookies from "js-cookie";
import { UserType } from "@/@types";
import toast from "react-hot-toast";

const ManagersDialog = () => {
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const user: UserType = userCookie ? JSON.parse(userCookie) : null;

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    email: "",
    status: "",
    first_name: "",
    last_name: "",
  });
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Button
          onClick={() => {
            if (!user || user?.role?.toLowerCase() !== "manager") {
              toast.error("Sizga ruxsat berilmagan");
              return;
            }
            setOpenDialog(true);
          }}
          className="cursor-pointer"
        >
          <Plus /> Qo'shish
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manager Qo'shish</DialogTitle>
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
              <Label htmlFor="status" className="text-right">
                Status :
              </Label>
              <Input
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
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
                setOpenDialog(!openDialog);
                // editAdmin({
                //   ...formData,
                // });
              }}
            >
              {/* {isEditing ? "Saqlanmoqda..." : "Save changes"} */}
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagersDialog;
