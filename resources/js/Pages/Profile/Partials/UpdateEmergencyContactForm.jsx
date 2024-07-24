import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';

export default function UpdateEmergencyContactForm({ className }) {
    const user = usePage().props.auth.user;
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const { data, setData, errors, patch, reset, processing, recentlySuccessful } = useForm({
        emergency_contact: user.emergency_contact,
        emergency_contact_phone: user.emergency_contact_phone,
    });

    const submitEmergency = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            onSuccess: () => notifySuccess('Information Updated Successfully!'),
            onError: (errors) => console.log(errors)
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Emergency Contact</h2>
            </header>

            <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

            <form onSubmit={submitEmergency} className="mt-6 space-y-6 text-black">
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
