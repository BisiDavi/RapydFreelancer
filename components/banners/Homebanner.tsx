import TypewriterEffect from "@/components/UI/Typewriter";
import Image from "next/image";

export default function Homebanner() {
  return (
    <section className="banner justify-between flex items-center px-5  bg-gray-100 w-full">
      <div className="w-1/2">
        <TypewriterEffect />
        <p className="font-light text-lg -mt-4 underline text-gray-600">
          Hire top talent in minutes not weeks
        </p>
        <p className="w-2/3 text-xl font-light mt-4">
          <span className="italic mr-1 font-bold">RapydFreelancer</span>
          is an exclusive network of the top freelance software developers,
          copywriters, product managers, designers, finance experts and data
          scientist in the world. Top companies hire RapydFreelancers for their
          projects.
        </p>
      </div>
      <div className="w-1/2 flex mx-auto justify-center">
        <div className="w-2/3">
          <Image
            src="/freelancer-banner.webp"
            alt="banner"
            height={500}
            width={500}
            layout="responsive"
          />
        </div>
      </div>
    </section>
  );
}
