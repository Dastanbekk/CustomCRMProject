"use client";

import { useState } from "react";
import { CircleDollarSign, CreditCard, DollarSign, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GroupsType, GroupType, PaymentsType, TeacherType } from "@/@types";
import { Label } from "@/components/ui/label";
import {
  useGetAllGroups,
  usePaymentStudent,
  useSearchStudent,
} from "@/request/mutation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PaymentsDialog() {
  const { mutate, isPending, isSuccess } = usePaymentStudent();
  const { data: Groups } = useGetAllGroups();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: student, isLoading } = useSearchStudent(searchTerm);
  const [selectStudent, setSelectStudent] = useState<GroupsType[]>();
  const [selectValue, setSelectValue] = useState({
    id: "",
    name: "",
  });
  const [date, setDate] = useState<Date>();
  const [dateTwo, setDateTwo] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [formData, setFormData] = useState<PaymentsType>({
    student_id: "",
    group_id: "",
    payment_price: 0,
    month: "",
    method: selectedMethod,
    paidAt: "",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CircleDollarSign /> <span className="hidden sm:block">To'lov</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black text-black dark:text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Payment Method
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Add a new payment method to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            className={`flex flex-col h-20 border hover:bg-none hover:text-white dark:hover:text-black  dark:text-white text-black bg-zinc  items-center justify-center gap-2 ${
              selectedMethod == "naqd"
                ? "dark:border-white border-black dark:text-white  text-white bg-black"
                : "bg-transparent border-zinc-300 dark:border-zinc-800"
            }`}
            onClick={() => {
              setFormData((prev) => ({ ...prev, method: "naqd" })),
                setSelectedMethod("naqd");
            }}
          >
            <DollarSign className="h-6 w-6" />
            <span className="text-sm">Naqd</span>
          </Button>
          <Button
            className={`flex flex-col h-20 border hover:bg-none hover:text-white dark:hover:text-black  dark:text-white text-black bg-zinc  items-center justify-center gap-2 ${
              selectedMethod == "card"
                ? "dark:border-white border-black dark:text-white  text-white bg-black"
                : "bg-transparent border-zinc-300 dark:border-zinc-800"
            }`}
            onClick={() => {
              setFormData((prev) => ({ ...prev, method: "karta" }));
              setSelectedMethod("card");
            }}
          >
            <CreditCard />
            <span className="text-sm">Karta</span>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 relative items-center gap-4">
              <Label htmlFor="username" className="text-right">
                O'quvchi :
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
              ) : searchTerm && student?.length > 0 ? (
                <div className="absolute top-10 rounded-xl w-full bg-black flex flex-col gap-2 max-h-[200px] overflow-y-scroll z-50">
                  {student?.map((value: TeacherType) => (
                    <div
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          student_id: value._id,
                        }));
                        setSelectStudent(value.groups || []);
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
          </div>

          <div className="space-y-2">
            <label
              htmlFor="group"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
            >
              Guruh
            </label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, group_id: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Guruhlari</SelectLabel>
                  {selectStudent?.map((value) => {
                    const group = Groups.find(
                      (item: GroupType) => item._id === value._id
                    );
                    return (
                      group && (
                        <SelectItem key={group._id} value={group._id}>
                          {group.name}
                        </SelectItem>
                      )
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
            >
              To'lov miqdori:
            </label>
            <Select
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  payment_price: Number(value),
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectStudent?.map((value) => {
                    const group = Groups.find(
                      (item: GroupType) => item._id === value._id
                    );
                    return (
                      group && (
                        <SelectItem key={group._id} value={group.price}>
                          {group.price}
                        </SelectItem>
                      )
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
            >
              Qayssi oy uchun
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateTwo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {dateTwo ? (
                    format(dateTwo, "yyyy-MM")
                  ) : (
                    <span>Kunni tanlash</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTwo}
                  onSelect={(selectedDate) => {
                    setDateTwo(selectedDate);
                    setFormData((prev) => ({
                      ...prev,
                      month: selectedDate
                        ?.toLocaleDateString("en-CA")
                        .slice(0, 7),
                    }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label
              htmlFor="price"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
            >
              Tolov qachon bolyapti
            </label>
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
                  {date ? format(date, "PPP") : <span>To'lov kuni</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setFormData((prev) => ({
                      ...prev,
                      paidAt: selectedDate?.toLocaleDateString("en-CA"),
                    }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button
          onClick={() => {
            mutate(formData, {
              onSuccess: () => {
                setOpen(false);
              },
            });
            console.log(formData);
          }}
          className="w-full mt-4 bg-white text-black hover:bg-zinc-200"
        >
          {isPending ? <Loader className="animate-spin" /> : "Tolash"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
