"use client";

import { useBoardStore } from "@/store/BoardStore";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";


const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A task that needs to be done",
    color: "bg-red-500",
  },

  {
    id: "inprogress",
    name: "In-Progress",
    description: "A task that is in progress",
    color: "bg-yellow-500",
  },

  {
    id: "done",
    name: "Done",
    description: "A task that is done",
    color: "bg-green-500",
  },
];

export const TypeRadioGroup = () => {

    const [newTaskType, setNewTaskType] = useBoardStore((state) => [
        state.newTaskType,
        state.setNewTaskType,
      ]);

      

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={setNewTaskType}>
          <div className="space-y-2">
            {types.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                         
                            <span>{plan.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
