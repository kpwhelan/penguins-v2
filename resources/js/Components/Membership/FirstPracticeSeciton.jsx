import ButtonLink from '@/Components/UI/ButtonLink';
import Container from '@/Components/UI/Container';
import ContactForm from '@/Components/ContactForm';

export default function FirstPracticeSection() {
    return (
        <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
            {/* Background accents */}
            <div
                aria-hidden="true"
                className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-penguins-400/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-penguins-300/10 blur-3xl"
            />

            <Container>
                {/* Section heading */}
                <div className="grid items-end gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <div>
                        <p className="eyebrow-light">
                            Your First Practice
                        </p>

                        <h2 className="section-title-light mt-4">
                            Ready for your
                            <span className="block text-penguins-300">
                                first swim?
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-2xl text-lg leading-8 text-white/65 lg:pb-1">
                        Getting started is simple. Complete the application,
                        bring the basics, and reach out if there’s anything
                        you’d like to know before your first morning with the
                        Penguins.
                    </p>
                </div>

                {/* Main content */}
                <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
                    {/* Getting started */}
                    <div className="rounded-panel border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm sm:p-8">
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-300">
                            Before You Arrive
                        </p>

                        <h3 className="mt-4 text-2xl font-extrabold text-white">
                            A few quick things to take care of.
                        </h3>

                        <ul className="mt-7 space-y-5">
                            <ChecklistItem>
                                Download and complete the Penguins application.
                            </ChecklistItem>

                            <ChecklistItem>
                                Bring your swimsuit and goggles.
                            </ChecklistItem>

                            <ChecklistItem>
                                Come ready to enjoy your complimentary one-month
                                trial.
                            </ChecklistItem>
                        </ul>

                        <div className="my-8 h-px bg-white/10" />

                        <div>
                            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/45">
                                Have a Question?
                            </p>

                            <div className="mt-4 flex flex-col gap-1">
                                <p className="text-xl font-extrabold text-white">
                                    Chris Landry
                                </p>

                                <a
                                    href="tel:6038806303"
                                    className="w-fit text-lg font-bold text-penguins-200 transition hover:text-white"
                                >
                                    (603) 880-6303
                                </a>
                            </div>

                            <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
                                Chris can help answer questions about joining,
                                practices, or anything else you’d like to know
                                before getting started.
                            </p>
                        </div>

                        <div className="mt-8">
                            <ButtonLink
                                href="https://penguins.nyc3.cdn.digitaloceanspaces.com/GSP-Application.pdf"
                                external
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                            >
                                Download Application

                                <svg
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 4v11M8 11l4 4 4-4M5 20h14"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </ButtonLink>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="rounded-panel bg-white p-7 shadow-elevated sm:p-8 lg:p-10">
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-700">
                            Contact the Penguins
                        </p>

                        <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-950">
                            Still have questions?
                        </h3>

                        <p className="mt-4 max-w-xl leading-7 text-slate">
                            Send us a message and someone from the team will get
                            back to you with whatever information you need.
                        </p>

                        <div className="mt-7">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function ChecklistItem({ children }) {
    return (
        <li className="flex items-start gap-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-penguins-500/15 text-penguins-200">
                <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="m5 12 4 4L19 6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>

            <span className="leading-7 text-white/75">
                {children}
            </span>
        </li>
    );
}
