import Container from '@/Components/UI/Container';

const values = [
    {
        title: 'Welcoming by Design',
        description:
            'You do not need recent racing experience—or any interest in racing—to be a Penguin. Curiosity and a willingness to swim are enough.',
    },
    {
        title: 'Better Together',
        description:
            'Teammates share lanes, encouragement, and plenty of laughs. The community is every bit as important as the workout.',
    },
    {
        title: 'Competition Is Optional',
        description:
            'Some Penguins compete locally, regionally, and nationally. Others swim for fitness, triathlon training, or a great start to the day.',
    },
];

export default function TeamCultureSection() {
    return (
        <section className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-30">
            <div
                aria-hidden="true"
                className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-penguins-100/70 blur-3xl"
            />

            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="eyebrow">What Brings Us Together</p>
                    <h2 className="section-title mt-5">
                        Different speeds. Different goals.
                        <span className="block text-penguins-600">
                            One team.
                        </span>
                    </h2>
                    <p className="lead mx-auto mt-6 max-w-2xl">
                        The Penguins make room for ambition without making
                        competition a requirement. Everyone contributes to the
                        energy on deck and in the water.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
                    {values.map((value) => (
                        <article
                            key={value.title}
                            className="surface-card relative overflow-hidden p-7 sm:p-8"
                        >
                            <span
                                aria-hidden="true"
                                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-penguins-100 text-penguins-700"
                            >
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5 12.5 9.25 17 19 7"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>

                            <h3 className="card-title">{value.title}</h3>
                            <p className="mt-3 leading-7 text-slate">
                                {value.description}
                            </p>
                        </article>
                    ))}
                </div>

                <figure className="mt-12 overflow-hidden rounded-panel bg-navy-950 shadow-elevated lg:mt-16">
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                        <img
                            src="/assets/membership-team.webp"
                            alt="Granite State Penguins teammates together at the pool"
                            className="h-full min-h-72 w-full object-cover"
                        />
                        <figcaption className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                            <p className="eyebrow-light">Penguin Spirit</p>
                            <blockquote className="mt-5 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                                “Show up, do the work, and help make the lane
                                better for everyone in it.”
                            </blockquote>
                            <p className="mt-5 leading-7 text-white/60">
                                That is the heart of the team: steady effort,
                                shared encouragement, and enjoying the water
                                together.
                            </p>
                        </figcaption>
                    </div>
                </figure>
            </Container>
        </section>
    );
}
