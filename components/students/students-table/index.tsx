"use client";

import { useState } from "react";
import { Loader, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  useDeleteStudent,
  useGetAllStudents,
  useReturnStaffStudentMutation,
  useReturnStudentMutation,
} from "@/request/mutation";
import { StudentsType, UserType } from "@/@types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import AdminsStaffDialog from "../../admins/admins-staff-dialog";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import Link from "next/link";

export function StudentsTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [viewId, setViewId] = useState("");

  const { data: usersData, isPending } = useGetAllStudents();
  const users = usersData;
  const { mutate: deleteAdmin } = useDeleteStudent();
  const { mutate: exitStaff } = useReturnStaffStudentMutation();
  const { mutate: returnToWork } = useReturnStudentMutation();
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const loggedUser: UserType = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div className=" overflow-x-scroll max-w-[470px] sm:max-w-[720px] md:max-w-[1000px] lg:max-w-full">
      <Table>
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="w-[40px]">№</TableHead>
            <TableHead className="min-w-[180px]">Full Name</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[100px]">Reason</TableHead>
            <TableHead className="min-w-[120px]">Phone</TableHead>
            <TableHead className="min-w-[150px]">CreatedAt</TableHead>
            <TableHead className="min-w-[100px]">Group</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isPending ? (
          ""
        ) : (
          <TableBody>
            {users?.map((user: StudentsType, idx: number) => (
              <TableRow key={user._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      onClick={() => {
                        setViewDialog(!viewDialog);
                        setViewId(user._id);
                      }}
                      className="cursor-pointer"
                    >
                      <AvatarImage
                        src={user.image || "/placeholder.svg"}
                        alt={user.first_name}
                      />
                      <AvatarFallback>
                        {user.first_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.first_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.last_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      user.status === "faol"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : user.status === "ta'tilda"
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                  >
                    <span
                      className={`${
                        user.status === "faol"
                          ? "bg-green-700"
                          : user.status == "ta'tilda"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } mr-1.5 h-1.5 w-1.5 rounded-full inline-block`}
                    ></span>
                    {user.status === "faol" ? (
                      "Faol"
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-end cursor-pointer gap-1">
                              <p className="text-end text-[12px] capitalize">
                                {user?.status}
                              </p>
                            </div>
                          </TooltipTrigger>
                          {user.status?.toLowerCase() == "ta'tilda" && (
                            <TooltipContent>
                              <p>
                                {
                                  user?.leave_history[
                                    user.leave_history.length - 1
                                  ]?.days
                                }{" "}
                                kun
                              </p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">
                  {user.status?.toLowerCase() == "ta'tilda" &&
                    user?.leave_history[user.leave_history.length - 1]?.reason}
                </TableCell>
                <TableCell>
                  {user.phone?.charAt(0) == "+" ? "" : "+"}
                  {user.phone}
                </TableCell>
                <TableCell>{user.createdAt?.slice(0, 10)}</TableCell>
                <TableCell>{user?.groups[0]?.group.name}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 p-0 flex items-center justify-center">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.status?.toLowerCase() == "ta'tilda" ? (
                        <DropdownMenuItem
                          onClick={() =>
                            loggedUser.role.toLowerCase() !== "manager"
                              ? toast.error("Sizga ruxsat berilmagan")
                              : exitStaff({ student_id: user?._id })
                          }
                        >
                          Faollashtirish
                        </DropdownMenuItem>
                      ) : (
                        <AdminsStaffDialog prop={user._id} />
                      )}
                      <DropdownMenuSeparator />
                      {user?.status?.toLowerCase() == "faol" ? (
                        <DropdownMenuItem
                          onClick={() => {
                            loggedUser?.role !== "manager"
                              ? toast.error("Sizga ruxsat berilmagan!")
                              : deleteAdmin({ _id: user?._id });
                            console.log({ _id: user?._id });
                          }}
                          className="text-red-500 cursor-pointer"
                        >
                          Delete
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() =>
                            loggedUser.role.toLowerCase() !== "manager"
                              ? toast.error("Sizga ruxsat berilmagan")
                              : returnToWork({ _id: user?._id })
                          }
                        >
                          Tizimga qaytarish
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {isPending ? (
        <div className="flex items-center justify-center w-full h-[80vh] text-center">
          <Loader className="animate-spin flex justify-center text-center" />
        </div>
      ) : (
        ""
      )}

      {/* View Profile Dialog */}
      <Dialog open={viewDialog} onOpenChange={() => setViewDialog(false)}>
        {users?.map(
          (value: StudentsType) =>
            value?._id === viewId && (
              <DialogContent key={value._id} className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex justify-center gap-1">
                    <span className="capitalize">{value?.role}</span> profile
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                  <Avatar className="cursor-pointer justify-center min-w-[50px] min-h-[50px] max-w-[150px] w-full h-full max-h-[150px]">
                    <AvatarImage
                      src={value.image || "/placeholder.svg"}
                      alt={value.first_name}
                    />
                    <AvatarFallback className="flex items-center justify-center w-20 h-20">
                      {value.first_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Ismi
                    </Label>
                    <Input
                      disabled={true}
                      id="name"
                      defaultValue={value?.first_name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Familyasi
                    </Label>
                    <Input
                      id="username"
                      disabled={true}
                      defaultValue={value?.last_name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Raqam
                    </Label>
                    <Input
                      id="email"
                      disabled={true}
                      defaultValue={value?.phone}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Input
                      className="mt-2"
                      id="status"
                      disabled={true}
                      defaultValue={value?.status}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Link href={`/dashboard/students/${value._id}`}>
                    <Button>Profiliga o'tish</Button>
                  </Link>
                  <Button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => {
                      setViewDialog(!viewDialog);
                    }}
                  >
                    Chiqish
                  </Button>
                </DialogFooter>
              </DialogContent>
            )
        )}
      </Dialog>
    </div>
  );
}
