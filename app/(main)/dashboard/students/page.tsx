import StudentsGlobal from "@/components/students/students-global";
import React, { Suspense } from "react";

const Students = () => {
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <StudentsGlobal />
    </Suspense>
  );
};

export default Students;
