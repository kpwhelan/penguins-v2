import Container from '@/Components/UI/Container';

const practiceDays = [
    'Monday',
    'Wednesday',
    'Thursday',
    'Friday',
];

export default function LocationSection() {
    return (
        <section
            id="location"
            className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-30"
        >
            {/* Background accents */}
            <div
                aria-hidden="true"
                className="absolute -right-40 top-16 h-96 w-96 rounded-full bg-penguins-100/60 blur-3xl"
            />

            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
                    {/* Location information */}
                    <div>
                        <p className="eyebrow">
                            Practice Location
                        </p>

                        <h2 className="section-title mt-5">
                            Boys & Girls Club
                            <span className="block text-penguins-600">
                                of Greater Nashua
                            </span>
                        </h2>

                        <p className="lead mt-6 max-w-xl">
                            Penguins practices take place at the Boys & Girls
                            Club of Greater Nashua in a five-lane, 25-yard
                            indoor pool.
                        </p>

                        {/* Address */}
                        <div className="mt-9 flex gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-penguins-100 text-penguins-700">
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinejoin="round"
                                    />

                                    <circle
                                        cx="12"
                                        cy="10"
                                        r="2.5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                </svg>
                            </span>

                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-950/40">
                                    Address
                                </p>

                                <p className="mt-2 text-lg font-extrabold leading-7 text-navy-950">
                                    One Positive Place
                                    <br />
                                    Nashua, NH 03060
                                </p>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="mt-7 flex gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-penguins-100 text-penguins-700">
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6"
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
                                        d="M12 7v5l3 2"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>

                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-950/40">
                                    Practice Time
                                </p>

                                <p className="mt-2 text-lg font-extrabold text-navy-950">
                                    6:30–8:00 AM
                                </p>
                            </div>
                        </div>

                        {/* Days */}
                        <div className="mt-9">
                            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-950/40">
                                Practice Days
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {practiceDays.map((day) => (
                                    <span
                                        key={day}
                                        className="rounded-xl border border-navy-950/10 bg-mist px-4 py-2.5 text-sm font-extrabold text-navy-950"
                                    >
                                        {day}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Directions */}
                        <div className="mt-9">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Boys+%26+Girls+Club+of+Greater+Nashua+One+Positive+Place+Nashua+NH+03060"
                                target="_blank"
                                rel="noreferrer"
                                className="button-primary"
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

                    {/* Map */}
                    <div className="relative">
                        <div
                            aria-hidden="true"
                            className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-penguins-300/20 blur-3xl"
                        />

                        <div className="relative overflow-hidden rounded-panel border border-navy-950/10 bg-mist shadow-elevated">
                            <iframe
                                title="Boys and Girls Club of Greater Nashua"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5859.010724910932!2d-71.48515972384384!3d42.75651637115882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3b72ddd74b829%3A0x644423ad33fcbc6b!2sBoys%20%26%20Girls%20Club%20of%20Greater%20Nashua!5e0!3m2!1sen!2sus!4v1725551342730!5m2!1sen!2sus"
                                className="h-[28rem] w-full border-0 sm:h-[32rem] lg:h-[38rem]"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                            {/* Small map label */}
                            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-soft backdrop-blur-md sm:left-5 sm:right-auto sm:max-w-xs">
                                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-penguins-700">
                                    Home Pool
                                </p>

                                <p className="mt-1 font-extrabold text-navy-950">
                                    Boys & Girls Club of Greater Nashua
                                </p>

                                <p className="mt-1 text-sm text-slate">
                                    One Positive Place · Nashua, NH
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
