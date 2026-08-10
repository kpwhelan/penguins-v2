import Container from '@/Components/UI/Container';

const bringItems = [
    'Practice suit',
    'Goggles',
    'Fins are recommended',
    'Paddles are optional',
];

const providedItems = [
    'Kickboards',
    'Pull buoys',
];

function CheckItem({ children }) {
    return (
        <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-penguins-100 text-penguins-700">
                <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="m5 12 4 4L19 6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>

            <span className="font-semibold leading-7 text-navy-950">
                {children}
            </span>
        </li>
    );
}

export default function EquipmentSection() {
    return (
        <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-30">
            <div
                aria-hidden="true"
                className="absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-penguins-100/60 blur-3xl"
            />

            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    {/* Photo */}
                    <div className="relative mx-auto w-full max-w-md lg:mx-0">
                        <div
                            aria-hidden="true"
                            className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-penguins-300/25 blur-3xl"
                        />

                        <div className="relative overflow-hidden rounded-panel shadow-elevated">
                            <img
                                src="/assets/membership-swimmers.webp"
                                alt="Granite State Penguins swimmers underwater"
                                className="aspect-[4/5] w-full object-cover"
                            />

                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent"
                            />

                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-200">
                                    Keep It Simple
                                </p>

                                <p className="mt-2 text-xl font-extrabold leading-tight text-white">
                                    You don’t need a huge gear bag to get started.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <p className="eyebrow">
                            What to Bring
                        </p>

                        <h2 className="section-title mt-5">
                            A few basics are all you need.
                        </h2>

                        <p className="lead mt-6 max-w-2xl">
                            Bring the essentials you normally use for a swim
                            workout. The pool already provides some of the
                            larger equipment, so getting started is easy.
                        </p>

                        <div className="mt-10 grid gap-10 sm:grid-cols-2">
                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-700">
                                    Bring With You
                                </p>

                                <ul className="mt-5 space-y-4">
                                    {bringItems.map((item) => (
                                        <CheckItem key={item}>
                                            {item}
                                        </CheckItem>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-700">
                                    Provided at the Pool
                                </p>

                                <ul className="mt-5 space-y-4">
                                    {providedItems.map((item) => (
                                        <CheckItem key={item}>
                                            {item}
                                        </CheckItem>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10 rounded-2xl border border-penguins-500/15 bg-penguins-50 p-5 sm:p-6">
                            <div className="flex gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-penguins-100 text-penguins-700">
                                    <svg
                                        aria-hidden="true"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M4 12c3-3 6-3 9 0s6 3 7 1"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />

                                        <path
                                            d="M5 16c2.5-2.5 5-2.5 7.5 0"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>

                                <p className="text-sm leading-6 text-slate sm:text-base">
                                    If you’re returning to swimming and don’t
                                    have every piece of equipment yet, that’s
                                    completely fine. Start with the basics and
                                    add gear over time if you need it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
