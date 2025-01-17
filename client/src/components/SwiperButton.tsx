import { SwiperButtonProps } from "../types";
import { useSwiper } from "swiper/react";
import Button from "./ui/button";

const SwiperButton = ({
  currentSlide,
  checker,
  onSubmit,
  onNext,
  oneSlide = false,
}: SwiperButtonProps) => {
  const swiper = useSwiper();

  const handleSlideChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((currentSlide === checker && onSubmit) || (oneSlide && onSubmit)) {
      onSubmit(e);
    } else if (onNext) {
      const result = onNext();
      if (result) swiper.slideNext();
    } else {
      swiper.slideNext();
    }
  };

  return (
    <Button onClick={(e) => handleSlideChange(e)} className="w-full mt-10">
      {currentSlide === checker || oneSlide ? "Get Results" : "Next"}
    </Button>
  );
};

export default SwiperButton;
