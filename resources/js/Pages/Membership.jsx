import WelcomePageNav from "@/Components/WelcomePageNav";
import { Head } from "@inertiajs/react";
import MembershipBackground from '../../../public/assets/membership-background.jpg';
import MembershipPageInfoContainer from "@/Containers/MembershipPageInfoContainer";
import ContactFormContainer from "@/Containers/ContactFormContainer";
import ContactForm from "@/Components/ContactForm";

export default function Membership() {
    return (
        <main>
            <Head title="Membership" />

            <WelcomePageNav />

            <div className=" h-96 bg-membershipPageBackground bg-cover bg-blend-darken flex align-middle justify-center items-center">
                <div className="text-center bg-[#333333] bg-opacity-30 px-2">
                    <p className=" text-7xl font-extrabold">Membership & Equipment</p>
                </div>
            </div>

            <MembershipPageInfoContainer className="p-4 bg-[#333333]">
                <div className="flex justify-around items-center">
                    <div className="w-[40%]">
                        <p className="text-4xl mb-4">Membership</p>

                        <p className="text-lg leading-relaxed">
                            Our membership structure is designed to suit various preferences. Currently, our quarterly rate stands at $120, providing a convenient option for regular swimmers. Alternatively, we offer a $10 daily drop-in rate, which can be credited towards your first quarter membership if you choose to continue.
                        </p>

                        <p className="text-lg leading-relaxed mt-6">
                            As part of our commitment to safety, joining US Masters Swimming (USMS) within 30 days is mandatory for insurance purposes, with membership fees typically around $55, depending on your chosen options.
                        </p>

                        <p className="text-lg leading-relaxed mt-6">
                            To let you experience the excitement of swimming with the Granite State Penguins risk-free, we extend a complimentary one-month trial period, during which USMS membership is not required.
                        </p>

                        <p className="text-lg leading-relaxed mt-6">
                            For more information or to get started, please fill out the contact form or feel free to contact Chris Landry at 603-880-6303. Don't forget to complete the Penguins application before your first visit. We look forward to welcoming you!
                        </p>

                        <div className="mt-10">
                            <p className="text-4xl mb-4">Equipment</p>

                            <p className="text-lg leading-relaxed">Practice Suit</p>
                            <p className="text-lg leading-relaxed">Goggles</p>
                            <p className="text-lg leading-relaxed">Most people bring fins</p>
                            <p className="text-lg leading-relaxed">Some bring paddles</p>
                            <p className="text-lg leading-relaxed">Note: pull buoys and kickboards are provided at the pool</p>
                        </div>
                    </div>

                    <ContactFormContainer className="w-[30%]">
                        <ContactForm />
                    </ContactFormContainer>
                </div>
                
            </MembershipPageInfoContainer>
        </main>
    );
}
