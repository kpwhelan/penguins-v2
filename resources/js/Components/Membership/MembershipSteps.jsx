import Container from '@/Components/UI/Container';

const steps = [
    {
        number: '01',
        title: 'Come Swim With Us',
        description:
            'Join us for a practice, meet the team, and experience what a Penguins workout is like. There is no pressure—just come see if it feels like the right fit.',
    },
    {
        number: '02',
        title: 'Enjoy Your Complimentary Trial',
        description:
            'Take advantage of a one-month complimentary trial to get comfortable with the workouts, coaches, and team before making a commitment.',
    },
    {
        number: '03',
        title: 'Complete Your Membership',
        description:
            'When you’re ready to continue, complete the Penguins application and join US Masters Swimming within 30 days for insurance coverage.',
    },
    {
        number: '04',
        title: 'Become a Penguin',
        description:
            'Keep improving, enjoy great workouts, build friendships, and become part of the Granite State Penguins community.',
    },
];

export default function MembershipSteps() {
    return (
        <section className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-30">
            <div
                aria-hidden="true"
                className="absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-penguins-100/70 blur-3xl"
            />

            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="eyebrow">
                        Getting Started
                    </p>

                    <h2 className="section-title mt-5">
                        Joining the Penguins is easy.
                    </h2>

                    <p className="lead mx-auto mt-6 max-w-2xl">
                        Whether you’re returning to swimming after years away
                        or already training regularly, we’ll help make your
                        first few weeks comfortable and enjoyable.
                    </p>
                </div>

                <div className="relative mt-16">
                    {/* Desktop lane rope */}
                    <div
                        aria-hidden="true"
                        className="absolute left-[12.5%] right-[12.5%] top-8 hidden items-center lg:flex"
                    >
                        <span className="h-2 flex-1 rounded-full bg-penguins-300" />

                        <span className="mx-2 h-4 w-4 rounded-full border-2 border-white bg-penguins-500 shadow-sm" />

                        <span className="h-2 flex-1 rounded-full bg-penguins-600" />

                        <span className="mx-2 h-4 w-4 rounded-full border-2 border-white bg-penguins-300 shadow-sm" />

                        <span className="h-2 flex-1 rounded-full bg-penguins-500" />

                        <span className="mx-2 h-4 w-4 rounded-full border-2 border-white bg-penguins-600 shadow-sm" />

                        <span className="h-2 flex-1 rounded-full bg-penguins-300" />
                    </div>

                    <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
                        {steps.map((step) => (
                            <article
                                key={step.number}
                                className="relative"
                            >
                                {/* Lane marker */}
                                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-white bg-penguins-600 shadow-card">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-penguins-200 bg-navy-950 text-sm font-extrabold tracking-wide text-white">
                                        {step.number}
                                    </div>
                                </div>

                                <div className="mt-8 rounded-panel border border-navy-950/10 bg-white p-7 shadow-soft">
                                    <h3 className="text-2xl font-extrabold tracking-tight text-navy-950">
                                        {step.title}
                                    </h3>

                                    <p className="mt-4 leading-7 text-slate">
                                        {step.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
