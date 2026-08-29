export default function DirectoryListingCard({ user }) {
    const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase();
    const location = [user.city, user.state].filter(Boolean).join(', ');

    return (
        <article className="surface-card-interactive p-6">
            <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-penguins-100 text-lg font-extrabold text-penguins-800">
                    {initials || 'GP'}
                </span>
                <div className="min-w-0">
                    <h2 className="text-xl font-extrabold tracking-tight text-navy-950">{user.first_name} {user.last_name}</h2>
                    {location && <p className="mt-1 text-sm font-semibold text-slate">{location}</p>}
                </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-navy-950/10 pt-5 text-sm">
                {user.street_address && (
                    <p className="leading-6 text-slate">{user.street_address}{location && <><br />{location} {user.zipcode}</>}</p>
                )}
                {user.phone_number && <a className="block font-bold text-navy-950 transition hover:text-penguins-700" href={`tel:${user.phone_number}`}>{user.phone_number}</a>}
                <a className="block break-all font-bold text-penguins-700 transition hover:text-penguins-950" href={`mailto:${user.email}`}>{user.email}</a>
            </div>
        </article>
    );
}
