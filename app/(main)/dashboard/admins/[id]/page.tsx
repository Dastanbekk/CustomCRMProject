import AdminsInfo from "@/components/admins/admin-info";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminsInfo adminsId={id} />;
}
