import AdminsGlobalPage from "@/components/admins-global-page";
import { Suspense } from "react";

const Admins = () => {
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <AdminsGlobalPage />
    </Suspense>
  );
};

export default Admins;
