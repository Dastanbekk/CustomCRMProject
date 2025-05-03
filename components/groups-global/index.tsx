import React from "react";
import { Input } from "../ui/input";
import GroupsDialog from "../groups-dialog";
import { GroupsTable } from "../groups-table";

const GroupsGlobal = () => {
  return (
    <div>
      <div className="pt-10 px-5">
        <h3 className="font-bold text-2xl">Guruhlar</h3>
        <div className="pt-3 flex justify-between">
          <Input className="max-w-[20%]" placeholder="Qidirish..." />{" "}
          <div className="flex items-center gap-3">
            <GroupsDialog />
          </div>
        </div>
        <div className="rounded-lg border bg-card mt-5 text-card-foreground shadow-sm overflow-hidden">
          <GroupsTable />
        </div>
      </div>
    </div>
  );
};

export default GroupsGlobal;
