import StudentInfo from "@/components/student-info";
interface Props {
  params: {
    id: string;
  };
}
export default function StudentDetailPage({ params }: Props) {
  const { id } = params;
  return (
    <div>
      <StudentInfo studentId={id} />
    </div>
  );
}
