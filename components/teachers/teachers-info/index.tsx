"use client";

import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetGroupsTeacherWithId } from "@/request/mutation";
import { StudentsType, TeacherType } from "@/@types";
import { Button } from "@/components/ui/button";

export default function TeachersInfo({ teachersId }: { teachersId: string }) {
  const { data } = useGetGroupsTeacherWithId(teachersId);
  const userData = data as TeacherType;
  console.log(data);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-r shrink-0">
        <div className="p-4 flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-20 w-20">
              {/* <AvatarImage src={userData?.image} alt="User" /> */}
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
            <h3 className="text-sm font-medium mb-2">Yonalish:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{userData?.field}</Badge>
            </div>
            <h3 className="text-sm font-medium mb-2">Tel raqam:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{userData?.phone}</Badge>
            </div>
            <h3 className="text-sm font-medium mb-2">Email:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{userData?.email}</Badge>
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
      <div className="w-full">
        <div className="flex-1 overflow-auto">
          <div className="flex justify-between items-center p-4 md:p-6">
            <h1 className="text-2xl font-bold">Guruhlari</h1>
          </div>
          {/* Main Content */}

          <div className="px-4 md:px-6 pb-6">
            <Tabs defaultValue="uncompleted">
              <TabsContent value="uncompleted" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b text-xs uppercase text-muted-foreground">
                            <th className="px-4 py-3 text-left">Guruh nomi</th>
                            <th className="px-4 py-3 text-left">
                              Boshlanish vaqti
                            </th>
                            <th className="px-4 py-3 text-left">
                              Tugash vaqti
                            </th>
                            <th className="px-4 py-3 text-left">O'quvchilar</th>
                            <th className="px-4 py-3 text-left">Maoshi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData?.groups?.map((group) => (
                            <tr key={group._id} className="border-b">
                              <td className="px-4 py-3">
                                <div>
                                  <div className="font-medium">
                                    {group.name}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                {group.started_group?.slice(0, 10)}
                              </td>
                              <td className="px-4 py-3">
                                {group?.end_group?.slice(0, 10)}
                              </td>
                              <td className="px-4 py-3">
                                <Button className="cursor-pointer">
                                  {group?.students?.length}
                                </Button>
                              </td>
                              <td className="px-4 py-3">{group.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {userData?.groups?.map((group, idx) => (
            <div key={idx} className="flex-1 overflow-auto">
              <div className="flex justify-between items-center p-4 md:p-6">
                <h1 className="text-2xl font-bold">{group.name}</h1>
              </div>

              <div className="px-4 md:px-6 pb-6">
                <Tabs defaultValue="uncompleted">
                  <TabsContent value="uncompleted" className="space-y-4">
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b text-xs uppercase text-muted-foreground">
                                <th className="px-4 py-3 text-left">
                                  Student ismi
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Familiyasi
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Qoshilgan vaqti
                                </th>
                                <th className="px-4 py-3 text-left">
                                  Tel raqami
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.students?.map((student: StudentsType) => (
                                <tr key={student._id} className="border-b">
                                  <td className="px-4 py-3">
                                    {student.first_name}
                                  </td>
                                  <td className="px-4 py-3">
                                    {student.last_name}
                                  </td>
                                  <td className="px-4 py-3">
                                    {student.createdAt?.slice(0, 10)}
                                  </td>
                                  <td className="px-4 py-3">{student.phone}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
