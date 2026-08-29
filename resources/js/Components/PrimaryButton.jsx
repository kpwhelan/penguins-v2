export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent bg-penguins-500 px-5 py-2.5 text-sm font-extrabold text-navy-950 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-penguins-400 focus:outline-none focus:ring-2 focus:ring-penguins-500 focus:ring-offset-2 ${
                    disabled && 'cursor-not-allowed opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
