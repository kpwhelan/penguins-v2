import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const publicLinks = [
    {
        label: 'Home',
        href: '/',
        routeName: null,
    },
    {
        label: 'About Us',
        href: route('about-us'),
        routeName: 'about-us',
    },
    {
        label: 'Membership',
        href: route('membership'),
        routeName: 'membership',
    },
];

function DesktopNavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={[
                'relative inline-flex items-center py-2 text-sm font-bold transition-colors duration-300',
                active
                    ? 'text-penguins-600'
                    : 'text-navy-950 hover:text-penguins-700',
            ].join(' ')}
        >
            {children}

            <span
                aria-hidden="true"
                className={[
                    'absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-penguins-500 transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0',
                ].join(' ')}
            />
        </Link>
    );
}

function MobileNavLink({ href, active, onClick, children }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={[
                'flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-bold transition-colors',
                active
                    ? 'bg-penguins-100 text-penguins-800'
                    : 'text-navy-950 hover:bg-mist hover:text-penguins-700',
            ].join(' ')}
        >
            {children}
        </Link>
    );
}

export default function WelcomePageNav({ className = '' }) {
    const { auth } = usePage().props;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const user = auth?.user;

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 16);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!mobileMenuOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const isActive = (routeName) => {
        if (routeName === null) {
            return window.location.pathname === '/';
        }

        return route().current(routeName);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <header
                className={[
                    'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                    hasScrolled
                        ? 'border-b border-navy-950/10 bg-white/95 shadow-soft backdrop-blur-xl'
                        : 'border-b border-white/10 bg-white/90 backdrop-blur-lg',
                    className,
                ].join(' ')}
            >
                <nav
                    className="site-container"
                    aria-label="Main navigation"
                >
                    <div className="flex min-h-20 items-center justify-between gap-6 lg:min-h-24">
                        <Link
                            href="/"
                            className="flex shrink-0 items-center"
                            aria-label="Granite State Penguins home"
                            onClick={closeMobileMenu}
                        >
                            <ApplicationLogo className="h-auto w-44 sm:w-52 lg:w-60" />
                        </Link>

                        <div className="hidden items-center gap-8 lg:flex">
                            {publicLinks.map((link) => (
                                <DesktopNavLink
                                    key={link.label}
                                    href={link.href}
                                    active={isActive(link.routeName)}
                                >
                                    {link.label}
                                </DesktopNavLink>
                            ))}

                            <a
                                href="https://www.usms.org/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 py-2 text-sm font-bold text-navy-950 transition-colors hover:text-penguins-700"
                            >
                                US Masters Swimming

                                <svg
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M14 5h5v5M19 5l-9 9"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    <path
                                        d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>

                        <div className="hidden items-center gap-3 lg:flex">
                            {user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="button-dark"
                                >
                                    Team Dashboard

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
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex min-h-12 items-center px-3 text-sm font-bold text-navy-950 transition-colors hover:text-penguins-700"
                                    >
                                        Member Login
                                    </Link>

                                    <Link
                                        href={route('membership')}
                                        className="button-primary"
                                    >
                                        Swim With Us

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
                                    </Link>
                                </>
                            )}
                        </div>

                        <button
                            type="button"
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy-950/10 bg-white text-navy-950 shadow-sm transition hover:border-penguins-500 hover:text-penguins-700 lg:hidden"
                            aria-label={
                                mobileMenuOpen
                                    ? 'Close navigation menu'
                                    : 'Open navigation menu'
                            }
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-navigation"
                            onClick={() => {
                                setMobileMenuOpen((current) => !current);
                            }}
                        >
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        d="M6 6l12 12M18 6 6 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                ) : (
                                    <path
                                        d="M4 7h16M4 12h16M4 17h16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                <div
                    id="mobile-navigation"
                    className={[
                        'overflow-hidden border-t border-navy-950/10 bg-white transition-all duration-300 lg:hidden',
                        mobileMenuOpen
                            ? 'max-h-[36rem] opacity-100'
                            : 'max-h-0 border-transparent opacity-0',
                    ].join(' ')}
                >
                    <div className="site-container py-5">
                        <div className="space-y-1">
                            {publicLinks.map((link) => (
                                <MobileNavLink
                                    key={link.label}
                                    href={link.href}
                                    active={isActive(link.routeName)}
                                    onClick={closeMobileMenu}
                                >
                                    {link.label}
                                </MobileNavLink>
                            ))}

                            <a
                                href="https://www.usms.org/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-navy-950 transition-colors hover:bg-mist hover:text-penguins-700"
                            >
                                US Masters Swimming

                                <svg
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M14 5h5v5M19 5l-9 9"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    <path
                                        d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>

                        <div className="my-5 divider" />

                        {user ? (
                            <Link
                                href={route('dashboard')}
                                className="button-dark w-full"
                                onClick={closeMobileMenu}
                            >
                                Team Dashboard
                            </Link>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-2">
                                <Link
                                    href={route('login')}
                                    className="button-secondary w-full"
                                    onClick={closeMobileMenu}
                                >
                                    Member Login
                                </Link>

                                <Link
                                    href={route('membership')}
                                    className="button-primary w-full"
                                    onClick={closeMobileMenu}
                                >
                                    Swim With Us
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {mobileMenuOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    className="fixed inset-0 z-40 bg-navy-950/45 backdrop-blur-sm lg:hidden"
                    onClick={closeMobileMenu}
                />
            )}
        </>
    );
}
