import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'min-h-12 rounded-xl border-navy-950/15 bg-white px-4 py-3 text-navy-950 shadow-sm transition focus:border-penguins-500 focus:ring-4 focus:ring-penguins-100 ' +
                className
            }
            ref={input}
        />
    );
});
