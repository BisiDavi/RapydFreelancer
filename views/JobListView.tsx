import JobListCard from "@/components/card/JobListCard";
import Container from "@/components/UI/Container";
import jobsArray from "@/json/jobs.json";

export default function JobListView() {
  return (
    <Container className="flex-col mb-6">
      {jobsArray.map((job) => (
        <JobListCard key={job.title} content={job} />
      ))}
    </Container>
  );
}
