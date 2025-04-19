import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {z} from "zod"


const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-[20%] gap-3">
        <p className="text-center">Login</p>
        <form>
          <Input  className="mt-3" type="email" placeholder="Emailingizni kiriting" />
          <Input  className="mt-3" type="password" placeholder="*******" />
          <Button className="mt-3 w-full">Kirish</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
