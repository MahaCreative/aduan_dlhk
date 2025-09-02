import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { name, type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            name={name}
            id={name}
            type={type}
            className={
                "disabled:bg-gray-100 border-gray-300 focus:border-secondary focus:ring-secondary rounded-md shadow-sm " +
                className
            }
            ref={input}
        />
    );
});
