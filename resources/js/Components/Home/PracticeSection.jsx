import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';

const practiceDays = ['Mon', 'Wed', 'Fri'];

export default function PracticeSection() {
    return (
        <section
            id="practice"
            className="relative overflow-hidden bg-[#eaf8fd] pb-20 pt-36 sm:pb-24 sm:pt-40 lg:pb-30 lg:pt-44"
        >
            {/*
                WAVE TRANSITION

                The Practice section is ice blue.
                These shapes extend the white section above down into it.
            */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-40 sm:h-48 lg:h-52"
            >
                {/* Back / blue wave */}
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1440 220"
                    preserveAspectRatio="none"
                >
                    <path
                        d="
                            M0 0
                            H1440
                            V82
                            C1260 145 1090 153 915 105
                            C730 54 560 55 390 119
                            C240 175 115 168 0 125
                            Z
                        "
                        fill="#bfeeff"
                    />
                </svg>

                {/* Main white wave */}
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1440 220"
                    preserveAspectRatio="none"
                >
                    <path
                        d="
                            M0 0
                            H1440
                            V55
                            C1270 116 1115 124 950 82
                            C775 37 605 40 445 99
                            C280 160 135 150 0 101
                            Z
                        "
                        fill="#ffffff"
                    />
                </svg>
            </div>



            <Container>
                <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                    {/* Photo */}
                    <div className="relative">
                        <div
                            aria-hidden="true"
                            className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-penguins-300/20 blur-3xl"
                        />

                        <div className="relative overflow-hidden rounded-panel shadow-elevated">
                            <img
                                src="/assets/penguins-practice.webp"
                                srcSet="/assets/penguins-practice-960.webp 960w, /assets/penguins-practice.webp 1920w"
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                alt="Granite State Penguins swimmers practicing in the pool"
                                loading="lazy"
                                className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
                            />

                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent"
                            />

                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-200">
                                    Nashua, New Hampshire
                                </p>

                                <p className="mt-2 max-w-md text-xl font-extrabold leading-tight text-white sm:text-2xl">
                                    Early mornings. Good lanes. Better company.
                                </p>
                            </div>
                        </div>

                        {/* Lane rope accent */}
                        <div
                            aria-hidden="true"
                            className="absolute -bottom-5 right-8 hidden w-2/3 items-center gap-2 sm:flex"
                        >
                            <span className="h-2 flex-1 rounded-full bg-penguins-300" />
                            <span className="h-3 w-3 rounded-full bg-white shadow-sm" />
                            <span className="h-2 flex-1 rounded-full bg-penguins-500" />
                            <span className="h-3 w-3 rounded-full bg-white shadow-sm" />
                            <span className="h-2 flex-1 rounded-full bg-penguins-300" />
                        </div>
                    </div>

                    {/* Information */}
                    <div>
                        <p className="eyebrow">
                            Practice With Us
                        </p>

                        <h2 className="section-title mt-5">
                            Three mornings.

                            <span className="block text-penguins-600">
                                One great way to start your day.
                            </span>
                        </h2>

                        <p className="lead mt-6 max-w-xl">
                            Penguins practices bring adult swimmers together for
                            structured morning workouts in a welcoming team
                            environment.
                        </p>

                        {/* Practice days */}
                        <div className="mt-9">
                            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-navy-950/45">
                                Weekly Schedule
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {practiceDays.map((day) => (
                                    <span
                                        key={day}
                                        className="flex h-12 min-w-14 items-center justify-center rounded-xl bg-white px-4 text-sm font-extrabold uppercase tracking-wide text-navy-950 shadow-sm"
                                    >
                                        {day}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Practice details */}
                        <div className="mt-8 border-y border-navy-950/10 py-7">
                            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-950/40">
                                        Time
                                    </p>

                                    <p className="mt-2 text-2xl font-extrabold tracking-tight text-navy-950">
                                        6:30–8:00 AM
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-950/40">
                                        Location
                                    </p>

                                    <p className="mt-2 text-lg font-extrabold leading-6 text-navy-950">
                                        Nashua Boys & Girls Club
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-950/40">
                                        Pool
                                    </p>

                                    <p className="mt-2 font-bold text-navy-950">
                                        5 lanes · 25 yards
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-950/40">
                                        Swimmers
                                    </p>

                                    <p className="mt-2 font-bold text-navy-950">
                                        Adults 18+
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Expectations */}
                        <div className="mt-7">
                            <h3 className="text-xl font-extrabold text-navy-950">
                                What should you expect?
                            </h3>

                            <p className="mt-3 max-w-xl leading-7 text-slate">
                                Swimmers of different experience levels share
                                the pool, work through the same structured
                                practice, and train at a pace that makes sense
                                for their lane.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <ButtonLink
                                href={route('membership')}
                                variant="primary"
                            >
                                Membership Details

                                <svg
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5 12h14M14 7l5 5-5 5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </ButtonLink>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Nashua+Boys+%26+Girls+Club+NH"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-2 py-3 text-sm font-extrabold text-navy-950 transition hover:text-penguins-600"
                            >
                                Get Directions

                                <svg
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 17 17 7M9 7h8v8"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
