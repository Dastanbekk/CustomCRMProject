"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useLoginMutation } from "@/request/mutation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import logo from "@/public/CRM-logo/vector/default-monochrome-white.svg";

const loginSchema = z.object({
  email: z.string().email("Email noto‘g‘ri formatda"),
  password: z
    .string()
    .min(8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak"),
});

type FormDataType = z.infer<typeof loginSchema>;

const Login = () => {
  const { mutate, isPending } = useLoginMutation();

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse(formData);

    if (!parsed.success) {
      setErrorMsg(parsed.error.errors[0]?.message || "Xatolik yuz berdi");
      return;
    }

    setErrorMsg("");
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      <div className="absolute w-[360px] h-[360px] animate-spinGlow rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 blur-3xl opacity-40 z-0"></div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-md p-8 bg-[#1c1c1c]/80 backdrop-blur-md border border-[#2e2e2e] rounded-2xl shadow-xl"
      >
        <div className="flex items-center justify-center">
          <Image src={logo} alt="logo" style={{ maxWidth: "200px" }} />
        </div>
        <h2 className="text-white  font-semibold mt-5 mb-2 text-center">
          Tizimga Kirish
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Emailingiz"
            className="bg-[#2a2a2a] text-white placeholder:text-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="Parolingiz"
            className="bg-[#2a2a2a] text-white placeholder:text-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 bg-red-500/10 rounded px-3 py-1"
            >
              {errorMsg}
            </motion.p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl mt-2 transition-all"
          >
            {isPending ? <Loader2 /> : "Kirish"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
