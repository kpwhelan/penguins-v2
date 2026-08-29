import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { useState } from 'react';

function formatDate(value) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
}

export default function BulkSignUpContent({ members, bulkEditSelectedDays, toggleSetDisplayBulkSignUpModal, submitBulkSignUp, processing }) {
    const [selectedUser, setSelectedUser] = useState('');

    return (
        <div>
            <div className="bg-navy-950 p-6 text-white sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-300">Administration</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white">Assign selected dates</h2>
                <p className="mt-3 text-sm text-white/65">Update {bulkEditSelectedDays.length} {bulkEditSelectedDays.length === 1 ? 'practice date' : 'practice dates'} at once.</p>
            </div>

            <div className="p-6 sm:p-8">
                <label htmlFor="bulk-user" className="text-sm font-extrabold text-navy-950">Swimmer or action</label>
                <select id="bulk-user" value={selectedUser} onChange={(event) => setSelectedUser(event.target.value)} className="mt-2 block min-h-12 w-full rounded-xl border-navy-950/15 bg-white px-4 text-navy-950 focus:border-penguins-500 focus:ring-penguins-500">
                    <option value="">Choose a swimmer</option>
                    <option value="clear">Clear existing assignments</option>
                    {members.map((user) => <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>)}
                </select>

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
