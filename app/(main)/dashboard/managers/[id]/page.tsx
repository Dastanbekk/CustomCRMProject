import ManagersInfo from "@/components/managers/managers-info";

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
  return <ManagersInfo managerId={id} />;
}