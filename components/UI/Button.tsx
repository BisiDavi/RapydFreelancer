import Link from "next/link";

import ButtonSpinner from "@/components/loader/ButtonSpinner";

interface Props {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  title?: string;
}

export default function Button({
  className,
  onClick,
  type,
  text,
  icon,
  disabled,
  loading,
  href,
  title,
}: Props) {
  const buttonType = type ? type : "button";
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className={className} title={title}>
            {icon}
            {text}
          </a>
        </Link>
      ) : (
        <button
          className={className}
          onClick={onClick}
          type={buttonType}
          disabled={disabled}
          title={title}
        >
          {loading && <ButtonSpinner />} {icon} {text}
        </button>
      )}
    </>
  );
}
