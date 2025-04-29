"use client";
import React from "react";
import { AdminsTable } from "@/components/admins-table";
import { DatePickerWithRange } from "@/components/ui/date";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GitPullRequestDraft, Plus } from "lucide-react";
import AdminsDialog from "@/components/admins-dialog";

const Admins = () => {

  return (
    <div className="pt-10 px-5">
      <h3 className="font-bold text-2xl">Admins</h3>
      <div className="pt-3 flex justify-between">
        <Input className="max-w-[20%]" placeholder="Qidirish..." />{" "}
        <div className="flex items-center gap-3">
          {/* SELECT */}
          <Select>
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Faol" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Faol</SelectItem>
                <SelectItem value="banana">Nofaol</SelectItem>
                <SelectItem value="blueberry">Ishdan ketgan</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <GitPullRequestDraft className="rotate-90" /> ko'rish
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <AdminsDialog />
        </div>
      </div>
      <div className="rounded-lg border bg-card mt-5 text-card-foreground shadow-sm overflow-hidden">
        <AdminsTable />
      </div>
    </div>
  );
};

export default Admins;
