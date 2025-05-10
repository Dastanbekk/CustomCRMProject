"use client";

import { useState } from "react";
import { Loader, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDeleteGroups,
  useEditGroupPrice,
  useGetAllGroups,
} from "@/request/mutation";
import { GroupsType, TeacherType, UserType } from "@/@types";
import toast from "react-hot-toast";
export function GroupsTable() {
  const [price, setPrice] = useState({
    group_id: "",
    price: "",
  });
  const [viewDialog, setViewDialog] = useState(false);
  const [viewId, setViewId] = useState<Number>();
  const { data: usersData, isPending } = useGetAllGroups();
  const { mutate: deleteGroup } = useDeleteGroups();
  const { mutate: EditPriceMutate } = useEditGroupPrice();
  const users = usersData;
  const cookie = Cookies;
  const userCookie = cookie.get("user");
  const loggedUser: UserType = userCookie ? JSON.parse(userCookie) : null;
  return (
    <div className=" min-w-[350px]   max-w-[600px] sm:max-w-full sm:w-full overflow-auto overflow-x-scroll">
      <Table className="min-w-[1000px] ">
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="w-[40px] ml-2"></TableHead>
            <TableHead className="min-w-[180px]">Guruh nomi</TableHead>
            <TableHead className="min-w-[120px]">Ustoz</TableHead>
            <TableHead className="min-w-[120px]">Narxi</TableHead>
            <TableHead className="min-w-[150px]">Yaratilgan kun</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isPending ? (
          ""
        ) : (
          <TableBody>
            {users?.map((user: GroupsType, idx: number) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="pl-2">{idx + 1}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      onClick={() => {
                        setViewDialog(!viewDialog);
                        setViewId(idx);
                      }}
                      className="cursor-pointer"
                    >
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>
                      {(user.teacher as unknown as TeacherType)?.first_name}
                    </span>
                    <span>
                      {(user.teacher as unknown as TeacherType)?.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user.price}</TableCell>
                <TableCell>{user.started_group?.slice(0, 10)}</TableCell>
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
                        onClick={() => {
                          loggedUser?.role !== "manager"
                            ? toast.error("Sizga ruxsat berilmagan!")
                            : deleteGroup({ _id: user._id });
                        }}
                        className="text-red-500 cursor-pointer"
                      >
                        Delete
                      </DropdownMenuItem>
                      {/* <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() =>
                              setPrice({ ...price, group_id: user._id })
                            }
                            variant="ghost"
                          >
                            Narxini o'zgartirish
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Narxini o'zgartish</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Narxi:
                              </Label>
                              <Input
                                id="name"
                                onChange={(e) =>
                                  setPrice({ ...price, price: e.target.value })
                                }
                                defaultValue={user.price}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogTrigger>
                              <Button
                                type="submit"
                                onClick={() => EditPriceMutate(price)}
                              >
                                O'zgartirish
                              </Button>
                            </DialogTrigger>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog> */}
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
    </div>
  );
}
