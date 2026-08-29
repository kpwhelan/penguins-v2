import InputError from './InputError';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';
import TextInput from './TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function SwimmerBioUploadForm({ className = '' }) {
    const [fileData, setFileData] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const { data, setData, errors, reset, setError } = useForm({ swimmer_name: '', body: '' });

    const submit = (event) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        if (fileData) formData.append('swimmer_image', fileData);
        formData.append('swimmer_name', data.swimmer_name);
        formData.append('body', data.body);

        axios.post(route('swimmer-bios.store'), formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                if (response.data.success) {
                    reset();
                    setFileData(null);
                    document.querySelector('#swimmer-bio-form')?.reset();
                    toast.success(response.data.message);
                }
            })
            .catch((error) => {
                if (error.response?.status === 422) setError(error.response.data.errors ?? {});
                toast.error(error.response?.data?.message ?? 'The swimmer profile could not be published.');
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <form onSubmit={submit} id="swimmer-bio-form" className={`overflow-hidden rounded-panel border border-navy-950/15 bg-white shadow-card ${className}`}>
            <Toaster toastOptions={{ duration: 8000, style: { marginTop: '10px' } }} />

            <header className="flex items-start gap-4 border-b border-navy-950/10 p-6 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-penguins-100 text-penguins-700">
                    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3" /><path d="M5.5 20c.4-4 2.5-6 6.5-6s6.1 2 6.5 6" /></svg>
                </span>
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-penguins-700">Swimmer spotlight</p>
                    <h3 className="mt-1 text-xl font-extrabold text-navy-950">Publish a swimmer bio</h3>
                    <p className="mt-2 text-sm leading-6 text-slate">Introduce a teammate and share their story on the public site.</p>
                </div>
            </header>

            <div className="space-y-5 p-6 sm:p-7">
                <div>
                    <InputLabel htmlFor="swimmer_image" value="Swimmer photo" />
                    <label htmlFor="swimmer_image" className="mt-2 flex min-h-24 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-navy-950/25 bg-mist px-5 py-4 transition hover:border-penguins-600 hover:bg-penguins-50">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-penguins-700 shadow-sm">
                            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 16V4m0 0L8 8m4-4 4 4M5 14v5h14v-5" /></svg>
                        </span>
                        <span className="min-w-0"><span className="block truncate text-sm font-extrabold text-navy-950">{fileData?.name ?? 'Choose a portrait'}</span><span className="mt-1 block text-xs text-slate">JPG or PNG recommended</span></span>
                        <input id="swimmer_image" type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(event) => setFileData(event.target.files[0] ?? null)} className="sr-only" />
                    </label>
                    <InputError className="mt-2" message={errors.swimmer_image} />
                </div>

                <div>
                    <InputLabel htmlFor="swimmer_name" value="Swimmer name" />
                    <TextInput id="swimmer_name" className="mt-2 block w-full" value={data.swimmer_name} onChange={(event) => setData('swimmer_name', event.target.value)} autoComplete="off" />
                    <InputError className="mt-2" message={errors.swimmer_name} />
                </div>

                <div>
                    <div className="flex items-center justify-between gap-4"><InputLabel htmlFor="swimmer_body" value="Biography" /><span className="text-xs text-slate">{data.body.length} characters</span></div>
                    <textarea id="swimmer_body" value={data.body} onChange={(event) => setData('body', event.target.value)} className="mt-2 block min-h-48 w-full resize-y rounded-xl border-navy-950/15 bg-white px-4 py-3 text-sm leading-6 text-navy-950 shadow-sm focus:border-penguins-500 focus:ring-penguins-500" placeholder="Tell their swimming story…" />
                    <InputError className="mt-2" message={errors.body} />
                </div>
            </div>

            <footer className="flex items-center justify-between gap-4 border-t border-navy-950/10 bg-navy-50/60 px-6 py-5 sm:px-7">
                <p className="text-xs leading-5 text-slate">Appears in the swimmer spotlight section.</p>
                <PrimaryButton disabled={submitting}>{submitting ? 'Publishing…' : 'Publish bio'}</PrimaryButton>
            </footer>
        </form>
    );
}
