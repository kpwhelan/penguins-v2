import WelcomePageNav from "@/Components/WelcomePageNav";
import { Head } from "@inertiajs/react";
import MembershipBackground from '../../../public/assets/membership-background.jpg';
import MembershipPageInfoContainer from "@/Containers/MembershipPageInfoContainer";

export default function Membership() {
    return (
        <main>
            <Head title="Granite State Penguins" />

            <WelcomePageNav />

            <div className=" h-96 bg-membershipPageBackground bg-cover flex align-middle justify-center items-center">
                <div className="text-center">
                    <p className=" text-5xl">Membership</p>
                    <p>&</p>
                    <p className="text-5xl">Equipment</p>
                </div>
            </div>

            <MembershipPageInfoContainer className="flex justify-around text-black p-4 mt-40">
                <div className="w-[30%] flex items-center align-middle">

                </div>

                <div className="w-[50%]">
                    <p className="text-2xl leading-relaxed">
                        Membership rates are collected quarterly with the current rate set at $120 per quarter. We charge a $10 daily drop-in price that may be applied towards your first quarter membership. For insurance reasons, you are required to join US Masters Swimming (USMS) within 30 days, which is typically $55 depending on options. We’re so sure you’ll love swimming with the Granite State Penguins that we’d like to offer you a one month free trial period. USMS membership is not required for this trial period. Contact Chris Landry at CSL5@cwru.edu or 603-880-6303 for more information. Please fill out the following Penguins application before your first visit.
                    </p>
                </div>
            </MembershipPageInfoContainer>
        </main>
    );
}
