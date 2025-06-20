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
import { useAdminStaffMutation } from "@/request/mutation";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
            <div className="grid grid-cols-2 items-center  gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span>Boshlanish sanasi</span>
                    )}
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
                      "w-[180px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Tugash sanasi</span>
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
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                mutate({
                  ...formData,
                  start_date: date?.toISOString(),
                  end_date: endDate?.toISOString(),
                });
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
