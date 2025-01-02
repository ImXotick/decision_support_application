import { ButtonProps, ButtonVariant } from "../../types";

const Button = ({
  variant = "primary",
  children,
  className,
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-secondary",
    secondary: "bg-secondary text-white hover:bg-tertiary",
    danger: "bg-red-800 text-white hover:bg-red-500",
    ghost:
      "bg-transparent text-primary border border-border hover:bg-secondary  hover:text-white",
  };

  const disabledClasses = disabled
    ? "bg-gray-400 text-gray-600 cursor-not-allowed hover:bg-gray-400"
    : "";

  const combinedClasses = `${
    disabled ? disabledClasses : variantClasses[variant]
  } px-4 py-2 rounded-xl ${className || ""}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
