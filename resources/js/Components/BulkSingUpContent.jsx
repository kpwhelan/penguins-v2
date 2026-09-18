import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { useMemo, useState } from 'react';

function formatDate(value) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
}

export default function BulkSignUpContent({ members, bulkEditSelectedDays, toggleSetDisplayBulkSignUpModal, submitBulkSignUp, processing }) {
    const [selectedUser, setSelectedUser] = useState('');
    const [query, setQuery] = useState('');
    const sortedMembers = useMemo(() => [...members].sort((first, second) => {
        const firstName = `${first.first_name} ${first.last_name}`;
        const secondName = `${second.first_name} ${second.last_name}`;

        return firstName.localeCompare(secondName, undefined, { sensitivity: 'base' });
    }), [members]);
    const filteredMembers = query.trim() === ''
        ? sortedMembers
        : sortedMembers.filter((member) => `${member.first_name} ${member.last_name}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
    const selectedMember = sortedMembers.find((member) => String(member.id) === selectedUser);
    const selectedLabel = selectedUser === 'clear'
        ? 'Clear existing assignments'
        : selectedMember
            ? `${selectedMember.first_name} ${selectedMember.last_name}`
            : '';

    return (
        <div>
            <div className="bg-navy-950 p-6 text-white sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-300">Administration</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white">Assign selected dates</h2>
                <p className="mt-3 text-sm text-white/65">Update {bulkEditSelectedDays.length} {bulkEditSelectedDays.length === 1 ? 'practice date' : 'practice dates'} at once.</p>
            </div>

            <div className="p-6 sm:p-8">
                <label htmlFor="bulk-user" className="text-sm font-extrabold text-navy-950">Swimmer or action</label>
                <Combobox value={selectedUser} onChange={(value) => setSelectedUser(value ?? '')} onClose={() => setQuery('')}>
                    <div className="relative mt-2">
                        <ComboboxInput
                            id="bulk-user"
                            aria-label="Search for a swimmer or action"
                            displayValue={() => selectedLabel}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search swimmers…"
                            autoComplete="off"
                            className="block min-h-12 w-full rounded-xl border-navy-950/15 bg-white py-3 pl-4 pr-12 text-navy-950 placeholder:text-slate/70 focus:border-penguins-500 focus:ring-penguins-500"
                        />
                        <ComboboxButton className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-slate transition hover:text-navy-950" aria-label="Show swimmer list">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m5 7.5 5 5 5-5" />
                            </svg>
                        </ComboboxButton>
                    </div>
                    <ComboboxOptions
                        anchor={{ to: 'bottom', gap: 8 }}
                        className="z-[60] max-h-72 w-[var(--input-width)] overflow-y-auto rounded-xl border border-navy-950/10 bg-white p-2 shadow-elevated [--anchor-max-width:calc(100vw-3rem)] empty:invisible focus:outline-none"
                    >
                        {query.trim() === '' && (
                            <ComboboxOption value="clear" className="group flex cursor-pointer items-center rounded-lg px-3 py-3 text-sm font-bold text-red-700 outline-none data-[focus]:bg-red-50">
                                Clear existing assignments
                            </ComboboxOption>
                        )}
                        {filteredMembers.map((member) => (
                            <ComboboxOption key={member.id} value={String(member.id)} className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm font-bold text-navy-950 outline-none data-[focus]:bg-penguins-50 data-[selected]:text-penguins-800">
                                <span>{member.first_name} {member.last_name}</span>
                                <span className="hidden text-penguins-700 group-data-[selected]:inline" aria-hidden="true">✓</span>
                            </ComboboxOption>
                        ))}
                        {filteredMembers.length === 0 && (
                            <div className="px-3 py-4 text-sm text-slate">No swimmers match “{query.trim()}”.</div>
                        )}
                    </ComboboxOptions>
                </Combobox>

                <div className="mt-6 rounded-2xl bg-mist p-4">
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate">Selected dates</p>
                    <div className="mt-3 flex max-h-36 flex-wrap gap-2 overflow-y-auto">
                        {bulkEditSelectedDays.map((day) => <span key={day} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-navy-950 shadow-sm">{formatDate(day)}</span>)}
                    </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <SecondaryButton onClick={toggleSetDisplayBulkSignUpModal} disabled={processing}>Cancel</SecondaryButton>
                    <PrimaryButton onClick={() => submitBulkSignUp(selectedUser)} disabled={processing || !selectedUser}>{processing ? 'Updating…' : selectedUser === 'clear' ? 'Clear assignments' : 'Assign dates'}</PrimaryButton>
                </div>
            </div>
        </div>
    );
}
