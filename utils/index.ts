import {
  Group,
  HelpCircle,
  Home,
  Settings,
  User,
  User2,
  UserCircle,
  Users,
} from "lucide-react";

export const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard"},
  { icon: User, label: "Menejerlar", href: "/dashboard/managers" },
  { icon: User, label: "Adminstratorlar", href: "/dashboard/admins" },
  { icon: Users, label: "O'quvchilar", href: "/dashboard/students" },
  { icon: User2, label: "O'qituvchilar", href: "/dashboard/teachers" },
  { icon: Group, label: "Guruhlar", href: "/dashboard/groups" },
  { icon: UserCircle, label: "Profilim", href: "/dashboard/profile" },
];

export const bottomMenuItems = [
  { icon: Settings, label: "Sozlamalar", href: "/settings" },
  { icon: HelpCircle, label: "Yordam", href: "/help" },
];
