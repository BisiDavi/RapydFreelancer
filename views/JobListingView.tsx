import Button from "@/components/UI/Button";
import JobListingSidebar from "@/components/sidebar/JobListingSidebar";
import type { jobType } from "@/types";
import toSlug from "@/lib/toSlug";

interface Props {
  job: jobType;
}

export default function JobListingView({ job }: Props) {
  const skillId = toSlug(job.skills[0].label);
  const title = toSlug(job.title);
  console.log("job", job);
  const postedOn = new Date(job.createdAt).toDateString();
  return (
    <div className="content w-full mb-8 mt-4 flex justify-between">
      <div className="details w-3/4 shadow p-4 px-8 bg-white">
        <p className="text-lg my-4">{job.description}</p>
        <ul className="flex items-center my-4">
          <span className="font-bold">Skills:</span>
          {job.skills.map((skill) => (
            <li
              key={skill.value}
              className="mx-2 border border-blue-500 px-2 rounded-md hover:text-white hover:bg-blue-500"
            >
              {skill.label}
            </li>
          ))}
        </ul>
        <p className="text-lg my-2">
          <span className="font-bold mr-1">Posted on:</span> {postedOn}
        </p>
        <hr className="my-4" />
        <div className="view">
          <div className="group flex items-center justify-between">
            <h3 className="text-xl">
              Are you interested in this Job? Offer to work on this job now!
            </h3>
            <Button
              text="Bid on this Job"
              className="bg-red-500 font-bold text-xl text-white py-2 px-6 my-4 hover:opacity-80"
              href={`/bid/${skillId}/${title}?id=${job._id}`}
            />
          </div>
          <p className="text-xl underline mb-1">Tips to win jobs:</p>
          <ul>
            <li>✔ Outline your proposal on this project.</li>
            <li>
              ✔ Base your proposal on the client project and proffer possible
              solution.
            </li>
            <li>
              ✔ Give detailed milestone on how you want to accomplish the
              project.
            </li>
            <li>✔ You can attach documents to buttress your proposal.</li>
            <li>✔ You can always negotiate the Budget up or down.</li>
          </ul>
        </div>
      </div>
      <JobListingSidebar email={job.user.email} title={job.title} />
    </div>
  );
}
