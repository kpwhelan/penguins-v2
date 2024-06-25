import WelcomePageNav from "@/Components/WelcomePageNav";
import AboutUsContainer from "@/Containers/AboutUsContainer";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function AboutUs({  }) {
    const [blurNav, setBlurNav] = useState(false);

    const handleScroll = () => {
        window.scrollY >= 35 ? setBlurNav(true) : setBlurNav(false);
    }

    window.addEventListener('scroll', handleScroll);

    return (
        <main>
            <Head title="Membership" />

            <WelcomePageNav className="animate__animated animate__slower animate__fadeIn" blurNav={blurNav} />

            <div className=" h-96 bg-aboutUsPageBackground bg-cover bg-center flex align-middle justify-center items-center">
                <div className="text-center bg-[#333333] bg-opacity-20 px-2">
                    <p className="text-7xl">About Us</p>
                </div>
            </div>

            <AboutUsContainer className='text-black py-10 px-8'>
                    <div className='mx-auto flex justify-center items-center text-xl w-[60%]'>
                        <div>
                            <h2 className='text-6xl mb-4'>Who Are the Penguins?</h2>
                        
                            <p className="text-lg leading-relaxed">We practice Monday, Wednesday, Thursday, and Friday from 6:30am to 8:00am at the Nashua Boys and Girls Club 5-lane 25-yard pool. A team member is on deck at all times during workout sessions. Structured workouts are geared toward adults above age 20 from a wide variety of swimming abilities. Serious swimmers will compete in local, regional, or national meets or in triathlons. Not-so-serious swimmers are very welcome to swim simply to stay in shape.</p>
                            
                            <p className="text-lg leading-relaxed mt-6">We have a fairly large range of abilities. Our swimmers’ 100 yard freestyle race times vary from about 2:00 minutes to around :48 seconds. Most swimmers who have competed prior to masters are able to match their former high school speeds. Some college times have been broken.</p>
                            
                            <p className="text-lg leading-relaxed mt-6">Practices concentrate on stroke technique, starts and turns, as well as cardiovascular fitness. In the winter, workouts are geared toward the shorter distances typically swum at indoor meets. In the summer, workouts are geared toward the longer distances used in open water and triathlon competition. At the start of each season (September/June) emphasis is put on stroke and turn technique by one-on-one instruction and video taping. Later in the season more emphasis is put on cardiovascular strengthening and maintenance. Weekly, tri-weekly, monthly, and seasonal planning is strictly adhered to. Major focus is around building for two yearly meets: one in December, another in April. Yardage is typically 2500-4000 each morning.</p>
                            
                            <p className="text-lg leading-relaxed mt-6">Everyone is encouraged to participate in 2-3 swim meets or races each year but many team members do not. There is always a wide range of people of all abilities from all age groups at these meets. The meets are usually quite informal. Everyone has fun. Everyone is welcome.</p>

                            <p className="text-lg leading-relaxed mt-6">Learn more about membership <Link
                            href={route('membership')}
                            className="text-lg underline">here</Link>!</p>
                        </div>
                    </div>
                </AboutUsContainer>
        </main>
    );
}