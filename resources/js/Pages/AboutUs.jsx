import AboutHero from '@/Components/About/AboutHero';
import WhoWeAreSection from '@/Components/About/WhoWeAreSection';
import WelcomePageNav from '@/Components/WelcomePageNav';
import { Footer } from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function AboutUs() {
    return (
        <>
            <Head title="About Us" />

            <WelcomePageNav />

            <main id="main-content">
                <AboutHero />

                <WhoWeAreSection />
            </main>

            <Footer />
        </>
    );
}
