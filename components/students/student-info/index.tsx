"use client";

import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetStudentWithId,
  useGetTeachersMutation,
  useShowAllPaymentsStudent,
} from "@/request/mutation";
import { ManagersType, StudentsType, TeacherType } from "@/@types";
import { Button } from "@/components/ui/button";

export default function StudentInfo({ studentId }: { studentId: string }) {
  const { data } = useGetStudentWithId(studentId);
  const { data: TeacherData } = useGetTeachersMutation();
  const { data: PaymentsData, mutate: PaymentsMutate } =
    useShowAllPaymentsStudent();
  const userData = data as StudentsType;
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-r shrink-0">
        <div className="p-4 flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt="User"
              />
              <AvatarFallback>
                {userData?.first_name?.charAt(0)}
                {userData?.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <h2 className="mt-4 text-xl font-semibold">
            {userData?.first_name} {userData?.last_name}
          </h2>
          <div className="w-full mt-6">
            <h3 className="text-sm font-medium mb-2">Telefon raqami</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">
                {userData?.phone?.charAt(0) !== "+" ? "+" : ""}{" "}
                {userData?.phone}
              </Badge>
            </div>

            <h3 className="text-sm font-medium mb-2">Status</h3>
            <Badge variant="outline" className="mb-4">
              {userData?.status}
            </Badge>

            <h3 className="text-sm font-medium mb-2">
              Tizimga qoshilgan vaqti
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                {userData?.createdAt?.slice(0, 10)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="flex-1 overflow-auto">
          <div className="flex justify-between items-center p-4 md:p-6">
            <h1 className="text-2xl font-bold">Groups</h1>
            <Button onClick={() => PaymentsMutate({ student_id: studentId })}>
              CLick here
            </Button>
          </div>

          <div className="px-4 md:px-6 pb-6">
            <Tabs defaultValue="uncompleted">
              <TabsList className="mb-4">
                <TabsTrigger value="uncompleted">Tugallanmagan</TabsTrigger>
                <TabsTrigger value="completed">Tugallangan</TabsTrigger>
              </TabsList>

              <TabsContent value="uncompleted" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b text-xs uppercase text-muted-foreground">
                            <th className="px-4 py-3 text-left">Guruh nomi</th>
                            <th className="px-4 py-3 text-left">Teacher</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">
                              Qo'shilgan vaqti:
                            </th>
                            <th className="px-4 py-3 text-left">Kurs narxi:</th>
                            {/* <th className="px-4 py-3 text-left">Tolovlari</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {userData?.groups?.map((group) =>
                            group?.status == "aktiv" ? (
                              <tr key={group.group._id} className="border-b">
                                <td className="px-4 py-3">
                                  <div>
                                    <div className="font-medium">
                                      {group?.group?.name}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-medium">
                                    {TeacherData?.map((teacher: TeacherType) =>
                                      group?.group.teacher === teacher._id
                                        ? teacher.first_name
                                        : ""
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  {group?.status}

                                  <div className="text-xs text-muted-foreground">
                                    {/* {lesson.points} */}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  {group?.joinedAt?.slice(0, 10)}
                                </td>
                                <td className="px-4 py-3">
                                  {group?.group?.price}
                                </td>
                                {/* <td className="px-4 py-3">
                                  {group?.payments?.map((value, idx) => (
                                    <p key={idx}>{value}</p>
                                  ))}
                                </td> */}
                              </tr>
                            ) : (
                              ""
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b text-xs uppercase text-muted-foreground">
                            <th className="px-4 py-3 text-left">Guruh nomi</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">
                              Qo'shilgan vaqti:
                            </th>
                            <th className="px-4 py-3 text-left">
                              Chiqarilgan vaqti:
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData?.groups?.map((group, idx) =>
                            group?.status !== "aktiv" ? (
                              <tr key={group.group._id} className="border-b">
                                <td className="px-4 py-3">
                                  <div>
                                    <div className="font-medium">
                                      {group?.group?.name}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">{group?.status}</td>
                                <td className="px-4 py-3">
                                  {group?.joinedAt?.slice(0, 10)}
                                </td>
                                <td className="px-4 py-3">
                                  {group?.exitedAt?.slice(0, 10)}
                                </td>
                              </tr>
                            ) : (
                              ""
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
