import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';

export default function MembershipCta() {
    return (
        <section className="relative overflow-hidden bg-penguins-600 py-20 sm:py-24 lg:py-28">
            {/* Background glow */}
            <div
                aria-hidden="true"
                className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -bottom-48 right-0 h-[30rem] w-[30rem] rounded-full bg-navy-950/15 blur-3xl"
            />

            {/* Water lines */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 opacity-20"
            >
                <svg
                    className="h-40 w-full"
                    viewBox="0 0 1440 160"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <path
                        d="M-100 85C120 25 300 30 500 82C700 134 880 136 1080 80C1240 35 1380 34 1540 75"
                        stroke="white"
                        strokeWidth="2"
                    />

                    <path
                        d="M-100 115C120 55 300 60 500 112C700 164 880 166 1080 110C1240 65 1380 64 1540 105"
                        stroke="white"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            <Container>
                <div className="relative z-10 mx-auto max-w-4xl text-center">
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/70">
                        Swim With the Penguins
                    </p>

                    <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                        Ready to find your lane?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                        Learn more about joining the Granite State Penguins,
                        membership options, and what to expect when you swim
                        with the team.
                    </p>

                    <div className="mt-9 flex justify-center">
                        <ButtonLink
                            href={route('membership')}
                            variant="light"
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
                    </div>
                </div>
            </Container>
        </section>
    );
}
