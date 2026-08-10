import Container from '@/Components/UI/Container';

const membershipDetails = [
    {
        value: '$120',
        label: 'Quarterly Membership',
        description:
            'The regular Penguins membership rate for swimmers who continue with the team.',
        accent: 'Quarterly',
    },
    {
        value: '$10',
        label: 'Daily Drop-In',
        description:
            'Drop in for a practice without committing. If you continue, the fee can be credited toward your first quarter.',
        accent: 'Per visit',
    },
    {
        value: '1 Month',
        label: 'Complimentary Trial',
        description:
            'Spend time swimming with the Penguins and getting to know the team before committing to membership.',
        accent: 'Trial period',
    },
    {
        value: 'USMS',
        label: 'Membership Required',
        description:
            'US Masters Swimming membership is required within 30 days for insurance purposes.',
        accent: 'Within 30 days',
    },
];

export default function MembershipOverview() {
    return (
        <section
            id="membership-details"
            className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-30"
        >
            <div
                aria-hidden="true"
                className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-penguins-100/60 blur-3xl"
            />

            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="eyebrow">
                        Membership at a Glance
                    </p>

                    <h2 className="section-title mt-5">
                        Simple options. Plenty of time to see if the team is right for you.
                    </h2>

                    <p className="lead mx-auto mt-6 max-w-2xl">
                        Start by getting in the water, meet the team, and decide
                        what works best for you.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                    {membershipDetails.map((item) => (
                        <article
                            key={item.label}
                            className="group relative overflow-hidden rounded-panel border border-navy-950/10 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-penguins-400/40 hover:shadow-card"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-penguins-100/70 blur-2xl transition group-hover:bg-penguins-200/80"
                            />

                            <div className="relative">
                                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-700">
                                    {item.accent}
                                </p>

                                <p className="mt-5 text-4xl font-extrabold tracking-[-0.035em] text-navy-950">
                                    {item.value}
                                </p>

                                <h3 className="mt-3 text-lg font-extrabold text-navy-950">
                                    {item.label}
                                </h3>

                                <p className="mt-4 text-sm leading-6 text-slate">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-penguins-500/15 bg-penguins-50 p-5 sm:p-6">
                    <div className="flex gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-penguins-100 text-penguins-700">
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />

                                <path
                                    d="M12 11v5M12 8h.01"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>

                        <p className="text-sm leading-6 text-slate sm:text-base">
                            US Masters Swimming membership fees are separate
                            from Penguins dues and may vary depending on the
                            membership options selected.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
