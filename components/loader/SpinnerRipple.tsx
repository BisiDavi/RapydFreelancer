interface Props {
  centerRipple?: boolean;
}

export default function SpinnerRipple({ centerRipple }: Props) {
  const ripplePosition = centerRipple
    ? "w-full w-screen mx-auto justify-center h-screen items-center flex ripple-center"
    : "ripple";
  return (
    <>
      <div className={ripplePosition}>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
      <style jsx>
        {`
          .lds-ripple {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }
          .lds-ripple div {
            position: absolute;
            border: 4px solid #4e44c4;
            opacity: 1;
            border-radius: 50%;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
          }
          .lds-ripple div:nth-child(2) {
            animation-delay: -0.5s;
          }
          @keyframes lds-ripple {
            0% {
              top: 36px;
              left: 36px;
              width: 0;
              height: 0;
              opacity: 1;
            }
            100% {
              top: 0px;
              left: 0px;
              width: 72px;
              height: 72px;
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
}

interface SpinnerLoaderProps {
  loadingText: string;
  className?: string;
}

export function SpinnerLoader({ loadingText, className }: SpinnerLoaderProps) {
  const loaderClassName = className ? className : "";
  return (
    <div className={`flex flex-col ${loaderClassName} `}>
      <div className={`ripple h-20 flex justify-center items-center`}>
        <SpinnerRipple centerRipple />
      </div>
      <p className="text-center font-bold">{loadingText}</p>
    </div>
  );
}
