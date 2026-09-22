import InputError from './InputError';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const fields = [
    { key: 'quarterly', label: 'Quarterly membership', suffix: 'per quarter' },
    { key: 'monthly', label: 'Monthly membership', suffix: 'per month' },
    { key: 'drop_in', label: 'Drop-in rate', suffix: 'per visit' },
];

export default function MembershipRatesForm({ rates, className = '' }) {
    const [values, setValues] = useState(rates);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setErrors({});

        try {
            const response = await axios.put(route('membership.rates.update'), values);
            setValues(response.data.rates);
            toast.success(response.data.message);
        } catch (updateError) {
            const validationErrors = updateError.response?.data?.errors ?? {};
            setErrors(validationErrors);
            toast.error(updateError.response?.data?.message ?? 'The membership rates could not be updated.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={submit} className={`overflow-hidden rounded-panel border border-navy-950/15 bg-white shadow-card ${className}`}>
            <Toaster toastOptions={{ duration: 8000, style: { marginTop: '10px' } }} />

            <header className="flex items-start gap-4 border-b border-navy-950/10 p-6 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-penguins-100 text-penguins-700">
                    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5h-5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4h-5M12 6.5v11" /></svg>
                </span>
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-penguins-700">Membership</p>
                    <h3 className="mt-1 text-xl font-extrabold text-navy-950">Update membership rates</h3>
                    <p className="mt-2 text-sm leading-6 text-slate">Changes appear on the public membership page immediately.</p>
                </div>
            </header>

            <div className="grid gap-5 p-6 sm:grid-cols-3 sm:p-7">
                {fields.map((field) => (
                    <div key={field.key}>
                        <InputLabel htmlFor={`rate_${field.key}`} value={field.label} />
                        <div className="relative mt-2">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-slate">$</span>
                            <input
                                id={`rate_${field.key}`}
                                type="number"
                                min="0"
                                max="9999.99"
                                step="0.01"
                                inputMode="decimal"
                                value={values[field.key]}
                                onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                                className="block w-full rounded-2xl border-navy-950/20 bg-mist py-3 pl-8 pr-4 text-navy-950 focus:border-penguins-500 focus:ring-penguins-500"
                                required
                            />
                        </div>
                        <p className="mt-2 text-xs text-slate">{field.suffix}</p>
                        <InputError className="mt-2" message={errors[field.key]?.[0]} />
                    </div>
                ))}
            </div>

            <footer className="flex justify-end border-t border-navy-950/10 bg-navy-50/60 px-6 py-5 sm:px-7">
                <PrimaryButton disabled={submitting}>{submitting ? 'Saving…' : 'Save rates'}</PrimaryButton>
            </footer>
        </form>
    );
}
