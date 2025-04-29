"use client";

import { useEffect, useState } from "react";
import { Loader, MoreHorizontal, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
} from "@/request/mutation";
import { ManagersType, UserType } from "@/@types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
} from "../ui/select";

export function AdminsTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id, setId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { data: usersData, mutate, isPending } = useGetAdminsMutation();
  const users = usersData;
  const { mutate: editAdmin, isPending: isEditing } = useEditAdminsMutation();
  const { mutate: deleteAdmin } = useDeleteAdminsMutation();
  console.log(users);

  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const user: UserType = userCookie ? JSON.parse(userCookie) : null;
  const [formData, setFormData] = useState({
    _id: "",
    email: "",
    status: "",
    first_name: "",
    last_name: "",
  });
  useEffect(() => {
    mutate();
  }, []);

  const toggleSelectAll = () => {
    if (!users) return;

    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users?.map((user: ManagersType) => user._id));
    }
  };
  const toggleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };
  return (
    <div className="w-full overflow-auto">
      <Table className="min-w-[1000px] ">
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={
                  isPending
                    ? false
                    : selectedUsers?.length === users?.length &&
                      users?.length > 0
                }
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="min-w-[180px]">Full Name</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[120px]">Role</TableHead>
            <TableHead className="min-w-[150px]">CreatedAt</TableHead>
            <TableHead className="min-w-[100px]">Reason</TableHead>
            <TableHead className="min-w-[150px]">Email</TableHead>
            <TableHead className="min-w-[200px]">Address</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isPending ? (
          ""
        ) : (
          <TableBody>
            {users?.map((user: ManagersType) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user._id)}
                    onCheckedChange={() => toggleSelectUser(user._id)}
                    aria-label={`Select ${user.first_name}`}
                  />
                </TableCell>
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
                        user.status === "faol" ? "bg-green-700" : "bg-red-500"
                      } mr-1.5 h-1.5 w-1.5 rounded-full inline-block`}
                    ></span>
                    {user.status === "faol" ? "Faol" : user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.createdAt?.slice(0, 10)}</TableCell>
                <TableCell>
                  {user?.leave_history[user?.leave_history.length - 1]?.reason}
                </TableCell>

                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
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
                          setDialogOpen(!dialogOpen);
                          setId(user._id);
                          console.log(formData);
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
                      <DropdownMenuItem
                        onClick={() => {
                          deleteAdmin(user);
                        }}
                        className="text-red-500 cursor-pointer"
                      >
                        Delete
                      </DropdownMenuItem>
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
                        setFormData({ ...formData, first_name: e.target.value })
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
                        setFormData({ ...formData, last_name: e.target.value })
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
    </div>
  );
}

// /api/staff/edited-admin
