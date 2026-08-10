import MembershipHero from '@/Components/Membership/MembershipHero';
import MembershipOverview from '@/Components/Membership/MembershipOverview';
import WelcomePageNav from '@/Components/WelcomePageNav';
import { Footer } from '@/Components/Footer';
import { Head } from '@inertiajs/react';
import MembershipSteps from '@/Components/Membership/MembershipSteps';
import EquipmentSection from '@/Components/Membership/EquipmentSection';
import CommunitySection from '@/Components/Membership/CommunitySection';
import FirstPracticeSection from '@/Components/Membership/FirstPracticeSeciton';
import LocationSection from '@/Components/Membership/LocationSection';
import AlternateLocationsSection from '@/Components/Membership/AlternateLocationsSection';

export default function Membership() {
    return (
        <>
            <Head title="Membership" />

            <WelcomePageNav />

            <main id="main-content">
                <MembershipHero />

                <MembershipOverview />

                <MembershipSteps />

                <EquipmentSection />

                <CommunitySection />

                <FirstPracticeSection />

                <LocationSection />

                <AlternateLocationsSection />
            </main>

            <Footer />
        </>
    );
}
