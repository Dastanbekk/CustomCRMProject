"use client";
import React, { useState } from "react";
import Login from "./(auth)/login/page";
import Dashboard from "./(main)/dashboard/page";
import { useRouter } from "next/navigation";

const Home = () => {
  const [user, setUser] = useState(true);
  const route = useRouter()
  return <>{user ? route.push("/login") : route.push('/dashboard')}</>
};

export default Home;
