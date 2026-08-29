export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex min-h-11 items-center justify-center rounded-xl border border-navy-950/25 bg-navy-50 px-5 py-2.5 text-sm font-extrabold text-navy-950 shadow-sm transition duration-200 hover:border-navy-950/40 hover:bg-navy-100 focus:outline-none focus:ring-2 focus:ring-penguins-500 focus:ring-offset-2 ${
                    disabled && 'cursor-not-allowed opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
