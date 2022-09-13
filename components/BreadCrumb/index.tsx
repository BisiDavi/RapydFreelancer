import Link from "next/link";

interface Props {
  title: string;
}

interface BreadCrumbItemProps {
  link: string;
  title: string;
}

function BreadCrumbItem({ title, link }: BreadCrumbItemProps) {
  return (
    <li className="flex items-center">
      <Link href={link} passHref>
        <a className="hover:underline">{title}</a>
      </Link>
      <span className="mx-1">﹥</span>
    </li>
  );
}

export default function Breadcrumb({ title }: Props) {
  return (
    <ul className="flex items-center mx-auto justify-center lg:mx-0 lg:justify-start text-xs lg:text-xl  font-thin my-2">
      <BreadCrumbItem title="RapydFreelancer" link="/" />
      <BreadCrumbItem title="Jobs" link="/jobs" />
      <li>{title}</li>
    </ul>
  );
}
