"use client"
import { usePathname } from "next/navigation";
import React from "react";

const Managers = () => {
  const pathname = usePathname()
  console.log(pathname);
  
  return <div>Managers</div>;
};

export default Managers;
