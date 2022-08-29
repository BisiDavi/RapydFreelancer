import ButtonSpinner from "@/components/loader/ButtonSpinner";

interface Props {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  icon?: JSX.Element;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  className,
  onClick,
  type,
  text,
  icon,
  disabled,
  loading,
}: Props) {
  const buttonType = type ? type : "button";
  return (
    <>
      <button
        className={className}
        onClick={onClick}
        type={buttonType}
        disabled={disabled}
      >
        {loading && <ButtonSpinner />} {icon} {!loading && text}
      </button>
    </>
  );
}
