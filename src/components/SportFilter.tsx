import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { Sport } from "../League/types";
import { STRINGS } from "../constants/strings";

interface SportFilterProps {
  sports: Sport[];
  selectedSport: Sport | null;
  onChange: (sport: Sport | null) => void;
  className?: string;
}

export default function SportFilter({
  sports,
  selectedSport,
  onChange,
  className = "",
}: SportFilterProps) {
  return (
    <div className={className} data-testid="sport-filter">
      <Listbox value={selectedSport} onChange={onChange}>
        <div className="relative">
          <ListboxButton
            className="w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Select sport. Currently selected: ${
              selectedSport ? selectedSport.name : STRINGS.ALL_SPORTS
            }`}
          >
            <span className="truncate">
              {selectedSport ? selectedSport.name : STRINGS.ALL_SPORTS}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 w-[calc(100%-2px)] overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
              {/* All Sports */}
              <ListboxOption
                className={({ active }) =>
                  `cursor-pointer py-2 pl-10 pr-4 text-left ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
                value={null}
                aria-label={STRINGS.ALL_SPORTS}
              >
                {({ selected }) => (
                  <>
                    <span className={selected ? "font-medium" : ""}>
                      {STRINGS.ALL_SPORTS}
                    </span>
                  </>
                )}
              </ListboxOption>
              {sports.map((sport) => (
                <ListboxOption
                  key={sport.id}
                  className={({ active }) =>
                    `cursor-pointer py-2 pl-10 pr-4 text-left ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                  value={sport}
                  aria-label={sport.name}
                >
                  {({ selected }) => (
                    <>
                      <span className={selected ? "font-medium" : ""}>
                        {sport.name}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
