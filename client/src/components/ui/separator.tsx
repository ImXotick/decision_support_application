import { SeparatorProps } from "../../types";

const Separator = ({ className }: SeparatorProps) => {
  return <div className={`w-full h-px my-3 bg-gray-300 ${className}`} />;
};

export default Separator;
