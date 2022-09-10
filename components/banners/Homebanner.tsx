import Image from "next/image";

import TypewriterEffect from "@/components/UI/Typewriter";
import RapydLogo from "@/public/RapydLogo";
import Button from "@/components/UI/Button";

export default function Homebanner() {
  return (
    <section className="banner justify-between flex items-center p-5  bg-gray-100 w-full">
      <div className="w-2/3">
        <TypewriterEffect />
        <p className="font-light text-lg -mt-4 underline text-gray-600">
          Hire top talent in minutes not weeks
        </p>
        <p className="w text-xl font-light my-4">
          <span className="italic mr-1 font-bold">RapydFreelancer</span>
          is an exclusive network of the top freelance software developers,
          copywriters, product managers, designers, finance experts and data
          scientist in the world. Top companies hire RapydFreelancers for their
          projects.
        </p>
        <div className="button-group w-72 flex items-center justify-between mt-4">
          <Button
            text="Hire Talent"
            href="/post-job"
            className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-800"
          />
          <Button
            text="Find Work"
            href="/jobs"
            className="border border-blue-500 text-blue-500 px-4 py-1 rounded-full hover:bg-blue-800 hover:text-white"
          />
        </div>
        <div className="brands mt-10">   
          <h6 className="mb-2 font-medium">
            Trusted and powered by leading brand
          </h6>
          <RapydLogo />
        </div>
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
