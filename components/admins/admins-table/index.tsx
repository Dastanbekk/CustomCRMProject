"use client";

import { useEffect, useState } from "react";
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
  useDeleteAdminsMutation,
  useEditAdminsMutation,
  useGetAdminsMutation,
  useLeaveExitStaff,
  useReturnToWork,
} from "@/request/mutation";
import { ManagersType, UserType } from "@/@types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import AdminsStaffDialog from "../admins-staff-dialog";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export function AdminsTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [id, setId] = useState("");
  const [viewId, setViewId] = useState("");

  const { data: usersData, isPending } = useGetAdminsMutation();
  const users = usersData;
  const { mutate: editAdmin, isPending: isEditing } = useEditAdminsMutation();
  const { mutate: deleteAdmin } = useDeleteAdminsMutation();
  const { mutate: exitStaff } = useLeaveExitStaff();
  const { mutate: returnToWork } = useReturnToWork();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const loggedUser: UserType = userCookie ? JSON.parse(userCookie) : null;
  const [formData, setFormData] = useState({
    _id: "",
    email: "",
    status: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    const currentStatus = searchParams.get("status");
    setValue(currentStatus || "barchasi");
  }, [searchParams]);

  return (
    <div className=" overflow-x-scroll max-w-[470px] sm:max-w-[720px] md:max-w-[1000px] lg:max-w-full">
      <Table>
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="w-[40px]">№</TableHead>
            <TableHead className="min-w-[180px]">Full Name</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[120px]">Role</TableHead>
            <TableHead className="min-w-[150px]">CreatedAt</TableHead>
            <TableHead className="min-w-[100px]">Reason</TableHead>
            <TableHead className="min-w-[150px]">Email</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isPending ? (
          ""
        ) : (
          <TableBody>
            {users?.map((user: ManagersType, idx: number) =>
              "barchasi" === value ? (
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
                      {user.status === "faol" ? "Faol" : user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.createdAt?.slice(0, 10)}</TableCell>
                  <TableCell>
                    {user.status?.toLowerCase() == "faol"
                      ? ""
                      : user?.leave_history[user?.leave_history.length - 1]
                          ?.reason}
                  </TableCell>

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
                        <DropdownMenuItem
                          className="w-full cursor-pointer"
                          onClick={() => {
                            loggedUser?.role?.toLowerCase() !== "manager"
                              ? toast.error("Sizga ruxsat berilmagan!")
                              : setDialogOpen(!dialogOpen);
                            setId(user._id);
                            setFormData({
                              _id: user._id,
                              email: user.email,
                              status: user.status as string,
                              first_name: user.first_name,
                              last_name: user.last_name,
                            });
                          }}
                        >
                          Edit user
                        </DropdownMenuItem>
                        {user.active == false ? (
                          <DropdownMenuItem
                            onClick={() =>
                              loggedUser.role.toLowerCase() !== "manager"
                                ? toast.error("Sizga ruxsat berilmagan")
                                : exitStaff({ _id: user?._id })
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
                                : deleteAdmin(user);
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
                            Ishga qaytarish
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ) : (
                user?.status == value && (
                  <TableRow key={user._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
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
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}
                      >
                        <span
                          className={`${
                            user.status === "faol"
                              ? "bg-green-700"
                              : "bg-red-500"
                          } mr-1.5 h-1.5 w-1.5 rounded-full inline-block`}
                        ></span>
                        {user.status === "faol" ? "Faol" : user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.createdAt?.slice(0, 10)}</TableCell>
                    <TableCell>
                      {
                        user?.leave_history[user?.leave_history.length - 1]
                          ?.reason
                      }
                    </TableCell>

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
                          <DropdownMenuItem
                            className="w-full cursor-pointer"
                            onClick={() => {
                              loggedUser?.role?.toLowerCase() !== "manager"
                                ? toast.error("Sizga ruxsat berilmagan!")
                                : setDialogOpen(!dialogOpen);
                              setId(user._id);
                              setFormData({
                                _id: user._id,
                                email: user.email,
                                status: user.status as string,
                                first_name: user.first_name,
                                last_name: user.last_name,
                              });
                            }}
                          >
                            Edit user
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AdminsStaffDialog prop={user._id} />
                          <DropdownMenuSeparator />
                          {user?.status?.toLowerCase() == "faol" ? (
                            <DropdownMenuItem
                              onClick={() => {
                                loggedUser?.role !== "manager"
                                  ? toast.error("Sizga ruxsat berilmagan!")
                                  : deleteAdmin(user);
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
                              Ishga qaytarish
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
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
      {/* Edit Profile Dialog */}
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        {users?.map(
          (value: ManagersType) =>
            value?._id === id && (
              <DialogContent key={value._id} className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          first_name: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          last_name: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Statusni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="faol">Faol</SelectItem>
                          <SelectItem value="ishdan bo'shatilgan">
                            Ishdan boshatish
                          </SelectItem>
                          <SelectItem value="ta'tilda">
                            Ta'tilga chiqarish
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => {
                      setDialogOpen(!dialogOpen);
                      editAdmin({
                        ...formData,
                      });
                    }}
                  >
                    {isEditing ? "Saqlanmoqda..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            )
        )}
      </Dialog>

      {/* View Profile Dialog */}
      <Dialog open={viewDialog} onOpenChange={() => setViewDialog(false)}>
        {users?.map(
          (value: ManagersType) =>
            value?._id === viewId && (
              <DialogContent key={value._id} className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex justify-center gap-1">
                    <span className="capitalize">{value?.role}</span> profile
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
                        defaultValue={value?.role}
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
