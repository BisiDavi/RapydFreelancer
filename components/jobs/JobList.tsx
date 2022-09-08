import { useQuery } from "@tanstack/react-query";

import JobListCard from "@/components/card/JobListCard";
import Container from "@/components/UI/Container";
import jobsArray from "@/json/jobs.json";
import FilterJob from "@/components/jobs/FilterJob";
import { getJobs } from "@/request";

export default function JobList() {
  const { data, status } = useQuery(["getJobs"], getJobs);

  return (
    <Container className="mb-6 px-6 py-4">
      <FilterJob />
      <div className="jobs w-4/5 bg-white p-4">
        {jobsArray.map((job, index) => {
          const jobArrayLength = Number(jobsArray.length - 1);
          const showBorder = jobArrayLength !== index ? true : false;
          return (
            <JobListCard
              key={job.title}
              content={job}
              showBorder={showBorder}
            />
          );
        })}
      </div>
    </Container>
  );
}
