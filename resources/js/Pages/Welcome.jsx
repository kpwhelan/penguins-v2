import { Head } from '@inertiajs/react';
import WelcomePageNav from '@/Components/WelcomePageNav';
import HeroSection from '@/Components/Home/HeroSection';
import WhySwimSection from '@/Components/Home/WhySwimSection';
import PracticeSection from '@/Components/Home/PracticeSection';
import NewsSection from '@/Components/Home/NewsSection';
import AllStarsSection from '@/Components/Home/AllStarsSection';
import MembershipCta from '@/Components/Home/MembershipCta';
import { Footer } from '@/Components/Footer';

export default function Welcome({ newsItems, swimmerBios }) {
    return (
        <>
            <Head title="Granite State Penguins" />

            <WelcomePageNav />

            <main id="main-content">
                <HeroSection />

                <WhySwimSection />

                <PracticeSection />

                <NewsSection newsItems={newsItems} />

                <AllStarsSection swimmerBios={swimmerBios} />

                <MembershipCta />

                <Footer />
            </main>
        </>
    );
}
