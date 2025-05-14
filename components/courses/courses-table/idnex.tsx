"use client";
import { CoursesType } from "@/@types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useDeleteCourse,
  useEditCourse,
  useFreezeCourse,
  useGetAllCourses,
  useUnFreezeCourse,
} from "@/request/mutation";
import {
  BookText,
  Calendar,
  Clock,
  Edit,
  Info,
  Loader2,
  Snowflake,
  SunSnow,
  Trash,
} from "lucide-react";
import React, { useState } from "react";

const CoursesTable = () => {
  const [editDialog, setEditDialog] = useState(false);
  const { data, isLoading, isError, isPending } = useGetAllCourses();
  const { mutate: editCourseMutate } = useEditCourse();
  const { mutate: DeleteCourseMutate } = useDeleteCourse();
  const { mutate: FreezeCourseMutate } = useFreezeCourse();
  const { mutate: UnFreezeCourseMutate } = useUnFreezeCourse();
  const [editForm, setFormEdit] = useState({
    course_id: "",
    duration: "",
    price: 0,
  });
  console.log(data);

  if (isPending || isError) {
    <div className="w-full h-[80vh] flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
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
                  <Clock /> <p className="sm:block hidden">Davomiyligi:</p>{" "}
                  <p>{value?.duration}</p>
                </CardTitle>
                <div className="flex gap-2 items-center mt-2">
                  <Info />
                  <p className="sm:block hidden">Kurs haqida:</p>
                  <p>{value.description}</p>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <Calendar />
                  <p className="sm:block hidden">Kurs ochilgan vaqti:</p>
                  <p>{value.createdAt.slice(0, 10)}</p>
                </div>
              </div>

              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <BookText className="h-4 w-4 text-green-500" />
                </div>

                <div className="flex-col mt-10 absolute top-0 right-0 flex gap-2 lg:opacity-0 lg:translate-y-15 opacity-100 translate-y-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-600 ease-in-out">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tahrirlash</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() =>
                            DeleteCourseMutate({ course_id: value._id })
                          }
                          className="h-8 w-8 rounded-full cursor-pointer bg-red-500/20 flex items-center justify-center"
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>O'chirish</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {value.is_freeze ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() =>
                              UnFreezeCourseMutate({ course_id: value._id })
                            }
                            className="h-8 w-8 rounded-full cursor-pointer bg-blue-500/20 flex items-center justify-center"
                          >
                            <SunSnow className="h-4 w-4 text-blue-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Aktivlash</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() =>
                              FreezeCourseMutate({ course_id: value._id })
                            }
                            className="h-8 w-8 rounded-full cursor-pointer bg-blue-500/20 flex items-center justify-center"
                          >
                            <Snowflake className="h-4 w-4 text-blue-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Muzlatish</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="">
              <div className="text-2xl mt-2 text-green-600 font-bold">
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
