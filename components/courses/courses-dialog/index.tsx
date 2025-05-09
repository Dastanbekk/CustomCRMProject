"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useCreateCourse, useCreateCourseCategory } from "@/request/mutation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";

const CoursesDialog = () => {
  const {
    mutate: CreateCategoryMutate,
    isPending: isCategoryPending,
    isError: isCategoryError,
  } = useCreateCourseCategory();
  const { mutate: CreateCourseMutate } = useCreateCourse();
  const [step, setStep] = useState("step1");
  const [category, setCategory] = useState({
    name: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: 0,
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
            <DialogTitle>Kurs Yaratish</DialogTitle>
          </DialogHeader>
          <Tabs value={step} className="w-full max-w-xl mx-auto">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="step1">1. Categoriya</TabsTrigger>
              <TabsTrigger value="step2">2. Kurs</TabsTrigger>
            </TabsList>

            <TabsContent value="step1">
              <div className="grid grid-cols-4 my-3 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Categoriya :
                </Label>
                <Input
                  id="name"
                  onChange={(e) => setCategory({ name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  disabled={isCategoryPending || !category.name}
                  onClick={() => {
                    CreateCategoryMutate(category, {
                      onSuccess: () => {
                        setStep("step2"), toast.success("Category yaratildi");
                      },
                      onError: (err) => {
                        toast.error(`Xatolik ${err}`);
                      },
                    });
                  }}
                >
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="step2">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nomi :
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">
                    Ma'lumot:
                  </Label>
                  <Input
                    id="desc"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="duration" className="text-right">
                    Davomiyligi :
                  </Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Narxi :
                  </Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    CreateCourseMutate(formData, {
                      onSuccess: () => setOpenDialog(false),
                    });
                  }}
                >
                  Saqlash
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesDialog;
