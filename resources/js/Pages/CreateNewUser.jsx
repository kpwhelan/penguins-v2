import CreateUserForm from '@/Components/CreateUserForm';
import CreateNewUserContainer from '@/Containers/CreateNewUserContainer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CreateNewUser({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-4xl text-white leading-tight">Admin - Create New User</h2>}
        >
            <Head title='Create New User' />

            <CreateNewUserContainer className='w-[55%] mx-auto texxt-white bg-black p-6 mt-6'>
                <CreateUserForm />
            </CreateNewUserContainer>
        </AuthenticatedLayout>
    );
}
