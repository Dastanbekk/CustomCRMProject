"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      {/* Aylanadigan rangli chiroq border */}
      <div className="absolute w-[360px] h-[360px] animate-spinGlow rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 blur-3xl opacity-40 z-0"></div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-md p-8 bg-[#1c1c1c]/80 backdrop-blur-md border border-[#2e2e2e] rounded-2xl shadow-xl"
      >
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Tizimga Kirish
        </h2>

        <form className="flex flex-col gap-4">
          <Input
            type="email"
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

          <Button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl mt-2 transition-all"
          >
            Kirish
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
