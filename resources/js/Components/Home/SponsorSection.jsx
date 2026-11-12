import Container from '@/Components/UI/Container';

export default function SponsorSection() {
    return (
        <section aria-labelledby="website-sponsor-heading" className="bg-mist py-14 sm:py-18">
            <Container>
                <div className="grid items-center gap-8 rounded-panel border border-navy-950/10 bg-white p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-14">
                    <div className="flex justify-center lg:border-r lg:border-navy-950/10 lg:pr-14">
                        <img
                            src="/assets/wellspring-dental-group-logo.png"
                            alt="Wellspring Dental Group"
                            width="255"
                            height="149"
                            loading="lazy"
                            className="h-auto w-52 max-w-full sm:w-[255px]"
                        />
                    </div>

                    <div className="text-center lg:text-left">
                        <p className="eyebrow">Our Website Sponsor</p>
                        <h2 id="website-sponsor-heading" className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-3xl">
                            Thank you, Wellspring Dental Group.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate lg:mx-0">
                            We’re grateful to Wellspring Dental Group for sponsoring
                            the Granite State Penguins website and supporting our
                            swimming community.
                        </p>
                        <a
                            href="https://www.wellspringdentalgroup.com/"
                            target="_blank"
                            rel="sponsored noopener noreferrer"
                            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-extrabold text-penguins-800 underline decoration-penguins-300 underline-offset-4 transition hover:text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-penguins-600"
                        >
                            Visit Wellspring Dental Group
                            <span className="sr-only"> (opens in a new tab)</span>
                            <svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17 17 7M7 7h10v10" />
                            </svg>
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}
