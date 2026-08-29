import AboutHero from '@/Components/About/AboutHero';
import AboutCta from '@/Components/About/AboutCta';
import TeamCultureSection from '@/Components/About/TeamCultureSection';
import TrainingSection from '@/Components/About/TrainingSection';
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

                <TrainingSection />

                <TeamCultureSection />

                <AboutCta />
            </main>

            <Footer />
        </>
    );
}
