import Button from "@/components/UI/Button";
import type { jobType } from "@/types";

interface Props {
  job: jobType;
}

export default function JobListingView({ job }: Props) {
  return (
    <div className="content w-full mt-4 flex justify-between">
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
        <hr className="my-4" />
        <div className="view">
          <div className="group flex items-center justify-between">
            <h3 className="text-xl">
              Are you interested in this Job? Offer to work on this job now!
            </h3>
            <Button
              text="Bid on this Job"
              className="bg-red-500 font-bold text-xl text-white py-2 px-6 my-4 hover:opacity-80"
            />
          </div>
          <p className="text-xl underline">Tips to win job:</p>
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
      <aside className="w-1/4 ml-8">
        <Button
          text="Post a project like this"
          href="/post-job"
          className="shadow bg-gray-300 border border-gray-800  w-full flex h-12 py-4 items-center justify-center font-medium text-xl px-4 bg-white hover:bg-gray-200"
        />
      </aside>
    </div>
  );
}
