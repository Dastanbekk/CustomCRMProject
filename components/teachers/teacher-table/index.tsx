"use client";

import { useState } from "react";
import { Loader, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
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
  useDeleteTeachers,
  useGetTeachersMutation,
  useReturnToWorkTeacher,
} from "@/request/mutation";
import { TeacherType, UserType } from "@/@types";
import toast from "react-hot-toast";
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
import Link from "next/link";

export function TeachersTable() {
  const [viewDialog, setViewDialog] = useState(false);
  const [viewId, setViewId] = useState("");
  const { data: usersData, isPending } = useGetTeachersMutation();
  const users = usersData;
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const loggedUser: UserType = userCookie ? JSON.parse(userCookie) : null;
  const { mutate: returnToWork } = useReturnToWorkTeacher();
  const { mutate: deleteTeachers } = useDeleteTeachers();
  return (
    <div className=" min-w-[350px]   max-w-[600px] sm:max-w-full sm:w-full overflow-auto overflow-x-scroll">
      <Table className="min-w-[1000px] ">
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="w-[40px] ml-2">№</TableHead>
            <TableHead className="min-w-[180px]">Full Name</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[120px]">Yo'nalish</TableHead>
            <TableHead className="min-w-[150px]">CreatedAt</TableHead>
            <TableHead className="min-w-[150px]">Email</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isPending ? (
          ""
        ) : (
          <TableBody>
            {users?.map((user: TeacherType, idx: number) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="pl-2">{idx + 1}</div>
                </TableCell>
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
                        @{user.last_name}
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
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                  >
                    <span
                      className={`${
                        user.status === "faol" ? "bg-green-700" : "bg-red-500"
                      } mr-1.5 h-1.5 w-1.5 rounded-full inline-block`}
                    ></span>
                    {user.status === "faol" ? "Faol" : user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.field}</TableCell>
                <TableCell>{user.createdAt?.slice(0, 10)}</TableCell>

                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 p-0 flex items-center justify-center">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user?.status?.toLowerCase() == "faol" ? (
                        <DropdownMenuItem
                          onClick={() => {
                            console.log({ _id: user?._id });
                            loggedUser?.role !== "manager"
                              ? toast.error("Sizga ruxsat berilmagan!")
                              : deleteTeachers({ _id: user?._id });
                          }}
                          className="text-red-500 cursor-pointer"
                        >
                          Delete
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() =>
                            loggedUser.role.toLowerCase() == "teacher"
                              ? toast.error("Sizga ruxsat berilmagan")
                              : returnToWork({ _id: user?._id })
                          }
                        >
                          Ishga qaytarish
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
          (value: TeacherType) =>
            value?._id === viewId && (
              <DialogContent key={value._id} className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex justify-center gap-1">
                    Teacher profile
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                  <Avatar className="cursor-pointer min-w-[50px] min-h-[50px] max-w-[150px] w-full h-full max-h-[150px]">
                    <AvatarImage
                      src={value.image || "/placeholder.svg"}
                      alt={value.first_name}
                    />
                    <AvatarFallback>
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
                      Email
                    </Label>
                    <Input
                      id="email"
                      disabled={true}
                      defaultValue={value?.email}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className=" items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Lavozimi
                      </Label>
                      <Input
                        className="mt-2"
                        id="status"
                        disabled={true}
                        defaultValue={value?.field}
                      />
                    </div>
                    <div className=" items-center gap-4">
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
                </div>
                <DialogFooter>
                  <Link href={`/dashboard/teachers/${value._id}`}>
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
