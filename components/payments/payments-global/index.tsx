"use client";
import React from "react";
// import StudentsDialog from "../students-dialog";
import { PaymentsTable } from "../payments-table";
import PaymentMetrics from "../payments-metric";
import { Button } from "@/components/ui/button";
import { PaymentsDialog } from "../payments-dialog";

const PaymentsGlobal = () => {
  return (
    <div className="pt-10 px-5">
      <PaymentMetrics />
      <div className="flex justify-between mt-5 items-center">
        <h3 className="font-bold text-2xl ">To'lovlar</h3>
        <PaymentsDialog />
      </div>
      <div className="rounded-lg overflow-x-scroll w-full max-w-full sm:max-w-[700px] md:max-w-[1000px] lg:max-w-full border bg-card mt-5 text-card-foreground shadow-sm ">
        <PaymentsTable />
      </div>
    </div>
  );
};

export default PaymentsGlobal;
