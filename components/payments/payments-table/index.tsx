"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function PaymentsTable() {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={"/placeholder.svg"} alt="placeholder" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Kimdur</div>
                  <div className="text-sm text-muted-foreground">Sindurov</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="capitalize">Faol</p>
            </TableCell>
            <TableCell>+998973560109</TableCell>
            <TableCell>01.20.2025</TableCell>
            <TableCell>01.20.2026</TableCell>

            {/* <TableCell>
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
                        <StudentStaffDialog prop={user._id} />
                      )}
                      <DropdownMenuSeparator />
                      <StudentAddTheGroup prop={user._id} />
                      <DropdownMenuSeparator />
                      {user?.status?.toLowerCase() == "faol" ? (
                        <DropdownMenuItem
                          onClick={() => {
                            loggedUser?.role !== "manager"
                              ? toast.error("Sizga ruxsat berilmagan!")
                              : deleteAdmin({ _id: user?._id });
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
            </TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
      {/* {isPending ? (
        <div className="flex items-center justify-center w-full h-[80vh] text-center">
          <Loader className="animate-spin flex justify-center text-center" />
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}
