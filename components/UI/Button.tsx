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
}: Props) {
  const buttonType = type ? type : "button";
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className={className}>{text}</a>
        </Link>
      ) : (
        <button
          className={className}
          onClick={onClick}
          type={buttonType}
          disabled={disabled}
        >
          {loading && <ButtonSpinner />} {icon} {!loading && text}
        </button>
      )}
    </>
  );
}
