import { useState, useEffect } from "react";
import { InputModelsProps, AHPResults } from "../types";
import { AHPTable, ResultsModal, SwiperButton, Loading } from "../components";
import { validateAHPInput } from "../utils/validations";
import { getAHPResults } from "../api/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./ui/card";

const InputModels = ({ method, criteria, companies }: InputModelsProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [tableData, setTableData] = useState<string[][][]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [results, setResults] = useState<AHPResults[]>([]);

  useEffect(() => {
    const newTableData = [];
    newTableData.push(
      Array(criteria.length)
        .fill("")
        .map(() => Array(criteria.length).fill(""))
    );

    criteria.forEach(() => {
      newTableData.push(
        Array(companies.length)
          .fill("")
          .map(() => Array(companies.length).fill(""))
      );
    });

    setTableData(newTableData);
    setCurrentSlide(0);
  }, [criteria, companies, method]);

  // Handles input change
  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    tableIndex: number,
    value: string
  ) => {
    if (validateAHPInput(value)) {
      const newTableData = [...tableData];
      const newRow = [...newTableData[tableIndex][rowIndex]];
      newRow[colIndex] = value;

      newTableData[tableIndex][rowIndex] = newRow;
      setTableData(newTableData);
    } else {
      setError("Please enter a valid number or fraction.");
    }
  };

  // Handles validation
  const handleValidation = (): boolean => {
    const currentTable = tableData[currentSlide];
    const isValidCell = (cell: string) => /^(\d+|\d+\/\d+)$/.test(cell);

    const isTableComplete = currentTable.every((row) =>
      row.every((cell) => isValidCell(cell))
    );

    if (!isTableComplete) {
      setError(
        "Please fill in all the values with valid numbers or fractions before proceeding."
      );
      return false;
    } else {
      setError("");
      return true;
    }
  };

  // Handles submit
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentTable = tableData[currentSlide];
    const isValidCell = (cell: string) => /^(\d+|\d+\/\d+)$/.test(cell);

    const isTableComplete = currentTable.every((row) =>
      row.every((cell) => isValidCell(cell))
    );

    if (!isTableComplete) {
      setError(
        "Please fill in all the values with valid numbers or fractions before proceeding."
      );
      return;
    } else {
      setError("");
    }

    if (currentSlide === criteria.length) {
      setLoading(true);
      try {
        const results: AHPResults[] = await getAHPResults({
          criteria: criteria,
          tables: tableData,
          companies,
        });
        setResults(results);
        handleOpen();
      } catch {
        alert("Something went wrong, please check your values.");
      } finally {
        setCurrentSlide(0);
        setLoading(false);
      }
    }
  };

  // Handles modal open/close
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return loading ? (
    <Loading size={70} />
  ) : (
    <Card className="max-w-[900px] flex flex-col items-center justify-center">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={() => setCurrentSlide((prev) => prev + 1)}
        allowTouchMove={false}
        className="w-full"
      >
        <SwiperSlide key={"First"} className="w-full p-3">
          <h1 className="font-bold text-lg pb-5">Rate criteria weights</h1>
          <AHPTable
            data={criteria}
            table={tableData[0]}
            onInputChange={(row, col, value) =>
              handleInputChange(row, col, 0, value)
            }
          />
          <SwiperButton
            currentSlide={currentSlide}
            checker={criteria.length}
            onNext={handleValidation}
          />
          {error && <p className="text-error text-center mt-2">{error}</p>}
        </SwiperSlide>
        {criteria.map((criterion) => (
          <SwiperSlide key={criterion.id} className="w-full p-3">
            <h1 className="font-bold text-lg pb-5">
              Rate criteria {criterion.label}
            </h1>
            <AHPTable
              data={companies}
              table={tableData[currentSlide]}
              onInputChange={(row, col, value) =>
                handleInputChange(row, col, currentSlide, value)
              }
            />
            <SwiperButton
              currentSlide={currentSlide}
              checker={criteria.length}
              onSubmit={onSubmit}
              onNext={handleValidation}
            />
            {error && <p className="text-error text-center mt-2">{error}</p>}
          </SwiperSlide>
        ))}
      </Swiper>
      <ResultsModal
        open={open}
        handleClose={handleClose}
        results={results}
        title="AHP Scores"
        type="AHP"
      />
    </Card>
  );
};

export default InputModels;
