import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Field({ label, name, type = 'text', value, error, onChange, required = false, className = '', autoComplete }) {
    return (
        <div className={className}>
            <InputLabel htmlFor={name} value={`${label}${required ? ' *' : ''}`} />
            <TextInput
                id={name}
                name={name}
                type={type}
                className="mt-2 block w-full"
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
                autoComplete={autoComplete}
                required={required}
            />
            <InputError className="mt-2" message={error} />
        </div>
    );
}

function SectionHeading({ number, title, description }) {
    return (
        <div className="mb-5 flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-penguins-100 text-sm font-extrabold text-navy-950">{number}</span>
            <div>
                <h2 className="text-lg font-extrabold text-navy-950">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate">{description}</p>
            </div>
        </div>
    );
}

export default function CreateUserForm({ className = '' }) {
    const [processing, setProcessing] = useState(false);
    const { data, setData, errors, reset, setError } = useForm({
        first_name: '', last_name: '', email: '', phone_number: '', street_address: '', city: '', state: '', zipcode: '',
        is_sharing_info: false, emergency_contact: '', emergency_contact_phone: '',
    });

    const submit = (event) => {
        event.preventDefault();
        setProcessing(true);

        axios.post(route('users.store'), data)
            .then((response) => {
                setProcessing(false);
                reset();
                document.querySelector('#user-upload-form')?.reset();
                if (response.data.success) toast.success(response.data.message);
            })
            .catch((error) => {
                setProcessing(false);
                if (error.response?.status === 500 && !error.response.data.success) toast.error(error.response.data.message);
                if (error.response?.status === 422 && error.response.data.errors) setError(error.response.data.errors);
            });
    };

    return (
        <section className={className}>
            <Toaster toastOptions={{ duration: 8000, style: { marginTop: '10px' } }} />
            <form onSubmit={submit} id="user-upload-form" className="divide-y divide-navy-950/10">
                <section className="p-6 sm:p-8">
                    <SectionHeading number="1" title="Member details" description="The member will use this email address to finish setting up their account." />
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="First name" name="first_name" value={data.first_name} error={errors.first_name} onChange={setData} required autoComplete="given-name" />
                        <Field label="Last name" name="last_name" value={data.last_name} error={errors.last_name} onChange={setData} required autoComplete="family-name" />
                        <Field label="Email address" name="email" type="email" value={data.email} error={errors.email} onChange={setData} required autoComplete="email" className="sm:col-span-2" />
                    </div>
                </section>

                <section className="p-6 sm:p-8">
                    <SectionHeading number="2" title="Contact information" description="Optional details that help the club keep its member records current." />
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
                        <Field label="Phone number" name="phone_number" value={data.phone_number} error={errors.phone_number} onChange={setData} autoComplete="tel" className="sm:col-span-2 lg:col-span-3" />
                        <Field label="Street address" name="street_address" value={data.street_address} error={errors.street_address} onChange={setData} autoComplete="street-address" className="sm:col-span-2 lg:col-span-3" />
                        <Field label="City" name="city" value={data.city} error={errors.city} onChange={setData} autoComplete="address-level2" className="lg:col-span-3" />
                        <Field label="State" name="state" value={data.state} error={errors.state} onChange={setData} autoComplete="address-level1" className="lg:col-span-1" />
                        <Field label="ZIP code" name="zipcode" value={data.zipcode} error={errors.zipcode} onChange={setData} autoComplete="postal-code" className="lg:col-span-2" />
                    </div>
                </section>

                <section className="p-6 sm:p-8">
                    <SectionHeading number="3" title="Emergency contact" description="Add someone the club can reach if assistance is ever needed during a workout." />
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Contact name" name="emergency_contact" value={data.emergency_contact} error={errors.emergency_contact} onChange={setData} />
                        <Field label="Contact phone" name="emergency_contact_phone" value={data.emergency_contact_phone} error={errors.emergency_contact_phone} onChange={setData} autoComplete="tel" />
                    </div>
                </section>

                <section className="bg-navy-950/[0.025] p-6 sm:p-8">
                    <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-5 transition hover:border-penguins-500/50">
                        <Checkbox className="mt-1" name="is_sharing_info" checked={data.is_sharing_info} onChange={(event) => setData('is_sharing_info', event.target.checked)} />
                        <span>
                            <span className="block font-extrabold text-navy-950">Include in the member directory</span>
                            <span className="mt-1 block text-sm leading-6 text-slate">Allow other signed-in Penguins members to see this member's shared contact information.</span>
                        </span>
                    </label>
                    <InputError className="mt-2" message={errors.is_sharing_info} />

                    <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <p className="text-sm text-slate"><span className="font-bold text-navy-950">*</span> Required information</p>
                        <PrimaryButton disabled={processing}>{processing ? 'Creating member…' : 'Create member & send invitation'}</PrimaryButton>
                    </div>
                </section>
            </form>
        </section>
    );
}
