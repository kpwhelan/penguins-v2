import { Component } from 'react';

export default class FatalErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('The application could not render.', error, info);
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <main className="error-screen">
                <div className="error-screen__glow error-screen__glow--top" aria-hidden="true" />
                <div className="error-screen__glow error-screen__glow--bottom" aria-hidden="true" />

                <section className="error-card" aria-labelledby="fatal-error-title">
                    <img
                        src="/assets/gsp-logo-navbar-480w@2x.png"
                        alt="Granite State Penguins"
                        className="error-card__logo"
                    />
                    <p className="error-card__eyebrow">We hit some rough water</p>
                    <h1 id="fatal-error-title" className="error-card__title">This page needs a fresh start.</h1>
                    <p className="error-card__message">
                        Something unexpected interrupted the page. Your information is safe. Refresh to try again.
                    </p>
                    <div className="error-card__actions">
                        <button type="button" className="error-card__primary" onClick={() => window.location.reload()}>
                            Refresh the page
                        </button>
                        <a href="/" className="error-card__secondary">Go to the homepage</a>
                    </div>
                </section>
            </main>
        );
    }
}
