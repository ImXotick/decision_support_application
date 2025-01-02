import { useState, useEffect } from "react";
import { Loading, Switcher, SliderRange, SwiperButton, ResultsModal } from ".";
import { SlideAndInputProps, PrometheeResults } from "../types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { preferenceFuncValues } from "../constants";
import { getPrometheeResults } from "../api/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import useSliderState from "../hooks/useSliderState";
import Separator from "./ui/separator";
import Card from "./ui/card";

const SlideAndInputModels = ({
  method,
  companies,
  criteria,
  switcher = false,
}: SlideAndInputProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<PrometheeResults[]>([]);

  // Handles preference parameters and functions
  const [prefParams, setPreferenceParameter] = useState<number[][]>(
    Array.from({ length: 2 }, () => Array(criteria.length).fill(1))
  );
  const [prefFunc, setPreferenceFunctions] = useState<string[]>(
    Array.from({ length: criteria.length }, () => "li")
  );

  // Handles sliders/switches states
  const [switches, onSwitchChange, resetSwitches] = useSliderState<boolean>(
    criteria,
    true
  );
  const [weights, onWeightChange, resetWeights] = useSliderState<number[]>(
    criteria,
    [0.1]
  );

  useEffect(() => {
    resetSwitches();
    resetWeights();
  }, [method, companies, criteria]);

  // Handles input change for preference parameters
  const handleParamChange = (value: number, row: number, col: number) => {
    setPreferenceParameter((prev) => {
      if (value > 0) {
        const updatedParameters = [...prev];
        updatedParameters[row][col] = value;
        return updatedParameters;
      } else {
        return prev;
      }
    });
  };

  // Handles input change for preference functions
  const handleFunctionChange = (value: string, index: number) => {
    setPreferenceFunctions((prev) => {
      const updatedParameters = [...prev];
      updatedParameters[index] = value;
      return updatedParameters;
    });
  };

  //handles the end of the slider
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const results: PrometheeResults[] = await getPrometheeResults({
        weights: Object.values(weights).flat(),
        switches: Object.values(switches).flat(),
        companies: companies,
        criteria: criteria,
        prefParams: prefParams,
        prefFunc: prefFunc,
      });
      setResults(results);
    } catch (error) {
      alert(error);
    } finally {
      resetSwitches();
      resetWeights();
      setCurrentSlide(0);
      setLoading(false);
      handleOpen();
    }
  };

  // Handles next slide
  const handleNext = () => setCurrentSlide((prev) => prev + 1);

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
              <div className="w-full flex flex-col sm:flex-row justify-between gap-2">
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
          <SwiperButton currentSlide={currentSlide} checker={1} />
        </SwiperSlide>
        <SwiperSlide key={"Second"} className="w-full p-3">
          <h1 className="font-bold text-lg">Preference Parameters</h1>
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  {criteria.map((criterion) => (
                    <TableCell key={criterion.id}>{criterion.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {criteria.map((criterion, index) => (
                    <TableCell key={criterion.id}>
                      <TextField
                        type="number"
                        value={prefParams[0][index] || ""}
                        fullWidth
                        onChange={(e) => {
                          handleParamChange(
                            parseFloat(e.target.value),
                            0,
                            index
                          );
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {criteria.map((criterion, index) => (
                    <TableCell key={criterion.id}>
                      <TextField
                        type="number"
                        value={prefParams[1][index] || ""}
                        fullWidth
                        onChange={(e) => {
                          handleParamChange(
                            parseFloat(e.target.value),
                            1,
                            index
                          );
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <h1 className="font-bold text-lg">Preference Functions</h1>
          <div className="overflow-x-auto">
            <Table>
              <TableBody>
                <TableRow>
                  {criteria.map((criterion, index) => (
                    <TableCell key={criterion.id}>
                      <Select
                        value={prefFunc[index]}
                        onChange={(e) =>
                          handleFunctionChange(e.target.value, index)
                        }
                        fullWidth
                      >
                        {preferenceFuncValues.map((func, f_index) => (
                          <MenuItem key={f_index} value={func.value}>
                            {func.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <SwiperButton
            currentSlide={currentSlide}
            checker={1}
            onSubmit={onSubmit}
          />
        </SwiperSlide>
      </Swiper>
      <ResultsModal
        open={open}
        handleClose={handleClose}
        results={results}
        title="Promethee results"
        type="Promethee"
      />
    </Card>
  );
};

export default SlideAndInputModels;
