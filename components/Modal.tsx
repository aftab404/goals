"use client";

import { useBoardStore } from "@/store/BoardStore";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useRef } from "react";
import { TypeRadioGroup } from "./TypeRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/20/solid";

export default function Modal() {
  const [newTaskInput, setNewTaskInput, setImage, image, addTodo, newTaskType] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.setImage,
      state.image,
      state.addTodo,
      state.newTaskType,
    ]);

  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useBoardStore((state) => [
    state.showModal,
    state.setShowModal,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    console.log(newTaskType)

    addTodo(newTaskInput, newTaskType, image)
    setImage(null);
    setShowModal(false);
  };

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="form"
          onSubmit={handleSubmit}
          className="relative z-10"
          onClose={setShowModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add a Todo
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Search"
                      value={newTaskInput}
                      className="flex-1 focus:outline-none p-5 w-full border border-gray-300 rounded-md"
                      onChange={(e) => setNewTaskInput(e.target.value)}
                    />
                  </div>

                  <TypeRadioGroup />

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        imagePickerRef.current?.click();
                      }}
                      className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                      Upload Image !
                    </button>
                    {image && (
                      <Image
                        alt="Uploaded Image"
                        width={200}
                        height={200}
                        src={URL.createObjectURL(image)}
                        className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                        onClick={() => {
                          setImage(null);
                        }}
                      />
                    )}

                    <input
                      type="file"
                      ref={imagePickerRef}
                      hidden
                      onChange={(e) => {
                        if (!e.target.files![0].type.startsWith("image/"))
                          return;

                        setImage(e.target.files![0]);
                      }}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!newTaskInput}
                      className="border border-slate-200 px-4 py-2 rounded-md mt-2 hover:bg-slate-200"
                    >
                      Add Task
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
