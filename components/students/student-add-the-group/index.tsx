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
import { GroupsType, UserType } from "@/@types";
import Cookies from "js-cookie";
import {
  useAddNewGroupStudent,
  useGetGroupsWithParams,
} from "@/request/mutation";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

const StudentAddTheGroup = ({ prop }: { prop: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: groups, isLoading } = useGetGroupsWithParams(searchTerm);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { mutate, isPending } = useAddNewGroupStudent();
  const [date, setDate] = React.useState<Date>();
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const user: UserType = userCookie ? JSON.parse(userCookie) : null;
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    student_id: prop,
    group_id: "",
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
          Guruhga qo'shish
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sabab bildirish</DialogTitle>
          </DialogHeader>
          <div className="grid w-full gap-4 py-4">
            <div className="grid items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
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
            </div>
            <div className="grid grid-cols-4 relative items-center gap-4">
              <Label htmlFor="group" className="text-right">
                Guruh :
              </Label>
              <Input
                id="group"
                className="col-span-3"
                type="text"
                value={selectedGroup?.name || searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (!e.target.value) {
                    setSelectedGroup(null);
                  }
                }}
                placeholder="Guruh nomini yozing"
              />
              {isLoading ? (
                <p>
                  <Loader2 className="animate-spin" />
                </p>
              ) : searchTerm && groups?.length > 0 ? (
                <div className="absolute top-10 left-0 right-0 rounded-xl bg-black flex flex-col gap-2 max-h-[200px] overflow-y-auto z-50">
                  {groups?.map((group: GroupsType) => (
                    <div
                      onClick={() => {
                        setSelectedGroup({
                          id: group._id,
                          name: group.name,
                        });
                        setFormData({ ...formData, group_id: group._id });
                        setSearchTerm("");
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-800"
                      key={group._id}
                    >
                      {group.name}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                mutate({ ...formData, joinedAt: date?.toISOString() });
                setOpenDialog(false);
                console.log({ ...formData, joinedAt: date?.toISOString() });
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

export default StudentAddTheGroup;
