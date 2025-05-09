"use client";
import React, { useState } from "react";
import { AdminsTable } from "@/components/admins/admins-table";

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
import { Button } from "@/components/ui/button";

import { Search } from "lucide-react";
import AdminsDialog from "@/components/admins/admins-dialog";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const AdminsGlobalPage = () => {
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleSearch = () => {
    console.log(searchValue);
  };

  return (
    <div className="pt-10 px-5">
      <h3 className="font-bold text-2xl">Admins</h3>
      <div className="pt-3 flex justify-between gap-2">
        <form onSubmit={handleSubmit} className="flex  gap-[4px]">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Qidirish..."
          />
          <Button onClick={handleSearch} className="cursor-pointer">
            <Search />
          </Button>
        </form>
        <div className="flex items-center gap-3">
          {/* SELECT */}
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="max-w-[180px]">
              <div className="hidden sm:block">
                <SelectValue placeholder="Barchasi" />
              </div>
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
          <AdminsDialog />
        </div>
      </div>
      <div className="rounded-lg overflow-x-scroll w-full max-w-full sm:max-w-[700px] md:max-w-[1000px] lg:max-w-full border bg-card mt-5 text-card-foreground shadow-sm ">
        <AdminsTable />
      </div>
    </div>
  );
};

export default AdminsGlobalPage;
