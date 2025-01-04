import { useEffect, useState } from "react";
import { ICompany, ICriteria, IMethod } from "../types";
import { methods } from "../constants";
import {
  SingleSelect,
  MultiSelect,
  SliderModels,
  InputModels,
  SlideAndInputModels,
  InformationTable,
} from "../components";
import { getCompanies, getCriteria } from "../api/apis";
import { Loading } from "../components";
import { Checkbox } from "@headlessui/react";
import Card from "../components/ui/card";

const Models = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [criteria, setCriteria] = useState<ICriteria[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<ICompany[]>([]);
  const [method, setMethod] = useState<IMethod>(methods[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableEnabled, setTableEnabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCompanies();
      setCompanies(data);
      const criteria = await getCriteria();
      setCriteria(criteria);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (!loading) {
    return (
      <div className="w-full flex flex-col items-center p-20 gap-5">
        <Card className="max-w-[400px] flex flex-col">
          <h1 className="font-bold text-lg pb-5">Companies</h1>
          <MultiSelect
            data={companies}
            dataItem={selectedCompanies}
            onItemChange={setSelectedCompanies}
          />
          <h1 className="font-bold text-lg py-5">Methods</h1>
          <SingleSelect
            data={methods}
            dataItem={method}
            onItemChange={setMethod}
          />
          <div className="w-full flex items-center mt-5 gap-5">
            <h1 className="font-bold text-lg">Show data:</h1>
            <Checkbox
              checked={tableEnabled}
              onChange={setTableEnabled}
              className="group block size-6 rounded border border-border bg-white data-[checked]:bg-primary"
            >
              <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
          </div>
        </Card>

        {selectedCompanies.length > 1 && tableEnabled && (
          <Card
            className={`max-w-[${
              method.label === "AHP" ? "900px" : "800px"
            }] flex flex-col overflow-auto`}
          >
            <InformationTable companies={selectedCompanies} />
          </Card>
        )}

        {selectedCompanies.length <= 2 ? (
          <div>Select at least three companies</div>
        ) : method.label === "AHP" ? (
          <InputModels
            method={method}
            criteria={criteria}
            companies={selectedCompanies}
          />
        ) : method.label === "Topsis" ? (
          <SliderModels
            method={method}
            criteria={criteria}
            companies={selectedCompanies}
            switcher={true}
          />
        ) : method.label === "WSM" ? (
          <SliderModels
            method={method}
            criteria={criteria}
            companies={selectedCompanies}
          />
        ) : (
          <SlideAndInputModels
            method={method}
            criteria={criteria}
            companies={selectedCompanies}
            switcher={true}
          />
        )}
      </div>
    );
  } else {
    return <Loading size={70} />;
  }
};

export default Models;
//className="flex flex-col max-w-[800px]"
