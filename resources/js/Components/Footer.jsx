import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-navy-950 text-white">
            {/* Subtle aquatic background accents */}
            <div
                aria-hidden="true"
                className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-penguins-500/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-penguins-700/15 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 opacity-15"
            >
                <svg
                    className="h-28 w-full"
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <path
                        d="M-100 55C110 8 310 10 510 57C710 104 900 108 1100 58C1260 18 1395 17 1540 47"
                        stroke="white"
                        strokeWidth="2"
                    />

                    <path
                        d="M-100 82C110 35 310 37 510 84C710 131 900 135 1100 85C1260 45 1395 44 1540 74"
                        stroke="white"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            <div className="site-container relative z-10">
                <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr_0.85fr] lg:gap-16">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            aria-label="Granite State Penguins home"
                            className="inline-flex"
                        >
                            <ApplicationLogo className="h-auto w-52 sm:w-60" />
                        </Link>

                        <p className="mt-6 max-w-md text-base leading-7 text-white/60">
                            Adult masters swimming in Nashua, New Hampshire.
                            Train hard, improve your swimming, and enjoy the
                            water with the Granite State Penguins.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-300">
                            Explore
                        </p>

                        <nav
                            className="mt-5"
                            aria-label="Footer navigation"
                        >
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-sm font-bold text-white/70 transition hover:text-white"
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={route('about-us')}
                                        className="text-sm font-bold text-white/70 transition hover:text-white"
                                    >
                                        About Us
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={route('membership')}
                                        className="text-sm font-bold text-white/70 transition hover:text-white"
                                    >
                                        Membership
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        href="https://www.usms.org/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 transition hover:text-white"
                                    >
                                        US Masters Swimming

                                        <svg
                                            aria-hidden="true"
                                            className="h-3.5 w-3.5"
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
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Social */}
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-penguins-300">
                            Follow the Penguins
                        </p>

                        <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
                            Check us out on social media for team updates,
                            photos, and everything happening around the pool.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="https://www.facebook.com/granitestatepenguins/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Granite State Penguins on Facebook"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-white transition duration-300 hover:-translate-y-0.5 hover:border-penguins-300/50 hover:bg-penguins-500 hover:text-navy-950"
                            >
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>

                            <a
                                href="https://www.instagram.com/rowdypenguins/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Granite State Penguins on Instagram"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-white transition duration-300 hover:-translate-y-0.5 hover:border-penguins-300/50 hover:bg-penguins-500 hover:text-navy-950"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 py-7">
                    <div className="flex flex-col gap-3 text-center text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                        <p>
                            &copy; {year} Granite State Penguins. All rights reserved.
                        </p>

                        <p>
                            Nashua, New Hampshire
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
