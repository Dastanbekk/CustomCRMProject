import { useGetGroupsTeacherWithId, useGetGroupTeacher } from "@/request/mutation";
import React from "react";

const StudentsGroup = ({ teacherId }: { teacherId: string }) => {
  const { data } = useGetGroupsTeacherWithId(teacherId);
  console.log(data);
  
  
  return <div>
    {data}
  </div>;
};

export default StudentsGroup;
