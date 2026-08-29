import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Checkbox from '@/Components/Checkbox';
import toast, { Toaster } from 'react-hot-toast';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        street_address: user.street_address,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
        is_sharing_info: user.is_sharing_info === '1' ? true : false,
        emergency_contact: user.emergency_contact,
        emergency_contact_phone: user.emergency_contact_phone
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            onSuccess: () => notifySuccess('Information Updated Successfully!'),
        });
    };

    return (
        <section className={className}>
            <header>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-700">Member details</p>
                <h2 className="mt-2 text-2xl font-extrabold text-navy-950">Profile information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Keep your contact and emergency information current for the club.
                </p>
            </header>

            <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

            <form onSubmit={submit} className="mt-7 grid gap-5 text-black sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />

                    <TextInput
                        id="first_name"
                        className="mt-1 block w-full"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        isFocused
                        autoComplete="first_name"
                    />

                    <InputError className="mt-2" message={errors.first_name} />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        className="mt-1 block w-full"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        isFocused
                        autoComplete="last_name"
                    />

                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                <div className="sm:col-span-2">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <TextInput
                        id="phone_number"
                        className="mt-1 block w-full"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        isFocused
                        autoComplete="phone_number"
                    />

                    <InputError className="mt-2" message={errors.phone_number} />
                </div>

                <div>
                    <InputLabel htmlFor="street_address" value="Street Address" />

                    <TextInput
                        id="street_address"
                        className="mt-1 block w-full"
                        value={data.street_address}
                        onChange={(e) => setData('street_address', e.target.value)}
                        isFocused
                        autoComplete="street_address"
                    />

                    <InputError className="mt-2" message={errors.street_address} />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="City" />

                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        isFocused
                        autoComplete="city"
                    />

                    <InputError className="mt-2" message={errors.city} />
                </div>

                <div>
                    <InputLabel htmlFor="state" value="State" />

                    <TextInput
                        id="state"
                        className="mt-1 block w-full"
                        value={data.state}
                        onChange={(e) => setData('state', e.target.value)}
                        isFocused
                        autoComplete="state"
                    />

                    <InputError className="mt-2" message={errors.state} />
                </div>

                <div>
                    <InputLabel htmlFor="zipcode" value="ZIP" />

                    <TextInput
                        id="zipcode"
                        className="mt-1 block w-full"
                        value={data.zipcode}
                        onChange={(e) => setData('zipcode', e.target.value)}
                        isFocused
                        autoComplete="zipcode"
                    />

                    <InputError className="mt-2" message={errors.zipcode} />
                </div>

                <div>
                    <InputLabel htmlFor="emergency_contact" value="Emergency Contact Name" />

                    <TextInput
                        id="emergency_contact"
                        className="mt-1 block w-full"
                        value={data.emergency_contact}
                        onChange={(e) => setData('emergency_contact', e.target.value)}
                        isFocused
                        autoComplete="emergency_contact"
                    />

                    <InputError className="mt-2" message={errors.emergency_contact} />
                </div>

                <div>
                    <InputLabel htmlFor="emergency_contact_phone" value="Emergency Contact Phone" />

                    <TextInput
                        id="emergency_contact_phone"
                        className="mt-1 block w-full"
                        value={data.emergency_contact_phone}
                        onChange={(e) => setData('emergency_contact_phone', e.target.value)}
                        isFocused
                        autoComplete="emergency_contact_phone"
                    />

                    <InputError className="mt-2" message={errors.emergency_contact_phone} />
                </div>

                <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-navy-950/10 bg-mist p-5">
                        <Checkbox className="mt-1" name="is_sharing_info" checked={data.is_sharing_info} onChange={(e) => setData('is_sharing_info', e.target.checked)} />
                        <span><span className="block font-extrabold text-navy-950">Include me in the member directory</span><span className="mt-1 block text-sm leading-6 text-slate">Share my contact information with other signed-in Penguins members.</span></span>
                    </label>

                    <InputError className="mt-2" message={errors.is_sharing_info} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="sm:col-span-2">
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 sm:col-span-2">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
