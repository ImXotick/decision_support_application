import { ILink, IMethod } from "../types/index";

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export const RESULTS = "results";

export const links: ILink[] = [
  { id: "Home", url: "/" },
  { id: "Models", url: "/models" },
  { id: "About", url: "/about" },
];

export const methods: IMethod[] = [
  {
    id: 1,
    label: "AHP",
    description: "empty",
  },
  {
    id: 2,
    label: "Topsis",
    description: "empty",
  },
  {
    id: 3,
    label: "Promethee",
    description: "empty",
  },
  {
    id: 4,
    label: "WSM",
    description: "empty",
  },
];

export const liText: string[] = [
  "Empower your investment decisions with advanced multi-criteria decision-making models.",
  "Simplify complex choices by analyzing and ranking your investment options with precision and clarity.",
  "Boost your confidence in decision-making by leveraging proven, data-driven methodologies trusted by experts.",
  "Tailor your analysis to match your priorities and preferences, ensuring every decision aligns with your goals.",
  "Visualize your path to success with intuitive dashboards and insights designed for smart investment planning.",
  "Save time and reduce uncertainty by letting our app handle the heavy lifting of quantitative analysis.",
  "Adapt to any scenario with a versatile tool that evaluates opportunities across industries and markets.",
  "Turn complexity into opportunity and make investment decisions that truly work for you.",
];

export const preferenceFuncValues = [
  {
    id: 1,
    label: "Usual",
    value: "u",
  },
  {
    id: 2,
    label: "Linear",
    value: "li",
  },
  {
    id: 3,
    label: "V-Shape",
    value: "vs",
  },
  {
    id: 4,
    label: "U-Shape",
    value: "us",
  },
  {
    id: 5,
    label: "Level",
    value: "le",
  },
  {
    id: 6,
    label: "Gaussian",
    value: "g",
  },
];
