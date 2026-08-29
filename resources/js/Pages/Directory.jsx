import DirectoryListingCard from '@/Components/DirectoryListingCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Directory({ auth, users }) {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredUsers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return users;
        return users.filter((user) => `${user.first_name ?? ''} ${user.last_name ?? ''}`.toLowerCase().includes(query));
    }, [searchTerm, users]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-penguins-300">Team</p><h1 className="mt-2 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Member Directory</h1><p className="mt-3 text-white/60">Find and connect with your fellow Penguins.</p></div>}
        >
            <Head title="Directory" />

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div><p className="eyebrow">Penguins Members</p><p className="mt-2 text-sm text-slate">Showing {filteredUsers.length} of {users.length} members</p></div>
                <div className="w-full sm:max-w-sm">
                    <label htmlFor="member-search" className="sr-only">Search members by name</label>
                    <div className="relative">
                        <svg aria-hidden="true" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
                        <input id="member-search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="min-h-12 w-full rounded-xl border border-navy-950/10 bg-white py-3 pl-12 pr-4 text-navy-950 shadow-sm focus:border-penguins-500 focus:outline-none focus:ring-4 focus:ring-penguins-100" type="search" placeholder="Search by name…" />
                    </div>
                </div>
            </div>

            {filteredUsers.length > 0 ? (
                <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredUsers.map((user) => <DirectoryListingCard key={user.id} user={user} />)}
                </div>
            ) : (
                <div className="surface-card mt-7 p-10 text-center"><h2 className="text-xl font-extrabold text-navy-950">No members found</h2><p className="mt-2 text-slate">Try another first or last name.</p></div>
            )}
        </AuthenticatedLayout>
    );
}
