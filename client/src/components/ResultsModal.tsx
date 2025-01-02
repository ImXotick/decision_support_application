import { ResultsModalProps } from "../types";
import Modal from "@mui/material/Modal";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const ResultsModal = ({
  open,
  handleClose,
  results,
  title,
  type,
}: ResultsModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center bg-surface"
    >
      <div className="bg-surface rounded-lg shadow-level5 pl-5 pr-16 py-10 max-w-[90vw] max-h-[80vh] w-full h-full md:w-[1000px] md:h-[600px] flex flex-col items-center justify-center">
        {title && <h1 className="font-bold text-lg">{title}</h1>}
        <ResponsiveContainer width="100%" height="100%" debounce={200}>
          {type === "WSM" ? (
            <LineChart data={results} margin={{ top: 20, right: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="flows.Weighted sum calculation"
                stroke="#202B30"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          ) : type === "Topsis" ? (
            <LineChart data={results} margin={{ top: 20, right: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="flows.Closeness coefficient"
                stroke="#00FF00"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="flows.Distance from ideal solution"
                stroke="#0000B3"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="flows.Distance from not ideal solution"
                stroke="#E60000"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          ) : type === "AHP" ? (
            <AreaChart
              data={results}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="flows.Global priorities"
                stroke="#202B30"
                fill="#202B30"
              />
            </AreaChart>
          ) : (
            <BarChart
              width={500}
              height={300}
              data={results}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="flows.Scores"
                fill="#202B30"
                background={{ fill: "#ADB4B7" }}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Modal>
  );
};

export default ResultsModal;
