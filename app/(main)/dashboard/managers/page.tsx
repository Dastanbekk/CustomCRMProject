"use client";
import ManagersDialog from "@/components/managers-dialog";
import { UsersTable } from "@/components/managers-table";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { GitPullRequestDraft } from "lucide-react";
import React from "react";

const Managers = () => {
  return (
    <div className="pt-10 px-5">
      <h3 className="font-bold text-2xl">Managers</h3>
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
          <ManagersDialog />
        </div>
      </div>
      <div className="rounded-lg border bg-card mt-5 text-card-foreground shadow-sm overflow-hidden">
        <UsersTable />
      </div>
    </div>
  );
};

export default Managers;
