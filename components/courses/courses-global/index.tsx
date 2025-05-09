import React from "react";
import { Input } from "../../ui/input";
import GroupsDialog from "@/components/groups/groups-dialog";
import CoursesTable from "../courses-table/idnex";
import CoursesDialog from "../courses-dialog";

const CourseGlobal = () => {
  return (
    <div>
      <div className="pt-10 px-5">
        <h3 className="font-bold text-2xl">Kurslar</h3>
        <div className="pt-3 flex justify-between">
          <Input className="max-w-[20%]" placeholder="Qidirish..." />{" "}
          <div className="flex items-center gap-3">
            <CoursesDialog />
          </div>
        </div>
        <div className="mt-5" >
          <CoursesTable />
        </div>
      </div>
    </div>
  );
};

export default CourseGlobal;
