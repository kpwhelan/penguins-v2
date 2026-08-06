import FeatureCard from '@/Components/Home/FeatureCard';
import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';

const features = [
    {
        title: 'Train With Purpose',
        description:
            'Consistent, structured workouts help you build fitness, improve technique, and keep moving forward without having to figure it all out alone.',
        icon: (
            <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M4 17c2.5-2.5 5.5-2.5 8 0s5.5 2.5 8 0"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />

                <path
                    d="M5 12c2-2 4.5-2 6.5 0s4.5 2 7 0"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />

                <circle
                    cx="8"
                    cy="7"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
            </svg>
        ),
    },
    {
        title: 'Find Your Lane',
        description:
            'Different abilities train side by side, with swimmers settling into the pace and lane that fits where they are right now.',
        icon: (
            <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 10a3 3 0 1 0 0-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />

                <path
                    d="M2.5 20c.5-4 2.6-6 5.5-6s5 2 5.5 6M14 14c3 0 5 1.7 5.5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: 'Enjoy Showing Up',
        description:
            'The work matters, but so does the group around you. The Penguins are serious about swimming without taking every morning too seriously.',
        icon: (
            <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />

                <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />

                <path
                    d="M12 12 18 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

export default function WhySwimSection() {
    return (
        <section
            id="about-us-section"
            className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-30"
        >
            {/* Background accent */}
            <div
                aria-hidden="true"
                className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-penguins-100/60 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute right-0 top-1/2 h-px w-40 bg-gradient-to-l from-penguins-400/70 to-transparent sm:w-72"
            />

            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="eyebrow">
                        Why Swim With Us
                    </p>

                    <h2 className="section-title mt-5">
                        Good workouts are better when you actually want to show up.
                    </h2>

                    <p className="lead mx-auto mt-6 max-w-2xl">
                        The Penguins bring together adult swimmers with different
                        backgrounds, abilities, and goals — giving everyone a place
                        to train, improve, and enjoy the water.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                        >
                            {feature.description}
                        </FeatureCard>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <ButtonLink
                        href={route('membership')}
                        variant="secondary"
                    >
                        Learn About Membership

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
