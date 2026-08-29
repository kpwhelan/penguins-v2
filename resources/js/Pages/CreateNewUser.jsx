import CreateUserForm from '@/Components/CreateUserForm';
import CreateNewUserContainer from '@/Containers/CreateNewUserContainer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CreateNewUser({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-penguins-300">Administration</p><h1 className="mt-2 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Create a Member</h1><p className="mt-3 text-white/60">Add a swimmer and send their registration invitation.</p></div>}
        >
            <Head title='Create New User' />

            <div className="mx-auto grid max-w-6xl items-start gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
                <aside className="rounded-panel bg-navy-950 p-6 text-white shadow-soft xl:sticky xl:top-8">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-penguins-500 text-xl font-extrabold text-navy-950">+</span>
                    <h2 className="mt-5 text-xl font-extrabold text-white">A simple first step</h2>
                    <p className="mt-3 text-sm leading-6 text-white/65">Create the member record here. We’ll email them a secure link so they can complete their own registration.</p>
                    <div className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-white/55">
                        Only their name and email are required. Everything else can be added now or updated later.
                    </div>
                </aside>

                <CreateNewUserContainer className="overflow-hidden rounded-panel border border-navy-950/10 bg-white shadow-soft">
                    <CreateUserForm />
                </CreateNewUserContainer>
            </div>
        </AuthenticatedLayout>
    );
}
