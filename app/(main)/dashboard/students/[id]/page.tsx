import StudentInfo from "@/components/students/student-info";

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
  return <StudentInfo studentId={id} />;
}

