import React, { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export default function Container({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className={`container mx-auto flex flex-col ${className}`}>{children}</div>
  );
}
