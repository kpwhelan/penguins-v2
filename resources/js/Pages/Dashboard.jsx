import NewsUploadForm from '@/Components/NewsUploadForm';
import MembershipApplicationUploadForm from '@/Components/MembershipApplicationUploadForm';
import SwimmerBioUploadForm from '@/Components/SwimmerBioUploadForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function StatIcon({ type }) {
    return (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-penguins-100 text-penguins-700">
            <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {type === 'count' ? (
                    <><path d="M5 8v8M19 8v8M2.5 10v4M21.5 10v4M5 12h14" /></>
                ) : (
                    <><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M8 3v5M16 3v5M4 10h16" /></>
                )}
            </svg>
        </span>
    );
}

export default function Dashboard({ auth, deck_duty_count, next_deck_duty }) {
    const hasMetQuarterlyDutyGoal = deck_duty_count >= 2;
    const remainingDutyDates = Math.max(0, 2 - deck_duty_count);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-penguins-300">Member Dashboard</p>
                    <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Good morning, {auth.user.first_name}.</h1>
                    <p className="mt-3 max-w-2xl text-white/60">Here’s what’s happening with your Penguins membership and deck-duty schedule.</p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <section className="grid gap-5 xl:grid-cols-2">
                <article className="surface-card p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-5">
                        <div>
                            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate">Current Quarter</p>
                            <p className="mt-4 text-5xl font-extrabold tracking-[-0.04em] text-navy-950">{deck_duty_count}<span className="ml-1 text-2xl text-penguins-600">{deck_duty_count === 1 ? 'time' : 'times'}</span></p>
                        </div>
                        <StatIcon type="count" />
                    </div>
                    <p className="mt-5 leading-7 text-slate">
                        {hasMetQuarterlyDutyGoal
                            ? 'Nice work—thank you for helping keep practices running smoothly.'
                            : `Choose ${remainingDutyDates} more ${remainingDutyDates === 1 ? 'date' : 'dates'} to reach the two-times-per-quarter deck-duty goal.`}
                    </p>
                    <Link href={route('calendar')} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-penguins-700 transition hover:text-penguins-950">
                        View deck-duty calendar <span aria-hidden="true">→</span>
                    </Link>
                </article>

                <article className="surface-card p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-5">
                        <div>
                            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate">Next Deck Duty</p>
                            <p className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-navy-950 sm:text-4xl">
                                {next_deck_duty?.date ?? 'Nothing scheduled'}
                            </p>
                        </div>
                        <StatIcon type="calendar" />
                    </div>
                    <p className="mt-5 leading-7 text-slate">
                        {next_deck_duty
                            ? 'Your next scheduled date is on the calendar. Thank you for taking a turn on deck.'
                            : 'Choose an available Monday, Wednesday, or Friday morning to add your next date.'}
                    </p>
                    <Link href={route('calendar')} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-penguins-700 transition hover:text-penguins-950">
                        {next_deck_duty ? 'Review the calendar' : 'Choose a date'} <span aria-hidden="true">→</span>
                    </Link>
                </article>
            </section>

            <section className="mt-6 overflow-hidden rounded-panel bg-navy-950 shadow-elevated">
                <div className="grid lg:grid-cols-[1fr_1.15fr]">
                    <div className="flex flex-col justify-center p-7 sm:p-10">
                        <p className="eyebrow-light">This Week at the Pool</p>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">Show up ready. We’ll take it from there.</h2>
                        <p className="mt-5 leading-7 text-white/60">Practices run Monday, Wednesday, and Friday from 6:30–8:00 AM at the Boys & Girls Club of Greater Nashua.</p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link href={route('workouts')} className="button-primary">Browse workouts</Link>
                            <Link href={route('directory')} className="button-outline-light">Team directory</Link>
                        </div>
                    </div>
                    <img src="/assets/underwater.webp" alt="Swimmer training underwater" loading="lazy" className="h-full min-h-72 w-full object-cover" />
                </div>
            </section>

            {!!auth.user.is_admin && (
                <section className="mt-10">
                    <div>
                        <p className="eyebrow">Administration</p>
                        <h2 className="section-title mt-3">Publish team updates.</h2>
                        <p className="mt-3 max-w-2xl leading-7 text-slate">Manage the news and swimmer profiles displayed on the public website.</p>
                    </div>
                    <div className="mt-6 grid gap-6 xl:grid-cols-2">
                        <NewsUploadForm className="min-w-0" />
                        <SwimmerBioUploadForm className="min-w-0" />
                        <MembershipApplicationUploadForm className="min-w-0 xl:col-span-2" />
                    </div>
                </section>
            )}
        </AuthenticatedLayout>
    );
}
