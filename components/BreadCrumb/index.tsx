import Link from "next/link";

interface Props {
  title: string;
}

export default function Breadcrumb({ title }: Props) {
  return (
    <ul className="flex items-center mx-auto justify-center lg:mx-0 lg:justify-start text-xs  font-thin my-2">
      <li className="hover:underline flex items-center">
        <Link href="/" passHref>
          <a>RapydFreelancer</a>
        </Link>
        <span className="mx-1">﹥</span>
      </li>
      <li className="hover:underline flex items-center">
        <Link href="/jobs" passHref>
          <a>Jobs</a>
        </Link>
        <span className="mx-1">﹥</span>
      </li>
      <li>{title}</li>
    </ul>
  );
}
