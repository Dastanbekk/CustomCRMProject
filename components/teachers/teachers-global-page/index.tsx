import React from "react";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import TeacherDialog from "../teachers-dialog-post";
import { TeachersTable } from "../teacher-table";

const TeacherGlobal = () => {
  return (
    <div>
      <div className="pt-10 px-5">
        <h3 className="font-bold text-2xl">Teachers</h3>
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
            <TeacherDialog />
          </div>
        </div>
        <div className="rounded-lg border bg-card mt-5 text-card-foreground shadow-sm overflow-hidden">
          <TeachersTable />
        </div>
      </div>
    </div>
  );
};

export default TeacherGlobal;
