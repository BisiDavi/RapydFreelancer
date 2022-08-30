import Link from "next/link";

export default function Logo() {
  return (
    <div className="bg-blue-500 px-4 py-2">
      <Link href="/">
        <a className="font-bold text-white text-2xl">
          Rapyd <span className="italic -ml-2 text-blue-300">Freelancers</span>
        </a>
      </Link>
    </div>
  );
}
