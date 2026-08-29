import InputError from './InputError';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function MembershipApplicationUploadForm({ className = '' }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        if (!file) return;
        const form = event.currentTarget;

        setSubmitting(true);
        setError('');

        const formData = new FormData();
        formData.append('application_file', file);

        try {
            const response = await axios.post(route('membership.application.store'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setFile(null);
            form.reset();
            toast.success(response.data.message);
        } catch (uploadError) {
            const validationError = uploadError.response?.data?.errors?.application_file?.[0];
            const message = validationError
                ?? uploadError.response?.data?.message
                ?? 'The membership application could not be updated.';

            setError(message);
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={submit} className={`overflow-hidden rounded-panel border border-navy-950/15 bg-white shadow-card ${className}`}>
            <Toaster toastOptions={{ duration: 8000, style: { marginTop: '10px' } }} />

            <header className="flex items-start gap-4 border-b border-navy-950/10 p-6 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-penguins-100 text-penguins-700">
                    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5M9.5 14h5M12 11v6" /></svg>
                </span>
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-penguins-700">Membership</p>
                    <h3 className="mt-1 text-xl font-extrabold text-navy-950">Replace the application</h3>
                    <p className="mt-2 text-sm leading-6 text-slate">Upload a new PDF to replace the application linked on the public site.</p>
                </div>
            </header>

            <div className="p-6 sm:p-7">
                <InputLabel htmlFor="membership_application" value="Application PDF" />
                <label htmlFor="membership_application" className="mt-2 flex min-h-24 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-navy-950/25 bg-mist px-5 py-4 transition hover:border-penguins-600 hover:bg-penguins-50">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-penguins-700 shadow-sm">PDF</span>
                    <span className="min-w-0"><span className="block truncate text-sm font-extrabold text-navy-950">{file?.name ?? 'Choose a PDF'}</span><span className="mt-1 block text-xs text-slate">Maximum file size: 10 MB</span></span>
                    <input id="membership_application" type="file" accept="application/pdf,.pdf" onChange={(event) => setFile(event.target.files[0] ?? null)} className="sr-only" />
                </label>
                <InputError className="mt-2" message={error} />
            </div>

            <footer className="flex items-center justify-between gap-4 border-t border-navy-950/10 bg-navy-50/60 px-6 py-5 sm:px-7">
                <a href={route('membership.application')} target="_blank" rel="noreferrer" className="text-xs font-bold text-penguins-700 hover:text-penguins-950">View current application</a>
                <PrimaryButton disabled={!file || submitting}>{submitting ? 'Uploading…' : 'Replace application'}</PrimaryButton>
            </footer>
        </form>
    );
}
