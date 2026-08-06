import { Link, Head } from '@inertiajs/react';
import WelcomePageNav from '@/Components/WelcomePageNav';
import AboutUsContainer from '@/Containers/AboutUsContainer';
import NewsContainer from '@/Containers/NewsContainer';
import swimBackground from '../../../public/assets/swim-background.jpg';
import NewsItemCard from '@/Components/NewsItemCard';
import SwimmersBioContainer from '@/Containers/SwimmerBiosContainer';
import SwimmerBioCard from '@/Components/SwimmerBioCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '@/Components/Footer';
import HeroSection from '@/Components/Home/HeroSection';

export default function Welcome({ auth, newsItems, swimmerBios }) {
    return (
        <>
            <Head title="Granite State Penguins" />

            <WelcomePageNav />

            <main id="main-content">
                <HeroSection />

            </main>
        </>
    );
}
