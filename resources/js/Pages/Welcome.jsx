import { Head } from '@inertiajs/react';
import WelcomePageNav from '@/Components/WelcomePageNav';
import HeroSection from '@/Components/Home/HeroSection';
import WhySwimSection from '@/Components/Home/WhySwimSection';
import PracticeSection from '@/Components/Home/PracticeSection';

export default function Welcome({ auth, newsItems, swimmerBios }) {
    return (
        <>
            <Head title="Granite State Penguins" />

            <WelcomePageNav />

            <main id="main-content">
                <HeroSection />

                <WhySwimSection />

                <PracticeSection />

            </main>
        </>
    );
}
