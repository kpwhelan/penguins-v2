import Container from '@/Components/UI/Container';

export default function CommunitySection() {
    return (
        <section className="relative overflow-hidden bg-ice py-20 sm:py-24 lg:py-30">
            <div
                aria-hidden="true"
                className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-penguins-200/60 blur-3xl"
            />

            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
                    {/* Copy */}
                    <div>
                        <p className="eyebrow">
                            Why People Stay
                        </p>

                        <h2 className="section-title mt-5">
                            More than a workout.
                            <span className="block text-penguins-600">
                                It’s the people around you.
                            </span>
                        </h2>

                        <p className="lead mt-6 max-w-2xl">
                            The Granite State Penguins bring together swimmers
                            with different backgrounds, abilities, and goals.
                            Some train for competition. Some swim for fitness.
                            Some simply love starting the day in the water.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div className="flex gap-4">
                                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-penguins-700 shadow-sm">
                                    <svg
                                        aria-hidden="true"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 10a3 3 0 1 0 0-6"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />

                                        <path
                                            d="M2.5 20c.5-4 2.6-6 5.5-6s5 2 5.5 6M14 14c3 0 5 1.7 5.5 5"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>

                                <div>
                                    <h3 className="text-lg font-extrabold text-navy-950">
                                        Different goals, same pool
                                    </h3>

                                    <p className="mt-2 leading-7 text-slate">
                                        Competitive swimmers and fitness-focused
                                        swimmers train side by side and support
                                        each other.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-penguins-700 shadow-sm">
                                    <svg
                                        aria-hidden="true"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M4 17c2.5-2.5 5.5-2.5 8 0s5.5 2.5 8 0"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />

                                        <path
                                            d="M5 12c2-2 4.5-2 6.5 0s4.5 2 7 0"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>

                                <div>
                                    <h3 className="text-lg font-extrabold text-navy-950">
                                        Consistency without pressure
                                    </h3>

                                    <p className="mt-2 leading-7 text-slate">
                                        Show up, do the work, and improve at your
                                        pace without needing every practice to
                                        feel like a race.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-penguins-700 shadow-sm">
                                    <svg
                                        aria-hidden="true"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>

                                <div>
                                    <h3 className="text-lg font-extrabold text-navy-950">
                                        A team worth showing up for
                                    </h3>

                                    <p className="mt-2 leading-7 text-slate">
                                        The workouts matter, but the friendships
                                        and shared experience are what make the
                                        Penguins special.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team photo */}
                    <div className="relative">
                        <div
                            aria-hidden="true"
                            className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-penguins-300/25 blur-3xl"
                        />

                        <div className="relative overflow-hidden rounded-panel shadow-elevated">
                            <img
                                src="/assets/membership-team.webp"
                                alt="Granite State Penguins team members together"
                                className="aspect-[4/3] w-full object-cover"
                            />

                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/40 to-transparent"
                            />

                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-200">
                                    Granite State Penguins
                                </p>

                                <p className="mt-2 max-w-md text-xl font-extrabold leading-tight text-white sm:text-2xl">
                                    Stronger together, in and out of the pool.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
