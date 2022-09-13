/* eslint-disable @next/next/no-img-element */

interface Props {
  error?: string;
}

export default function ErrorView({ error }: Props) {
  const errorText = error
    ? error
    : "Error loading this page, please check your internet connection or refresh this page.";
  return (
    <div className="mx-auto flex items-center flex-col justify-center">
      <img src="/error-icon.webp" className="rounded-full h-80 w-80 my-10" alt="Error" title="Error" />
      <p className="my-4 font-bold text-xl">{errorText}</p>
    </div>
  );
}
