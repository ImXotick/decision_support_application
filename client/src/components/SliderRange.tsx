import { SliderProps } from "../types";
import * as Slider from "@radix-ui/react-slider";

const SliderRange = ({
  label,
  value,
  onValueChange,
  maxStep,
  step,
}: SliderProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <Slider.Root
        className="w-full min-w-28 relative flex items-center select-none touch-none h-5"
        value={value}
        onValueChange={(value: number[]) => onValueChange(label, value)}
        max={maxStep}
        step={step}
        aria-label="Weight"
      >
        <Slider.Track className="bg-tertiary relative flex-1 rounded-full h-1">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-background border border-border rounded-full shadow-level4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75" />
      </Slider.Root>
      <p className="w-5 px-5 flex justify-center items-center rounded-full border border-border shadow-level3 bg-background ml-5">
        {value}
      </p>
    </div>
  );
};

export default SliderRange;
