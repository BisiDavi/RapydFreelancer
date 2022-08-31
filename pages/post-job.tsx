import Logo from "@/components/logo";
import displayFormElement from "@/lib/displayFormElement";
import formContent from "@/json/forms/post-job.json";

export default function PostJob() {
  return (
    <>
      <div className="banner w-full py-20">
        <div className=" w-1/2 mx-auto h-72">
          <div className="logo-wrapper w-1/3 my-4">
            <Logo />
          </div>
          <h2 className="text-white text-3xl my-4">
            Get that Project done, Tell us what you need done
          </h2>
          <p className="break-words text-white text-sm my-2">
            Contact RapydFreelancers within minutes. View their profiles,
            ratings, portfolios and chat with them. Pay the freelancers only
            when you are 100% satisfied with their work.
          </p>
          <div className="content mb-10 bg-white shadow drop-shadow rounded-xl mt-10">
            <form className="py-1 p-8">
              {formContent.map((formElementContent, index) => (
                <div key={index}>{displayFormElement(formElementContent)}</div>
              ))}
            </form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .banner {
            background: rgb(2, 0, 36);
            background: linear-gradient(
              90deg,
              rgba(2, 0, 36, 1) 0%,
              rgba(9, 9, 121, 1) 35%,
              rgba(0, 212, 255, 1) 100%
            );
          }
          .content {
            height: 500px;
          }
        `}
      </style>
    </>
  );
}
