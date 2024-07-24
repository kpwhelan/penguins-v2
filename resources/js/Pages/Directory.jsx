import DirectoryListingCard from '@/Components/DirectoryListingCard';
import DirectoryListingsContainer from '@/Containers/DirectoryListingsContainer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Directory({ auth, users }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-4xl text-white leading-tight">Directory</h2>}
        >
            <Head title="Directory" />

            <div className="w-full mt-6 ml-[5%]">
                <input onChange={handleSearch} id="search-bar" className="text-black w-80 rounded-md" type="text" placeholder="Search by name..." aria-label="Search" />
            </div>

            <DirectoryListingsContainer className='w-[90%] mx-auto flex flex-wrap justify-between'>
                {users.map(user => {
                    if (searchTerm.length === 0) return <DirectoryListingCard key={user.id} user={user} />
                    if (searchTerm.length > 0 && (user.first_name.toLowerCase().includes(searchTerm) || user.last_name.toLowerCase().includes(searchTerm))) {
                        return <DirectoryListingCard key={user.id} user={user} />
                    }
                })}
            </DirectoryListingsContainer>
        </AuthenticatedLayout>
    );
}
