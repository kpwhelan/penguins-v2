import WelcomePageNav from "@/Components/WelcomePageNav";
import { Head } from "@inertiajs/react";
import MembershipBackground from '../../../public/assets/membership-background.jpg';

export default function Membership() {
    return (
        <main>
            <Head title="Granite State Penguins" />

            <WelcomePageNav />

            <div className=" h-96 bg-membershipPageBackground bg-cover"></div>
        </main>
    );
}