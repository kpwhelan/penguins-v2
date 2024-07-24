export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-black text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    );
}
