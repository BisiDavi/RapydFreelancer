import { useQuery } from "@tanstack/react-query";

import JobListCard from "@/components/card/JobListCard";
import Container from "@/components/UI/Container";
import jobsArray from "@/json/jobs.json";
import { getJobs } from "@/request/getRequest";

export default function JobList() {
  const { data, status } = useQuery(["getJobs"], getJobs);

  return (
    <Container className="mb-6 px-6 py-4">
      <div className="jobs rounded-xl bg-white p-4">
        {status === "error"
          ? "error"
          : status === "loading"
          ? "loading"
          : data?.data.map((job: any, index: number) => {
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
