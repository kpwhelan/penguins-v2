import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';

export default function AboutCta() {
    return (
        <section className="relative overflow-hidden bg-penguins-600 py-16 text-white sm:py-20">
            <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-navy-950/15 blur-3xl"
            />

            <Container className="relative">
                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <div className="max-w-3xl">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-navy-950/65">
                            Your Lane Is Waiting
                        </p>
                        <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                            The best way to meet the Penguins is to swim with us.
                        </h2>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                            Your first month is complimentary, giving you time
                            to experience the workouts and get to know the team.
                        </p>
                    </div>

                    <ButtonLink
                        href={route('membership')}
                        variant="light"
                        className="w-full shrink-0 sm:w-auto"
                    >
                        Plan Your First Swim
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
            </Container>
        </section>
    );
}
