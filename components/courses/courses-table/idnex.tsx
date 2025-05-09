"use client";
import { CoursesType } from "@/@types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDeleteCourse,
  useEditCourse,
  useGetAllCourses,
} from "@/request/mutation";
import {
  BookText,
  Calendar,
  Clock,
  Edit,
  Info,
  Loader2,
  Trash,
} from "lucide-react";
import React, { useState } from "react";

const CoursesTable = () => {
  const [editDialog, setEditDialog] = useState(false);
  const { data, isLoading, isError, isPending } = useGetAllCourses();
  const { mutate: editCourseMutate } = useEditCourse();
  const { mutate: DeleteCourseMutate } = useDeleteCourse();
  const [editForm, setFormEdit] = useState({
    course_id: "",
    duration: "",
    price: 0,
  });
  if (isPending || isError) {
    <div className="w-full h-[80vh] flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((value: CoursesType) => (
          <Card
            key={value._id}
            className="border-l-10 border-l-blue-500 group relative"
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl mb-4">
                  {value?.name?.name}
                </CardTitle>
                <CardTitle className="flex items-center gap-2">
                  <Clock /> <p>Davomiyligi:</p> <p>{value?.duration}</p>
                </CardTitle>
                <div className="flex gap-2 items-center mt-2">
                  <Info />
                  <p>Kurs haqida:</p>
                  <p>{value.description}</p>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <Calendar />
                  <p>Kurs ochilgan vaqti:</p>
                  <p>{value.createdAt.slice(0, 10)}</p>
                </div>
              </div>

              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <BookText className="h-4 w-4 text-blue-500" />
                </div>

                <div className="flex-col mt-10 absolute top-0 right-0 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600 ease-in-out">
                  <button
                    onClick={() => {
                      setFormEdit({
                        ...editForm,
                        price: value.price,
                        course_id: value._id,
                        duration: value.duration,
                      });
                      setEditDialog(true);
                    }}
                    className="h-8 w-8 rounded-full cursor-pointer bg-yellow-500/20 flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 text-yellow-500" />
                  </button>
                  <button
                    onClick={() => DeleteCourseMutate({ course_id: value._id })}
                    className="h-8 w-8 rounded-full cursor-pointer bg-red-500/20 flex items-center justify-center"
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="">
              <div className="text-2xl mt-4 text-green-600 font-bold">
                {value.price.toLocaleString()} sum
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={editDialog} onOpenChange={() => setEditDialog(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kurs ma'lumotlarini o'zgartirish</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Davomiyligi:
              </Label>
              <Input
                id="name"
                defaultValue={editForm.duration}
                onChange={(e) =>
                  setFormEdit({ ...editForm, duration: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Narxi:
              </Label>
              <Input
                defaultValue={editForm.price}
                id="username"
                onChange={(e) =>
                  setFormEdit({
                    ...editForm,
                    price: Number(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() =>
                editCourseMutate(editForm, {
                  onSuccess() {
                    setEditDialog(false);
                  },
                })
              }
              type="submit"
            >
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesTable;
