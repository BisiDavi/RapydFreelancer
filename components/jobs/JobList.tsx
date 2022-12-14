import { useQuery } from "@tanstack/react-query";

import JobListCard from "@/components/card/JobListCard";
import Container from "@/components/UI/Container";
import { getJobs } from "@/request/getRequest";
import JobListLoader from "@/components/loader/JobListLoader";

export default function JobList() {
  const { data, status } = useQuery(["getJobs"], getJobs);

  const activeJobs =
    status === "success"
      ? data?.data.filter((item: { active: boolean }) => item.active)
      : [];

  return (
    <Container className="mb-6 px-6 flex-col flex py-4">
      <div className="jobs rounded-xl bg-white p-4">
        {status === "error" ? (
          "error"
        ) : status === "loading" ? (
          <JobListLoader />
        ) : (
          activeJobs.map((job: any, index: number) => {
            const jobArrayLength = Number(data?.data.length - 1);
            const showBorder = jobArrayLength !== index ? true : false;
            return (
              <JobListCard
                key={job.title}
                content={job}
                showBorder={showBorder}
              />
            );
          })
        )}
      </div>
    </Container>
  );
}
