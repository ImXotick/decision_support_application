import { useState, useEffect } from "react";
import { WeightSliderProps, TopsisResult, WSMResult } from "../types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { SliderRange, Loading, SwiperButton } from "../components";
import { Switcher, ResultsModal } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { getTopsisResults, getWSMResults } from "../api/apis";
import useSliderState from "../hooks/useSliderState";
import Separator from "./ui/separator";
import Card from "./ui/card";
import "swiper/swiper-bundle.css";

const SliderModels = ({
  method,
  criteria,
  companies,
  switcher = false,
  oneSlide = false,
}: WeightSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [tables, setTables] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [results, setResults] = useState<TopsisResult[] | WSMResult[]>();

  // Handles sliders/switches states
  const [switches, onSwitchChange, resetSwitches] = useSliderState<boolean>(
    criteria,
    true
  );
  const [criteria_values, onCriteriaChange, resetCriteria] = useSliderState<
    number[]
  >(criteria, [1]);
  const [weights, onWeightChange, resetWeights] = useSliderState<number[]>(
    criteria,
    [0.1]
  );

  // Resets all values
  useEffect(() => {
    resetSwitches();
    resetCriteria();
    resetWeights();
    setTables([]);
    setCurrentSlide(0);
  }, [criteria, method, companies]);

  // Handles next slide
  const handleNext = () => {
    if (currentSlide === criteria.length) return;
    setCurrentSlide((prev) => prev + 1);

    if (currentSlide > 0) {
      setTables((prevState) => {
        const updatedTables = [
          ...prevState,
          Object.values(criteria_values).flat(),
        ];
        return updatedTables;
      });
    }
    resetCriteria();
  };

  //handles the end of the slider
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const lastTables = [...tables, Object.values(criteria_values).flat()];

    setLoading(true);
    if (method.label === "Topsis") {
      try {
        if (oneSlide) {
          const results: TopsisResult[] = await getTopsisResults({
            weights: Object.values(weights).flat(),
            companies,
          });
          setResults(results);
        } else {
          const results: TopsisResult[] = await getTopsisResults({
            weights: Object.values(weights).flat(),
            switches: Object.values(switches).flat(),
            tables: lastTables,
            companies,
          });
          setResults(results);
        }
      } catch {
        alert("Something went wrong, please check your values.");
      } finally {
        setCurrentSlide(0);
        //Reset all values
        resetSwitches();
        resetCriteria();
        resetWeights();
        setTables([]);
        setCurrentSlide(0);

        handleOpen();
        setLoading(false);
      }
    } else {
      try {
        if (oneSlide) {
          const results: WSMResult[] = await getWSMResults({
            weights: Object.values(weights).flat(),
            companies,
          });
          setResults(results);
        } else {
          const results: WSMResult[] = await getWSMResults({
            weights: Object.values(weights).flat(),
            tables: lastTables,
            companies,
          });
          setResults(results);
        }
      } catch {
        alert("Something went wrong, please check your values.");
      } finally {
        //Reset all values
        resetSwitches();
        resetCriteria();
        resetWeights();
        setTables([]);
        setCurrentSlide(0);
        setCurrentSlide(0);
        setLoading(false);
        handleOpen();
      }
    }
  };

  // Handles modal open/close
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return loading ? (
    <Loading size={70} />
  ) : (
    <Card className="max-w-[800px] p-7">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={handleNext}
        allowTouchMove={false}
        className="w-full"
      >
        <SwiperSlide key={"First"} className="w-full p-3">
          <h1 className="font-bold text-lg pb-5">Rate criteria weights</h1>
          {criteria.map((criterion, index) => (
            <div key={criterion.id}>
              <Disclosure>
                <DisclosureButton className="flex items-center text-md font-medium gap-2">
                  <p className="hover:text-primary">{criterion.label}</p>
                </DisclosureButton>
                <DisclosurePanel
                  transition
                  className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 text-sm text-black/80"
                >
                  {criterion.description}
                </DisclosurePanel>
              </Disclosure>
              <div className="w-full flex flex-col sm:flex-row items-center justify-between">
                <SliderRange
                  label={criterion.label}
                  value={weights[criterion.label]}
                  onValueChange={onWeightChange}
                  maxStep={1}
                  step={0.01}
                />
                {switcher && (
                  <Switcher
                    label={criterion.label}
                    value={switches[criterion.label]}
                    onSwitchChange={onSwitchChange}
                  />
                )}
              </div>
              {index !== criteria.length - 1 && <Separator />}
            </div>
          ))}
          <SwiperButton
            currentSlide={currentSlide}
            checker={companies.length}
            oneSlide={oneSlide}
            onSubmit={onSubmit}
          />
        </SwiperSlide>
        {!oneSlide &&
          companies.map((company) => (
            <SwiperSlide key={company.id} className="w-full p-3">
              <h1 className="font-bold text-lg pb-5">
                Rate criteria for {company.label}
              </h1>
              {criteria.map((criterion, second_index) => (
                <div key={criterion.id}>
                  <Disclosure>
                    <DisclosureButton className="flex items-center text-md font-medium gap-2">
                      <p className="hover:text-primary">{criterion.label}</p>
                    </DisclosureButton>
                    <DisclosurePanel
                      transition
                      className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 text-sm text-black/80"
                    >
                      {criterion.description}
                    </DisclosurePanel>
                  </Disclosure>
                  <div className="flex items-center">
                    <SliderRange
                      label={criterion.label}
                      value={criteria_values[criterion.label]}
                      onValueChange={onCriteriaChange}
                      maxStep={10}
                      step={1}
                    />
                  </div>
                  {second_index !== criteria.length - 1 && <Separator />}
                </div>
              ))}
              <SwiperButton
                currentSlide={currentSlide}
                checker={companies.length}
                onSubmit={onSubmit}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <ResultsModal
        open={open}
        handleClose={handleClose}
        results={results || []}
        title={method.label === "Topsis" ? "Topsis results" : "WSM results"}
        type={method.label === "Topsis" ? "Topsis" : "WSM"}
      />
    </Card>
  );
};

export default SliderModels;
