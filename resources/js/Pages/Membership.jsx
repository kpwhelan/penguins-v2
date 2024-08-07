import WelcomePageNav from "@/Components/WelcomePageNav";
import { Head } from "@inertiajs/react";
import MembershipBackground from '../../../public/assets/membership-background.jpg';
import MembershipPageInfoContainer from "@/Containers/MembershipPageInfoContainer";
import ContactFormContainer from "@/Containers/ContactFormContainer";
import ContactForm from "@/Components/ContactForm";
import { useState } from "react";

export default function Membership() {
    const [blurNav, setBlurNav] = useState(false);

    const handleScroll = () => {
        window.scrollY >= 35 ? setBlurNav(true) : setBlurNav(false);
    }


    window.addEventListener('scroll', handleScroll);

    return (
        <main>
            <Head title="Membership" />

            <WelcomePageNav className="animate__animated animate__slower animate__fadeIn" blurNav={blurNav} />

            <div className="animate__animated animate__slower animate__fadeIn h-96 bg-[url('https://penguins.nyc3.cdn.digitaloceanspaces.com/assets/membership-background.jpg')] bg-cover flex align-middle justify-center items-center opacity-90">
                {/* <div className="text-center bg-[#333333] bg-opacity-30 px-2">
                    <p className=" text-7xl font-extrabold">Membership & Equipment</p>
                </div> */}
            </div>

            <MembershipPageInfoContainer className="px-8 py-10">
                <div className="flex justify-around items-center">
                    <div className="w-[40%]">
                        <p className="text-6xl mb-6">Membership</p>

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

                    <ContactFormContainer className="w-[30%] border-2 border-white rounded-md p-4">
                        <ContactForm />
                    </ContactFormContainer>
                </div>

            </MembershipPageInfoContainer>
        </main>
    );
}
