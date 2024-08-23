import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const [processing, setProcessing] = useState(false);
    const [displayForm, setDisplayForm] = useState(true);
    const { data, setData, post, errors, setError, reset } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
    });

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        setProcessing(true);

        axios.post(route('token-register'), data)
        .then(res => {
            setProcessing(false);
            setError({});

            let form = document.querySelector('#user-upload-form');
            reset();
            form.reset();

            setDisplayForm(false);

            if (res.data.success) {
                notifySuccess(response.data.message)
            }
        })
        .catch(error => {
            setProcessing(false);
            // setDisplayForm(true);

            if (error.response.status === 500 && !error.response.data.success) {
                notifyError(error.response.data.message);
            }

            if (error.response.status === 422 && error.response.data.errors) {
                let responseErrors = {};

                for (const [key, value] of Object.entries(error.response.data.errors)) {
                    responseErrors[key] = value;
                }

                setError(responseErrors)
            }
        })
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

            {displayForm &&
                <form onSubmit={submit} id='user-upload-form'>
                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            // required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password - Create a new password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            // required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            // required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="token" value="Token" />

                        <TextInput
                            id="token"
                            name="token"
                            value={data.token}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('token', e.target.value)}
                            // required
                        />

                        <InputError message={errors.token} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link> */}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            }

            {!displayForm &&
                <div className="w-[60%] mx-auto text-center">
                    <p className='mb-4 text-lg'>Registration Successul!</p>

                    <a href={route('login')}>
                        <PrimaryButton>
                            Login
                        </PrimaryButton>
                    </a>
                </div>
            }
        </GuestLayout>
    );
}
