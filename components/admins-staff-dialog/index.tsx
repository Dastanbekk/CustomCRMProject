"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UserType } from "@/@types";
import Cookies from "js-cookie";
import { useAdminStaffMutation } from "@/request/mutation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import toast from "react-hot-toast";

const AdminsStaffDialog = ({ prop }: { prop: string }) => {
  const [date, setDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
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
            <div className="grid grid-cols-2 gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[170px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Boshlanish vaqti</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[170px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Tugash vaqti</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                const updatedFormData = {
                  ...formData,
                  start_date: date?.toISOString().slice(0, 10),
                  end_date: endDate?.toISOString().slice(0, 10),
                };

                mutate(updatedFormData);
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

export default AdminsStaffDialog;
