"use client";
import React, {  useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { GroupsType, UserType } from "@/@types";
import Cookies from "js-cookie";
import { useCreateStudent, useGetGroupsWithParams } from "@/request/mutation";
const StudentsDialog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: groups, isLoading } = useGetGroupsWithParams(searchTerm);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { mutate, isPending } = useCreateStudent();
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const user: UserType = userCookie ? JSON.parse(userCookie) : null;
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    groups: [] as { group: string }[],
  });

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Button onClick={() => setOpenDialog(true)} className="cursor-pointer">
          <Plus /> <span className="hidden sm:block">Qo'shish</span>
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Student Qo'shish</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Ism :
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
              <Label htmlFor="name" className="text-right">
                Familiya :
              </Label>
              <Input
                id="name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
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
                        setFormData((prev) => ({
                          ...prev,
                          groups: [{ group: group._id }],
                        }));
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
                mutate(formData);
                setOpenDialog(false);
                setFormData({
                  first_name: "",
                  last_name: "",
                  phone: "",
                  groups: [],
                });
                setSearchTerm("");
                setSelectedGroup(null);
              }}
              disabled={isPending}
            >
              {isPending ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsDialog;
