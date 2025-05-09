"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { CoursesType, TeacherType } from "@/@types";
import {
  useCreateGroup,
  useGetAllCourses,
  useSearchTeacher,
} from "@/request/mutation";

const GroupsDialog = () => {
  const [courseId, setCourseId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: teachers, isLoading } = useSearchTeacher(searchTerm);
  const { data: AllCourses } = useGetAllCourses();
  const [selectValue, setSelectValue] = useState({
    id: "",
    name: "",
  });
  const { mutate, isPending } = useCreateGroup();
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    if (selectValue?.name) {
      setSearchTerm(selectValue.name);
      setFormData((prev) => ({ ...prev, teacher: selectValue.id }));
      setSearchTerm("");
    }
  }, [selectValue]);
  const [formData, setFormData] = useState({
    teacher: selectValue.id,
    started_group: new Date().toISOString().slice(0, 10),
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
            <div className="grid grid-cols-4 relative items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Ustoz :
              </Label>
              <Input
                id="username"
                className="col-span-3"
                type="text"
                value={searchTerm || selectValue.name}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectValue({ id: "", name: "" });
                }}
                placeholder="Ustoz ismini yozing"
              />
              {isLoading ? (
                <p>Yuklanmoqda...</p>
              ) : searchTerm && teachers?.length > 0 ? (
                <div className="absolute top-10 rounded-xl w-full bg-black flex flex-col gap-2 max-h-[200px] overflow-y-scroll z-50">
                  {teachers?.map((value: TeacherType) => (
                    <div
                      onClick={() => {
                        console.log(value);

                        setSelectValue({
                          id: value._id,
                          name: value.first_name,
                        });
                        setSearchTerm("");
                      }}
                      className="px-2 pt-2 cursor-pointer hover:bg-gray-800"
                      key={value._id}
                    >
                      {value.last_name} {value.first_name}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex relative items-center gap-11">
              <Label htmlFor="email" className="text-left">
                Kurslar:
              </Label>
              <Select
                onValueChange={(val) => {
                  const selected = AllCourses.find(
                    (item: CoursesType) => item.name.name === val
                  );
                  if (selected) {
                    setCourseId(selected._id);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Kursni tanlash" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Courses</SelectLabel>
                    {AllCourses?.map((value: CoursesType) => (
                      <SelectItem key={value._id} value={value?.name?.name}>
                        {value.name.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left">
                Yaratilgan kun:
              </Label>
              <Input
                id="email"
                value={formData.started_group}
                onChange={(e) =>
                  setFormData({ ...formData, started_group: e.target.value })
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
                mutate({ ...formData, course_id: courseId });
                setOpenDialog(!openDialog);
                setFormData({
                  teacher: "",
                  started_group: "",
                });
                setSearchTerm("");
                setSelectValue({ id: "", name: "" });
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
