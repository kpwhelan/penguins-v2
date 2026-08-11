import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';

export default function AboutHero() {
    return (
        <section className="relative isolate overflow-hidden bg-navy-950 pt-20 text-white lg:pt-24">
            <div className="relative min-h-[36rem] sm:min-h-[40rem] lg:min-h-[44rem]">
                <img
                    src="/assets/about-hero.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
                />

                {/* Dark overlay */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-navy-950/25"
                />

                {/* Left-to-right gradient for text readability */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950/90 via-navy-950/65 to-navy-950/10"
                />

                {/* Bottom fade */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-navy-950/60 to-transparent"
                />

                {/* Background glow */}
                <div
                    aria-hidden="true"
                    className="absolute -right-28 top-20 -z-10 h-96 w-96 rounded-full bg-penguins-400/20 blur-[120px]"
                />

                <Container className="flex min-h-[36rem] items-center py-16 sm:min-h-[40rem] sm:py-20 lg:min-h-[44rem] lg:py-24">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-12 bg-penguins-300 sm:w-20" />

                            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-penguins-200 sm:text-sm">
                                About the Penguins
                            </p>
                        </div>

                        <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                            More than
                            <span className="block text-penguins-300">
                                a swim team.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/80 sm:text-xl lg:text-2xl lg:leading-9">
                            We’re a community of adult swimmers who challenge
                            one another, support one another, and genuinely
                            enjoy being in the water together.
                        </p>

                        <div className="mt-9">
                            <ButtonLink
                                href={route('membership')}
                                variant="primary"
                            >
                                Explore Membership

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

                {/* Wave transition */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-16 overflow-hidden"
                >
                    <svg
                        className="h-full w-full"
                        viewBox="0 0 1440 100"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 67C184 31 352 31 536 60C733 91 933 91 1128 53C1261 27 1362 25 1440 39V100H0V67Z"
                            fill="#ffffff"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
