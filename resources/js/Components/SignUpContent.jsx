import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

function formatDate(value) {
    if (!value) return '';
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
}

export default function SignUpContent({ signUpDate, submitSignUp, toggleSetDisplaySignUpModal, isSignUpOverride, processing }) {
    return (
        <div>
            <div className="bg-navy-950 p-6 text-white sm:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-penguins-500 text-navy-950">
                    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /></svg>
                </span>
                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-300">Deck duty signup</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white">{isSignUpOverride ? 'Take over this date?' : 'Volunteer for this date?'}</h2>
                <p className="mt-3 text-white/65">{formatDate(signUpDate)}</p>
            </div>

            <div className="p-6 sm:p-8">
                {isSignUpOverride
                    ? <p className="leading-7 text-slate">Another swimmer is currently assigned. Confirming will replace their assignment with yours.</p>
                    : <p className="leading-7 text-slate">You’ll be responsible for deck duty at this practice. A reminder will be sent before your scheduled date.</p>}

                <div className="mt-5 rounded-2xl bg-penguins-50 p-4 text-sm font-bold text-navy-950">Please arrive no later than 6:20 AM.</div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <SecondaryButton onClick={toggleSetDisplaySignUpModal} disabled={processing}>Cancel</SecondaryButton>
                    <PrimaryButton onClick={submitSignUp} disabled={processing}>{processing ? 'Saving…' : isSignUpOverride ? 'Replace assignment' : 'Confirm signup'}</PrimaryButton>
                </div>
            </div>
        </div>
    );
}
