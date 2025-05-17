import {
  BookOpenText,
  CircleDollarSign,
  GraduationCap,
  Group,
  Home,
  Settings,
  ShieldUser,
  User,
  UserCircle,
  Users,
} from "lucide-react";

export const menuItems = [
  { icon: Home, label: "Asosiy", href: "/dashboard" },
  { icon: User, label: "Menejerlar", href: "/dashboard/managers" },
  { icon: ShieldUser, label: "Adminstratorlar", href: "/dashboard/admins" },
  { icon: Users, label: "O'qituvchilar", href: "/dashboard/teachers" },
  { icon: GraduationCap, label: "O'quvchilar", href: "/dashboard/students" },
  { icon: Group, label: "Guruhlar", href: "/dashboard/groups" },
  { icon: BookOpenText, label: "Kurslar", href: "/dashboard/course" },
  { icon: CircleDollarSign, label: "Tolovlar", href: "/dashboard/payments" },
  { icon: UserCircle, label: "Profilim", href: "/dashboard/profile" },
];

export const bottomMenuItems = [
  { icon: Settings, label: "Sozlamalar", href: "/dashboard/settings" },
];
