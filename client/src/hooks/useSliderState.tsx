import { useState, useCallback } from "react";
import { CriteriaState, ICriteria } from "../types";

// Custom hook to handle slider state
function useSliderState<T>(
  criteria: ICriteria[],
  initialValue: T
): [CriteriaState<T>, (label: string, value: T) => void, () => void] {
  // Initialize state with criteria labels
  const [state, setState] = useState<CriteriaState<T>>(
    criteria.reduce((acc, criterion) => {
      acc[criterion.label] = initialValue;
      return acc;
    }, {} as CriteriaState<T>)
  );

  // Function to update value for a specific label
  const setValue = (label: keyof CriteriaState<T>, value: T) => {
    setState((prevState) => {
      if (prevState[label] === value) return prevState; // Avoid updating if value is the same
      return {
        ...prevState,
        [label]: value,
      };
    });
  };

  // Function to reset all criteria values
  const resetValues = useCallback(() => {
    setState(
      criteria.reduce((acc, criterion) => {
        acc[criterion.label] = initialValue;
        return acc;
      }, {} as CriteriaState<T>)
    );
  }, [criteria, initialValue]);

  return [state, setValue, resetValues];
}

export default useSliderState;
