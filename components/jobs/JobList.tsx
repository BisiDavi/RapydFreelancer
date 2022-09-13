import { useQuery } from "@tanstack/react-query";

import JobListCard from "@/components/card/JobListCard";
import Container from "@/components/UI/Container";
import { getJobs } from "@/request/getRequest";
import JobListLoader from "@/components/loader/JobListLoader";
import useAuth from "@/hooks/useAuth";

export default function JobList() {
  const { data, status } = useQuery(["getJobs"], getJobs);
  const { authDetails } = useAuth();
  const auth = authDetails();

  return (
    <Container className="mb-6 px-6 flex-col flex py-4">
      <div className="jobs rounded-xl bg-white p-4">
        {status === "error" ? (
          "error"
        ) : status === "loading" ? (
          <JobListLoader />
        ) : (
          data?.data.map((job: any, index: number) => {
            const jobArrayLength = Number(data?.data.length - 1);
            const showBorder = jobArrayLength !== index ? true : false;
            return (
              <JobListCard
                key={job.title}
                content={job}
                showBorder={showBorder}
                auth={auth}
              />
            );
          })
        )}
      </div>
    </Container>
  );
}
