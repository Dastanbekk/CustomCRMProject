import TeachersInfo from "@/components/teachers/teachers-info";

export default async function TeachersInfoWithId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TeachersInfo teachersId={id} />;
}