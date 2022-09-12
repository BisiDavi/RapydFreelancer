import Typewriter from "typewriter-effect";

export default function TypewriterEffect() {
  return (
    <div className="typewriter my-4">
      <h4 className="text-lg lg:text-4xl font-bold flex text-blue-500">
        <span className="mr-1 ">Hire the best - </span>
        <Typewriter
          options={{
            strings: [
              "talent",
              "Software Developers",
              "Data Entry Specialist",
              "Copywriter",
              "Data Scientist",
              "Bookkeeper",
              "Video Editors",
              "Content Writer",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </h4>
    </div>
  );
}
