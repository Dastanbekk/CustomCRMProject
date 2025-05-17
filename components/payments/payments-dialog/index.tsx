"use client";

import { useState } from "react";
import { CircleDollarSign, CreditCard, DollarSign } from "lucide-react";

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

export function PaymentsDialog() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  console.log(selectedMethod);

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
            onClick={() => setSelectedMethod("naqd")}
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
            onClick={() => setSelectedMethod("card")}
          >
            <CreditCard />
            <span className="text-sm">Karta</span>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
            >
              O'quvchi
            </label>
            <Input
              id="name"
              className="dark:bg-black border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="group"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
            >
              Guruh
            </label>
            <Input
              id="group"
              className="dark:bg-black border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
            >
              To'lov miqdori:
            </label>
            <Input
              id="price"
              className="dark:bg-black border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
            >
              Qayssi oy uchun
            </label>
            <Input
              id="price"
              className="dark:bg-black border-zinc-800 text-white"
            />
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
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
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button className="w-full mt-4 bg-white text-black hover:bg-zinc-200">
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
