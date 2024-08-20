import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Checkbox from '@/Components/Checkbox';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function CreateUserForm({ mustVerifyEmail, status, className = '' }) {
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const { data, setData, errors, processing, recentlySuccessful } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        street_address: '',
        city: '',
        state: '',
        zipcode: '',
        is_sharing_info: false,
        emergency_contact: '',
        emergency_contact_phone: ''
    });

    const submit = (e) => {
        e.preventDefault();
       axios.post(route('register'), data)
       .then(res => console.log('hi'))
       .catch(error => console.log(error));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-medium">User Information</h2>

                <p className="mt-1 text-sm">
                    Once form is submitted, a new user account will be created. <br />
                    and an email will be sent to the email address provided with a token <br />
                    they will use to complete registration.
                </p>

                <p className="mt-2 text-sm">
                    **Only first and last name and email are required**
                </p>
            </header>

            <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

            <form onSubmit={submit} className="mt-6 space-y-6 text-black">
                <div>
                    <InputLabel className='text-white' htmlFor="first_name" value="First Name" />

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
                    <InputLabel className='text-white' htmlFor="last_name" value="Last Name" />

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

                <div>
                    <InputLabel className='text-white' htmlFor="email" value="Email" />

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
                    <InputLabel className='text-white' htmlFor="phone_number" value="Phone Number" />

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
                    <InputLabel className='text-white' htmlFor="street_address" value="Street Address" />

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
                    <InputLabel className='text-white' htmlFor="city" value="City" />

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
                    <InputLabel className='text-white' htmlFor="state" value="State" />

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
                    <InputLabel className='text-white' htmlFor="zipcode" value="ZIP" />

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
                    <InputLabel className='text-white' htmlFor="emergency_contact" value="Emergency Contact Name" />

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
                    <InputLabel className='text-white' htmlFor="emergency_contact_phone" value="Emergency Contact Phone" />

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

                <div>
                    {/* <InputLabel htmlFor="is_sharing_info" value="Share Info?" /> */}

                    {/* <TextInput
                        id="zipcode"
                        className="mt-1 block w-full"
                        value={data.zipcode}
                        onChange={(e) => setData('zipcode', e.target.value)}
                        isFocused
                        autoComplete="zipcode"
                    /> */}

                    <span className="mr-2 text-md text-white">Share Info?</span>

                    <Checkbox
                        name="is_sharing_info"
                        checked={data.is_sharing_info}
                        onChange={(e) => setData('is_sharing_info', e.target.checked)}
                    />

                    <InputError className="mt-2" message={errors.is_sharing_info} />
                </div>

                <div className="flex items-center gap-4">
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
