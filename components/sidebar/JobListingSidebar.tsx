import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import Button from "@/components/UI/Button";
import { getUserJobs } from "@/request/getRequest";
import toSlug from "@/lib/toSlug";

interface Props {
  email: string;
  title: string;
}

export default function JobListingSidebar({ email, title }: Props) {
  const { data, status } = useQuery(["getUserJobs"], () => getUserJobs(email));

  const otherJobs =
    status === "success"
      ? data?.data.filter((item: any) => item.title !== title)
      : [];

  console.log("data", data);

  return (
    <aside className="w-1/4 ml-8">
      <Button
        text="Post a project like this"
        href="/post-job"
        className="shadow bg-gray-300 border border-gray-800  w-full flex h-12 py-4 items-center justify-center font-medium text-xl px-4 bg-white hover:bg-gray-200"
      />
      <div className="ul mt-4 bg-white shadow px-6 py-2">
        <h3 className="font-medium text-lg">Other Job from this Client</h3>
        <hr className="mt-2" />
        {status === "error"
          ? "error"
          : status === "loading"
          ? "loading..."
          : otherJobs.map((item: any) => {
              const id = toSlug(item.title);
              return (
                <li key={item.keydata} className="my-2">
                  <Link
                    href={`/jobs/projects/${item.skills[0].label}/${id}`}
                    passHref
                  >
                    <a>
                      {item.title} (${item.price})
                    </a>
                  </Link>
                </li>
              );
            })}
      </div>
    </aside>
  );
}
