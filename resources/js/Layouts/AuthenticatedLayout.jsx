import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const memberLinks = [
    { label: 'Dashboard', routeName: 'dashboard', icon: 'home' },
    { label: 'Deck Duty', routeName: 'calendar', icon: 'calendar' },
    { label: 'Workouts', routeName: 'workouts', icon: 'workout' },
    { label: 'Directory', routeName: 'directory', icon: 'people' },
];

const adminLinks = [
    { label: 'Create Member', routeName: 'create-new-user', icon: 'addUser' },
    { label: 'Invitations', routeName: 'registration-status', icon: 'mail' },
];

function NavIcon({ name }) {
    const paths = {
        home: <><path d="M4 11.5 12 5l8 6.5" /><path d="M6.5 10v9h11v-9M10 19v-5h4v5" /></>,
        calendar: <><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M8 3v5M16 3v5M4 10h16" /></>,
        workout: <><path d="M5 8v8M19 8v8M2.5 10v4M21.5 10v4M5 12h14" /></>,
        people: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.4-3.2 2.2-5 5.5-5s5.1 1.8 5.5 5" /><path d="M15 5.5a3 3 0 0 1 0 5.8M16 14c2.8.2 4.2 1.9 4.5 4.5" /></>,
        addUser: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.4-3.2 2.2-5 5.5-5s5.1 1.8 5.5 5M18 8v6M15 11h6" /></>,
        mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
        profile: <><circle cx="12" cy="8" r="3" /><path d="M5.5 20c.4-4 2.5-6 6.5-6s6.1 2 6.5 6" /></>,
        logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" /></>,
    };

    return (
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {paths[name]}
        </svg>
    );
}

function PortalLink({ item, onClick }) {
    const active = route().current(item.routeName);

    return (
        <Link
            href={route(item.routeName)}
            onClick={onClick}
            className={[
                'flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition',
                active
                    ? 'bg-penguins-500 text-navy-950 shadow-soft'
                    : 'text-white/65 hover:bg-white/[0.07] hover:text-white',
            ].join(' ')}
        >
            <NavIcon name={item.icon} />
            {item.label}
        </Link>
    );
}

function SidebarContent({ user, onNavigate }) {
    return (
        <>
            <div>
                <Link href={route('home')} onClick={onNavigate} className="inline-flex rounded-xl bg-white p-2 shadow-soft" aria-label="Granite State Penguins homepage">
                    <ApplicationLogo className="h-auto w-44" />
                </Link>

                <p className="mt-8 px-3 text-xs font-extrabold uppercase tracking-[0.18em] text-white/35">Member Portal</p>
                <nav className="mt-3 space-y-1" aria-label="Member navigation">
                    {memberLinks.map((item) => <PortalLink key={item.routeName} item={item} onClick={onNavigate} />)}
                </nav>

                {!!user.is_admin && (
                    <>
                        <p className="mt-8 px-3 text-xs font-extrabold uppercase tracking-[0.18em] text-white/35">Administration</p>
                        <nav className="mt-3 space-y-1" aria-label="Administration navigation">
                            {adminLinks.map((item) => <PortalLink key={item.routeName} item={item} onClick={onNavigate} />)}
                        </nav>
                    </>
                )}
            </div>

            <div className="border-t border-white/10 pt-5">
                <div className="mb-4 flex items-center gap-3 px-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-penguins-500 text-sm font-extrabold text-navy-950">
                        {(user.first_name?.[0] ?? 'P').toUpperCase()}{(user.last_name?.[0] ?? '').toUpperCase()}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-white">{user.first_name} {user.last_name}</p>
                        <p className="truncate text-xs text-white/45">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Link href={route('profile.edit')} onClick={onNavigate} className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] px-3 py-3 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
                        <NavIcon name="profile" /> Profile
                    </Link>
                    <Link href={route('logout')} method="post" as="button" className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] px-3 py-3 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
                        <NavIcon name="logout" /> Log out
                    </Link>
                </div>
            </div>
        </>
    );
}

export default function Authenticated({ user, header, children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    return (
        <div className="member-portal grid min-h-screen bg-[#e8f0f4] text-ink lg:grid-cols-[17rem_minmax(0,1fr)]">
            <aside className="sticky top-0 hidden h-screen flex-col justify-between overflow-y-auto bg-navy-950 p-5 lg:flex">
                <SidebarContent user={user} />
            </aside>

            <div className="min-w-0">
                <header className="sticky top-0 z-40 flex min-h-18 items-center justify-between border-b border-navy-950/10 bg-white/95 px-5 backdrop-blur lg:hidden">
                    <Link href={route('home')} aria-label="Granite State Penguins homepage">
                        <ApplicationLogo className="h-auto w-40" />
                    </Link>
                    <button type="button" onClick={() => setMobileMenuOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-950/10 text-navy-950" aria-label="Open member navigation" aria-expanded={mobileMenuOpen}>
                        <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
                    </button>
                </header>

                {header && (
                    <header className="relative overflow-hidden bg-navy-950 px-5 py-8 text-white sm:px-8 lg:px-10 lg:py-10">
                        <div aria-hidden="true" className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-penguins-500/15 blur-3xl" />
                        <div className="relative [&_h1]:text-white [&_h2]:text-white">{header}</div>
                    </header>
                )}

                <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
            </div>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} aria-label="Close member navigation" />
                    <aside className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col justify-between overflow-y-auto bg-navy-950 p-5 shadow-elevated">
                        <div className="mb-5 flex justify-end">
                            <button type="button" onClick={() => setMobileMenuOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white" aria-label="Close member navigation">
                                <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
                            </button>
                        </div>
                        <SidebarContent user={user} onNavigate={() => setMobileMenuOpen(false)} />
                    </aside>
                </div>
            )}
        </div>
    );
}
