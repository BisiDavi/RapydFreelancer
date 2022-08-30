import JobListCard from "@/components/card/JobListCard";
import Container from "@/components/UI/Container";
import jobsArray from "@/json/jobs.json";
import FilterJob from "@/components/Jobs/FilterJob";

export default function JobList() {
  return (
    <Container className="mb-6 px-6 py-4">
      <FilterJob />
      <div className="jobs w-4/5 bg-white p-4">
        {jobsArray.map((job) => (
          <JobListCard key={job.title} content={job} />
        ))}
      </div>
    </Container>
  );
}
