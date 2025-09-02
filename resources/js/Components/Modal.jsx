import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
    title,
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
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
                    <div className="absolute inset-0 bg-primary/75 " />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidth} py-2 px-5`}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h1 className="font-bold tracking-tight text-primary">
                                {title}
                            </h1>
                            <button
                                onClick={() => onClose()}
                                className="py-2 px-2 rounded-md border border-secondary hover:bg-primary hover:text-white"
                            >
                                close
                            </button>
                        </div>

                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
