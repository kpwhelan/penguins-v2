import { Link } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import NavLink from "./NavLink";
import ResponsiveNavLink from "./ResponsiveNavLink";
import ApplicationLogo from "./ApplicationLogo";
import { useState } from "react";

export default function WelcomePageNav({ className, blurNav }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isAboutUsSelected, setIsAboutUsSelected] = useState(false);

    const toggleThing = (e) => {
        const id = e.target.id;
    }

    return (
        <>
        <div className={`bg-[#333333] z-40 fixed top-0 left-0 w-full h-36 bg-opacity-80 transition-opacity ease-in duration-500 ${blurNav ? 'opacity-100' : 'opacity-0'}`}></div>
        <nav className={`bg-[#333333] bg-opacity-95 fixed top-8 left-0 w-full h-fit z-50 ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex mx-auto justify-between">
                            {/* <div className="hidden space-x-8 sm:-my-px sm:me-10 sm:flex">
                                <NavLink href={route('about-us')} active={route().current('about-us')}>
                                    About Us
                                </NavLink>
                            </div> */}
                            <div className="hidden space-x-8 sm:-my-px sm:me-10 sm:flex">
                                <NavLink href={route('membership')} active={route().current('membership')}>
                                    Membership
                                </NavLink>
                            </div>
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block w-52" />
                                </Link>
                            </div>

                            {/* <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                   News
                                </NavLink>
                            </div> */}

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Penguins Login
                                </NavLink>
                            </div>

                            {/* <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink>
                                    Contact
                                </NavLink>
                            </div> */}

                            {/* <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('')} active={route().current('')}>
                                    Equipment
                                </NavLink>
                            </div> */}
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>
            </>
    );
}
