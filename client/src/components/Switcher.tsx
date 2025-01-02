import { Switch } from "@headlessui/react";
import { SwitcherProps } from "../types";

const Switcher = ({ label, value, onSwitchChange }: SwitcherProps) => {
  return (
    <div className="flex items-center gap-2 sm:ml-4 sm:mt-0 mt-4">
      <p>Min</p>
      <Switch
        checked={value}
        onChange={(value: boolean) => onSwitchChange(label, value)}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-tertiary transition data-[checked]:bg-primary"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
      <p>Max</p>
    </div>
  );
};

export default Switcher;
