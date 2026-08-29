import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function Register({ member, submitUrl }) {
    const [complete, setComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const { data, setData, errors, setError, reset } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();
        setProcessing(true);

        axios.post(submitUrl, data)
            .then(() => {
                reset('password', 'password_confirmation');
                setComplete(true);
            })
            .catch((error) => {
                if (error.response?.status === 422) setError(error.response.data.errors ?? {});
                else setError('password', 'This invitation is no longer valid. Ask Chris for a new link.');
            })
            .finally(() => setProcessing(false));
    };

    return (
        <GuestLayout>
            <Head title="Finish registration" />

            <div className="mb-8 text-center">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-penguins-500">Private invitation</p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950">
                    {complete ? 'Your account is ready' : `Welcome, ${member.first_name}`}
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate">
                    {complete ? 'Your password has been saved and your invitation is now closed.' : `Create a password for ${member.email}.`}
                </p>
            </div>

            {!complete ? (
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel htmlFor="password" value="Create a password" />
                        <TextInput id="password" type="password" value={data.password} className="mt-2 block w-full" autoComplete="new-password" autoFocus required onChange={(event) => setData('password', event.target.value)} />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm password" />
                        <TextInput id="password_confirmation" type="password" value={data.password_confirmation} className="mt-2 block w-full" autoComplete="new-password" required onChange={(event) => setData('password_confirmation', event.target.value)} />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        {processing ? 'Finishing setup…' : 'Finish registration'}
                    </PrimaryButton>
                    <p className="text-center text-xs leading-5 text-slate">This link expires 48 hours after it was sent and works only once.</p>
                </form>
            ) : (
                <Link href={route('login')} className="block">
                    <PrimaryButton className="w-full justify-center">Sign in</PrimaryButton>
                </Link>
            )}
        </GuestLayout>
    );
}
