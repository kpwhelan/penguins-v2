import WelcomePageNav from "@/Components/WelcomePageNav";
import { Head } from "@inertiajs/react";
import MembershipBackground from '../../../public/assets/membership-background.jpg';
import MembershipPageInfoContainer from "@/Containers/MembershipPageInfoContainer";
import ContactFormContainer from "@/Containers/ContactFormContainer";
import ContactForm from "@/Components/ContactForm";
import { useState } from "react";
import LocationCOntainer from "@/Containers/LocationsContainer";
import Locations from "@/Components/Locations";

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

            <MembershipPageInfoContainer className="px-8 py-10 bg-[url('https://penguins.nyc3.cdn.digitaloceanspaces.com/assets/membership-content-background.png')] bg-no-repeat bg-cover">
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

                        <div className="mt-10">
                            <p className="text-4xl mb-4">Location</p>
                            <p className="text-xl">Boys & Girls Club of Greater Nashua</p>
                            <p>One Positive Pl, Nashua, NH 03060</p>
                            <iframe className="w-96 h-96 rounded-md" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5859.010724910932!2d-71.48515972384384!3d42.75651637115882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3b72ddd74b829%3A0x644423ad33fcbc6b!2sBoys%20%26%20Girls%20Club%20of%20Greater%20Nashua!5e0!3m2!1sen!2sus!4v1725551342730!5m2!1sen!2sus" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>

                    <ContactFormContainer className="w-[30%] border-2 border-white rounded-md p-4">
                        <ContactForm />
                    </ContactFormContainer>
                </div>

                <LocationCOntainer className='w-[80%] mx-auto'>
                    <div className="ml-[8%] mt-10">
                        <h2 className=" text-3xl">Alternate Locations</h2>
                        <p>All Granite State Penguins locations come with their own dues and rules. <br/> For more information please reach out via the contact information below each location!</p>
                    </div>

                    <Locations />
                </LocationCOntainer>

            </MembershipPageInfoContainer>
        </main>
    );
}
