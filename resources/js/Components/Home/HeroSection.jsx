import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';
import PracticeDeck from '@/Components/Home/PracticeDeck';

export default function HeroSection() {
    return (
        <section className="relative isolate overflow-hidden bg-navy-950 pt-20 text-white lg:pt-24">
            <div className="relative min-h-[38rem] lg:min-h-[calc(100vh-12rem)]">
                <video
                    className="absolute inset-0 -z-30 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/swim-background.jpg"
                    aria-hidden="true"
                >
                    <source
                        src="/assets/welcome-background-video.mp4"
                        type="video/mp4"
                    />
                </video>

                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-navy-950/55"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950 via-navy-950/75 to-navy-950/20"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-t from-navy-950 via-navy-950/65 to-transparent"
                />

                <div
                    aria-hidden="true"
                    className="absolute -right-20 top-1/4 -z-10 h-96 w-96 rounded-full bg-penguins-400/20 blur-[120px]"
                />

                <Container className="flex min-h-[38rem] items-center py-14 sm:py-16 lg:min-h-[calc(100vh-18rem)] lg:py-20">
                    <div className="max-w-5xl">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-12 bg-penguins-300 sm:w-20" />

                            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-penguins-200 sm:text-sm">
                                Granite State Penguins
                            </p>
                        </div>

                        <h1 className="mt-7 max-w-5xl text-5xl font-extrabold leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl xl:text-8xl">
                            Find your pace.
                            <span className="block text-penguins-300">
                                Push your limits.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-white/75 sm:text-xl lg:text-2xl lg:leading-9">
                            Adult masters swimming in Nashua for swimmers
                            who want stronger training, sharper technique,
                            and a team that makes showing up worthwhile.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                            <ButtonLink
                                href={route('membership')}
                                variant="primary"
                                className="w-full sm:w-auto"
                            >
                                Try a Practice

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

                            <ButtonLink
                                href="#about-us-section"
                                variant="outlineLight"
                                className="w-full sm:w-auto"
                            >
                                Meet the Team
                            </ButtonLink>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm font-bold uppercase tracking-[0.12em] text-white/55">
                            <span>Adult Masters Swimming</span>
                            <span className="text-penguins-300">•</span>
                            <span>Nashua, New Hampshire</span>
                            <span className="text-penguins-300">•</span>
                            <span>All Experience Levels</span>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="relative pb-20 sm:pb-24 lg:pb-28">
                <PracticeDeck />
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-navy-950"
            />

            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-10 overflow-hidden"
            >
                <svg
                    className="h-full w-full"
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <path
                        d="M0 56C184 14 338 9 540 42C752 77 969 81 1162 39C1278 14 1366 10 1440 24V80H0V56Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
