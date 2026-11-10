import { Head } from '@inertiajs/react';

const errors = {
    403: {
        eyebrow: 'Members only',
        title: 'You do not have access to this page.',
        message: 'If you think you should be able to view it, sign in with the correct account or contact a Penguins administrator.',
        action: 'Go to the dashboard',
        href: '/dashboard',
    },
    404: {
        eyebrow: 'Off course',
        title: 'We could not find that page.',
        message: 'The link may be outdated, or the page may have moved. Head back home and we will get you pointed in the right direction.',
        action: 'Go to the homepage',
        href: '/',
    },
    419: {
        eyebrow: 'Session expired',
        title: 'It is time for a quick refresh.',
        message: 'For your security, this page expired after being open for a while. Refresh it before trying again.',
        action: 'Refresh the page',
        reload: true,
    },
    429: {
        eyebrow: 'Please slow down',
        title: 'Too many requests arrived at once.',
        message: 'Give us a brief moment, then try again. Nothing else is required on your end.',
        action: 'Try again',
        reload: true,
    },
    500: {
        eyebrow: 'We hit some rough water',
        title: 'Something did not go as planned.',
        message: 'The problem has been recorded. Please try again, and come back in a few minutes if it continues.',
        action: 'Try again',
        reload: true,
    },
    503: {
        eyebrow: 'Brief pool break',
        title: 'We are taking care of some maintenance.',
        message: 'The Penguins website will be back shortly. Please check again in a few minutes.',
        action: 'Check again',
        reload: true,
    },
};

export default function Error({ status }) {
    const error = errors[status] ?? errors[500];

    return (
        <>
            <Head title={`${status} | Granite State Penguins`}>
                <meta name="robots" content="noindex, nofollow, noarchive" />
            </Head>

            <main className="error-screen">
                <div className="error-screen__glow error-screen__glow--top" aria-hidden="true" />
                <div className="error-screen__glow error-screen__glow--bottom" aria-hidden="true" />

                <section className="error-card" aria-labelledby="error-title">
                    <img
                        src="/assets/gsp-logo-navbar-480w@2x.png"
                        alt="Granite State Penguins"
                        className="error-card__logo"
                    />
                    <p className="error-card__status">{status}</p>
                    <p className="error-card__eyebrow">{error.eyebrow}</p>
                    <h1 id="error-title" className="error-card__title">{error.title}</h1>
                    <p className="error-card__message">{error.message}</p>
                    <div className="error-card__actions">
                        {error.reload ? (
                            <button type="button" className="error-card__primary" onClick={() => window.location.reload()}>
                                {error.action}
                            </button>
                        ) : (
                            <a href={error.href} className="error-card__primary">{error.action}</a>
                        )}
                        {(error.reload || error.href !== '/') && (
                            <a href="/" className="error-card__secondary">Go to the homepage</a>
                        )}
                    </div>
                    <p className="error-card__note">Need help? Contact a Granite State Penguins administrator.</p>
                </section>
            </main>
        </>
    );
}
