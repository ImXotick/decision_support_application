import { CardProps } from "../../types";

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={`w-full rounded-md bg-surface p-10 shadow-level3 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
