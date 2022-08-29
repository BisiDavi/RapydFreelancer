import TypewriterEffect from "@/components/UI/Typewriter";

export default function Homebanner() {
  return (
    <section className="banner h-52 flex  items-center px-5  bg-gray-100 w-full">
      <div className="content">
        <TypewriterEffect />
        <p className="font-light text-2xl">Hire top talent in minutes not weeks</p>
      </div>
    </section>
  );
}
