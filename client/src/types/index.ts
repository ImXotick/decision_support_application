//State props
export type IUser = {
  username: string;
};

export type ILink = {
  id: string;
  url: string;
};

export type ICompany = {
  id: number;
  label: string;
  revenue: number;
  revenue_percentage_change: number;
  profits: number;
  profits_percentage_change: number;
  assets: number;
  employees: number;
  change_in_rank: number;
  criteria: ICriteria[];
};

export type ICriteria = {
  id: number;
  label: string;
  description: string;
};

export type IMethod = {
  id: number;
  label: string;
  description: string;
};

export type CriteriaState<T> = Record<string, T>;

//Components props
export type InformationTableProps = {
  companies: ICompany[];
};

export type ResultsModalProps = {
  title?: string;
  open: boolean;
  handleClose: () => void;
  results: TopsisResult[] | WSMResult[] | AHPResults[] | PrometheeResults[];
  type: string;
};

export type SingleSelectProps<T> = {
  data: T[];
  dataItem: T;
  onItemChange: (company: T) => void;
};

export type MultiSelectProps<T> = {
  data: T[];
  dataItem: T[];
  onItemChange: (company: T[]) => void;
};

export type WeightSliderProps = {
  method: IMethod;
  criteria: ICriteria[];
  companies: ICompany[];
  switcher?: boolean;
  oneSlide?: boolean;
};

export type SliderProps = {
  label: string;
  value: number[];
  onValueChange: (label: string, value: number[]) => void;
  maxStep: number;
  step: number;
};

export type InputModelsProps = {
  method: IMethod;
  criteria: ICriteria[];
  companies: ICompany[];
};

export type AHPTableProps = {
  data: ICompany[] | ICriteria[];
  table: (string | number)[][];
  onInputChange: (rowIndex: number, colIndex: number, value: string) => void;
};

export type SwitcherProps = {
  label: string;
  value: boolean;
  onSwitchChange: (label: string, value: boolean) => void;
};

export type SwiperButtonProps = {
  currentSlide: number;
  checker: number;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onNext?: () => boolean;
  oneSlide?: boolean;
};

export type SlideAndInputProps = {
  method: IMethod;
  criteria: ICriteria[];
  companies: ICompany[];
  switcher?: boolean;
};

//Small components props
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type SeparatorProps = {
  className?: string;
};

export type CardProps = {
  className?: string;
  children: React.ReactNode;
};

//Post props
export type AHPPostProps = {
  criteria: ICriteria[];
  companies: ICompany[];
  tables: string[][][];
};

export type TopisPostProps = {
  weights: number[];
  switches?: boolean[];
  tables?: number[][];
  companies: ICompany[];
};

export type WSMPostProps = Omit<TopisPostProps, "switches" | "criteria">;

export type PrometheePostProps = {
  weights: number[];
  switches: boolean[];
  companies: ICompany[];
  criteria: ICriteria[];
  prefParams: number[][];
  prefFunc: string[];
};

// Result types
export type TopsisResult = {
  name: string;
  flows: {
    closeness_coefficient: number;
    distance__ideal_solution: number;
    distance__not_ideal_solution: number;
  };
};

export type WSMResult = {
  name: string;
  flows: {
    weighted_sum_calculation: number;
  };
};

export type AHPResults = {
  name: string;
  flows: {
    "Global priorities": number;
  };
};

export type PrometheeResults = {
  name: string;
  flows: {
    Scores: number;
  };
};
