import { MultiSelectProps } from "../types";
import { KeyboardArrowDown, Check } from "@mui/icons-material";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

const MultiSelect = <T extends { id: number; label: string }>({
  data,
  dataItem,
  onItemChange,
}: MultiSelectProps<T>) => {
  return (
    <div className="w-full">
      <Listbox value={dataItem} onChange={onItemChange} multiple>
        <ListboxButton
          className={clsx(
            "relative w-full flex justify-between rounded-lg text-left text-md border border-border bg-background py-3 px-3",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {dataItem.map((company) => company.label).join(", ")}
          <KeyboardArrowDown sx={{ color: "black" }} />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-xl border border-border bg-surface p-1 focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-50 m-[var(--anchor-gap)]"
          )}
        >
          {data.map((item) => (
            <ListboxOption
              key={item.id}
              value={item}
              className="group flex justify-between cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <p className="text-sm/6">{item.label}</p>
              <Check
                sx={{ color: "black" }}
                className="invisible size-4 group-data-[selected]:visible"
              />
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default MultiSelect;
