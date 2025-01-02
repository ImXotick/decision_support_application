import { ClockLoader } from "react-spinners";

const Loading = ({ size }: { size: number }) => {
  return (
    <div className="w-full flex justify-center items-center py-24">
      <ClockLoader color="#202B30" loading={true} size={size} />
    </div>
  );
};

export default Loading;
