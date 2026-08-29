import Container from '@/Components/UI/Container';

const trainingDetails = [
    {
        title: 'Technique First',
        description:
            'Stroke mechanics, starts, turns, and pacing are woven into practices so every swimmer can move through the water more efficiently.',
    },
    {
        title: 'A Plan With Purpose',
        description:
            'Workouts follow weekly and seasonal progressions, shifting from skill development to endurance and race preparation throughout the year.',
    },
    {
        title: 'Your Pace, Your Goals',
        description:
            'Lanes are organized by pace and ability. The workout is shared, but the challenge is always appropriate for the swimmer in the lane.',
    },
];

export default function TrainingSection() {
    return (
        <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24 lg:py-30">
            <div
                aria-hidden="true"
                className="absolute -right-32 top-16 h-96 w-96 rounded-full bg-penguins-500/10 blur-3xl"
            />

            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                    <div className="relative mx-auto w-full max-w-lg lg:mx-0">
                        <div className="overflow-hidden rounded-panel border border-white/10 shadow-elevated">
                            <img
                                src="/assets/membership-swimmers.webp"
                                alt="Penguins swimmers training together underwater"
                                className="aspect-[4/5] w-full object-cover"
                            />

                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent"
                            />

                            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-200">
                                    Typical Practice
                                </p>
                                <p className="mt-2 text-2xl font-extrabold text-white">
                                    2,500–4,000 yards
                                </p>
                                <p className="mt-1 text-sm text-white/65">
                                    Adapted by lane, pace, and experience
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="eyebrow-light">How We Train</p>

                        <h2 className="section-title-light mt-5">
                            Thoughtful workouts.
                            <span className="block text-penguins-300">
                                Progress you can feel.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                            Each morning has structure and intention. A team
                            member is on deck, the workout is ready, and every
                            lane has a clear path through the session.
                        </p>

                        <div className="mt-9 grid gap-5">
                            {trainingDetails.map((detail, index) => (
                                <article
                                    key={detail.title}
                                    className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-penguins-400/15 text-sm font-extrabold text-penguins-200">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-extrabold text-white">
                                            {detail.title}
                                        </h3>
                                        <p className="mt-2 leading-7 text-white/60">
                                            {detail.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
