import Container from "@/components/UI/Container";
import JobList from "@/components/jobs/JobList";

export default function JobsView() {
  return (
    <Container className="flex-col bg-gray-200" full>
      <JobList />
    </Container>
  );
}
