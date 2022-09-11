import ContentLoader from "react-content-loader";

function Loader(props: any) {
  return (
    <ContentLoader
      animate
      speed={2}
      viewBox="0 0 100 10"
      backgroundColor="#e3d9d9"
      foregroundColor="#ada4a4"
      className="my-2"
      title="loading jobs..."
      {...props}
    >
      <rect x="0" y="0%" rx="1px" ry="1px" width="100%" height="10px" />
    </ContentLoader>
  );
}

export default function JobListLoader() {
  const jobsArray = new Array(10).fill(0);

  return (
    <div className="flex flex-col w-full">
      {jobsArray.map((_, index) => (
        <Loader key={index} />
      ))}
    </div>
  );
}
