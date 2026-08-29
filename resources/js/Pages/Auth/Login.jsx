import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => () => reset('password'), []);

    const submit = (event) => {
        event.preventDefault();
        post(route('login'));
    };

    const fieldClasses =
        'mt-2 block min-h-13 w-full rounded-xl border border-navy-950/15 bg-white px-4 py-3 text-base text-navy-950 shadow-sm transition placeholder:text-slate/45 focus:border-penguins-500 focus:outline-none focus:ring-4 focus:ring-penguins-100';

    return (
        <>
            <Head title="Member Login" />

            <main className="grid min-h-screen bg-mist lg:grid-cols-[1.05fr_0.95fr]">
                <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-navy-950 text-white lg:flex">
                    <img
                        src="/assets/membership-team.webp"
                        alt="Granite State Penguins teammates at the pool"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/25"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-r from-navy-950/35 to-transparent"
                    />

                    <div className="relative z-10 p-8 lg:p-10">
                        <Link
                            href={route('home')}
                            className="inline-flex rounded-xl bg-white/90 p-3 shadow-elevated backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                            aria-label="Return to the Granite State Penguins homepage"
                        >
                            <ApplicationLogo className="h-auto w-52" />
                        </Link>
                    </div>

                    <div className="relative z-10 max-w-3xl p-8 pb-10 lg:p-10 lg:pb-12">
                        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-penguins-200">
                            Penguins Members
                        </p>
                        <h1 className="mt-5 text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white xl:text-5xl">
                            Everything you need,
                            <span className="block text-penguins-300">
                                before you hit the water.
                            </span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                            Sign in to check workouts, manage deck-duty dates,
                            connect with teammates, and stay current with the
                            Penguins.
                        </p>
                    </div>
                </section>

                <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:px-12">
                    <div
                        aria-hidden="true"
                        className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-penguins-200/55 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-penguins-100/70 blur-3xl"
                    />

                    <div className="relative w-full max-w-lg">
                        <div className="mb-10 flex items-center justify-between gap-5 lg:hidden">
                            <Link
                                href={route('home')}
                                aria-label="Return to the Granite State Penguins homepage"
                            >
                                <ApplicationLogo className="h-auto w-44 sm:w-52" />
                            </Link>
                            <Link
                                href={route('home')}
                                className="text-sm font-extrabold text-penguins-800 transition hover:text-penguins-950"
                            >
                                Back home
                            </Link>
                        </div>

                        <div className="rounded-panel border border-navy-950/10 bg-white p-6 shadow-elevated sm:p-10">
                            <p className="eyebrow">Team Access</p>
                            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.035em] text-navy-950 sm:text-5xl">
                                Welcome back.
                            </h2>
                            <p className="mt-4 leading-7 text-slate">
                                Enter your member credentials to continue to the
                                Penguins dashboard.
                            </p>

                            {status && (
                                <div
                                    role="status"
                                    className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800"
                                >
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="mt-8">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-extrabold text-navy-950"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className={fieldClasses}
                                        autoComplete="username"
                                        autoFocus
                                        required
                                        placeholder="you@example.com"
                                        aria-invalid={Boolean(errors.email)}
                                        onChange={(event) =>
                                            setData('email', event.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-extrabold text-navy-950"
                                        >
                                            Password
                                        </label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm font-bold text-penguins-700 transition hover:text-penguins-950"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            className={`${fieldClasses} pr-20`}
                                            autoComplete="current-password"
                                            required
                                            aria-invalid={Boolean(errors.password)}
                                            onChange={(event) =>
                                                setData('password', event.target.value)
                                            }
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 mt-2 px-4 text-sm font-extrabold text-penguins-700 transition hover:text-penguins-950"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            onClick={() => setShowPassword((current) => !current)}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <label className="mt-6 flex w-fit cursor-pointer items-center gap-3 text-sm font-semibold text-slate">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(event) =>
                                            setData('remember', event.target.checked)
                                        }
                                    />
                                    Keep me signed in
                                </label>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-8 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-penguins-500 px-6 py-3.5 text-sm font-extrabold text-navy-950 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-penguins-400 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Signing in…' : 'Sign in to the dashboard'}
                                    {!processing && (
                                        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </form>
                        </div>

                        <p className="mt-6 text-center text-sm leading-6 text-slate">
                            Need help accessing your account?{' '}
                            <a
                                href="mailto:csl5@cwru.edu"
                                className="font-extrabold text-penguins-700 transition hover:text-penguins-950"
                            >
                                Contact Chris Landry
                            </a>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
