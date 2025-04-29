"use client";
import React, { useState } from "react";
import { AdminsTable } from "@/components/admins-table";

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
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Admins = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (newValue: string) => {
    setValue(newValue);

    const params = new URLSearchParams(searchParams.toString());
    if (newValue === "barchasi") {
      params.delete("status");
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl);
    } else {
      params.set("status", newValue);
      router.replace(`${pathname}?${params.toString()}`);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="pt-10 px-5">
      <h3 className="font-bold text-2xl">Admins</h3>
      <div className="pt-3 flex justify-between">
        <Input className="max-w-[20%]" placeholder="Qidirish..." />{" "}
        <div className="flex items-center gap-3">
          {/* SELECT */}
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Barchasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Faolik</SelectLabel>
                <SelectItem value="barchasi">Barchasi</SelectItem>
                <SelectItem value="faol">Faol</SelectItem>
                <SelectItem value="ta'tilda">Nofaol</SelectItem>
                <SelectItem value="ishdan bo'shatilgan">
                  Ishdan ketgan
                </SelectItem>
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
                  role Bottom
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
