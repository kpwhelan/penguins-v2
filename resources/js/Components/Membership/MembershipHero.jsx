import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';

export default function MembershipHero() {
    return (
        <section className="relative isolate overflow-hidden bg-navy-950 pt-20 text-white lg:pt-24">
            <div className="relative min-h-[32rem] sm:min-h-[36rem] lg:min-h-[40rem]">
                <img
                    src="/assets/membership-hero.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 -z-30 h-full w-full object-cover"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-navy-950/55"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/30"
                />

                <div
                    aria-hidden="true"
                    className="absolute -right-24 top-12 -z-10 h-96 w-96 rounded-full bg-penguins-400/20 blur-[120px]"
                />

                <Container className="flex min-h-[32rem] items-center py-16 sm:min-h-[36rem] sm:py-20 lg:min-h-[40rem] lg:py-24">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-12 bg-penguins-300 sm:w-20" />

                            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-penguins-200 sm:text-sm">
                                Membership
                            </p>
                        </div>

                        <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                            Come swim with
                            <span className="block text-penguins-300">
                                the Penguins.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/75 sm:text-xl lg:text-2xl lg:leading-9">
                            Whether you’re getting back into the pool, looking
                            for structured training, or simply want a great
                            group to swim with, there’s a place for you here.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                            <ButtonLink
                                href="#membership-details"
                                variant="primary"
                                className="w-full sm:w-auto"
                            >
                                Membership Details

                                <svg
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 5v14M7 14l5 5 5-5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </ButtonLink>

                            <ButtonLink
                                href={route('membership.application')}
                                variant="outlineLight"
                                external
                                target="_blank"
                                rel="noreferrer"
                                className="w-full sm:w-auto"
                            >
                                Penguins Application

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
                            </ButtonLink>
                        </div>
                    </div>
                </Container>

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
