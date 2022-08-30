import { PropsWithChildren } from "react";

interface Props {
  className?: string;
  full?: boolean;
}

export default function Container({
  children,
  className,
  full,
}: PropsWithChildren<Props>) {
  const containerClassname = full ? "w-full" : "container";
  return (
    <div className={`${containerClassname} mx-auto flex ${className}`}>
      {children}
    </div>
  );
}
