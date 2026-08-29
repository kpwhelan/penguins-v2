import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';

const quickFacts = [
    {
        value: '3',
        label: 'Practices Each Week',
        detail: 'Monday, Wednesday & Friday',
    },
    {
        value: '6:30',
        label: 'Morning Start',
        detail: 'Practices run until 8:00 AM',
    },
    {
        value: '18+',
        label: 'Adult Swimmers',
        detail: 'A wide range of abilities and experience',
    },
    {
        value: '25 yd',
        label: 'Home Pool',
        detail: 'Five lanes in Nashua, New Hampshire',
    },
];

export default function WhoWeAreSection() {
    return (
        <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-30">
            <div
                aria-hidden="true"
                className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-penguins-100/60 blur-3xl"
            />

            <Container>
                <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
                    <div>
                        <p className="eyebrow">
                            Who Are the Penguins?
                        </p>

                        <h2 className="section-title mt-5">
                            A team for serious swimmers,
                            <span className="block text-penguins-600">
                                casual swimmers, and everyone in between.
                            </span>
                        </h2>

                        <p className="lead mt-6 max-w-2xl">
                            The Granite State Penguins are a masters swimming
                            team based in Nashua, New Hampshire. Our swimmers
                            range from highly competitive athletes to adults
                            who simply want structured workouts, better fitness,
                            and a great group to train with.
                        </p>

                        <p className="mt-6 max-w-2xl leading-7 text-slate">
                            Practices are structured, a team member is on deck
                            during workouts, and swimmers settle into lanes
                            based on pace and ability. Some members race locally,
                            regionally, or nationally. Others never compete at
                            all.
                        </p>

                        <p className="mt-6 max-w-2xl leading-7 text-slate">
                            What matters most is showing up, doing the work, and
                            enjoying the water with people who want you to
                            succeed.
                        </p>

                        <div className="mt-9">
                            <ButtonLink
                                href={route('membership')}
                                variant="secondary"
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

                    <div className="grid gap-4 sm:grid-cols-2">
                        {quickFacts.map((fact) => (
                            <article
                                key={fact.label}
                                className="rounded-panel border border-navy-950/10 bg-mist p-6 shadow-soft"
                            >
                                <p className="text-4xl font-extrabold tracking-[-0.035em] text-penguins-600">
                                    {fact.value}
                                </p>

                                <h3 className="mt-3 text-lg font-extrabold text-navy-950">
                                    {fact.label}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate">
                                    {fact.detail}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
