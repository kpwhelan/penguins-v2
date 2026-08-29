import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import UpdateEmergencyContactForm from './Partials/UpdateEmergencyContactForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-penguins-300">Account Settings</p><h1 className="mt-2 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Your Profile</h1><p className="mt-3 text-white/60">Keep your member details and account security up to date.</p></div>}
        >
            <Head title="Profile" />

            <div>
                <div className="mx-auto max-w-6xl space-y-6">
                    <div className="rounded-panel border border-navy-950/10 bg-white p-5 shadow-soft sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-4xl"
                        />
                    </div>

                    <div className="grid items-start gap-6 lg:grid-cols-2">
                        <div className="rounded-panel border border-navy-950/10 bg-white p-5 shadow-soft sm:p-8">
                            <UpdatePasswordForm />
                        </div>

                        <div className="rounded-panel border border-red-200 bg-white p-5 shadow-soft sm:p-8">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
