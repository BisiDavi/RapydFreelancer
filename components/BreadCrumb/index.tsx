import Link from "next/link";

interface Props {
  title: string;
  skill: string;
}

export default function Breadcrumb({ title, skill }: Props) {
  return (
    <ul className="flex items-center font-thin my-2">
      <li className="hover:underline">
        <Link href="/" passHref>
          <a>RapydFreelancer</a>
        </Link>
      </li>
      <span className="mx-1">﹥</span>
      <li className="hover:underline">
        <Link href="/jobs" passHref>
          <a>Jobs</a>
        </Link>
      </li>
      <span className="mx-1">﹥</span>
      <li className="">{skill}</li>
      <span className="mx-1">﹥</span>
      <li>{title}</li>
    </ul>
  );
}
