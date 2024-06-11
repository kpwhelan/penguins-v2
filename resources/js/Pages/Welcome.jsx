import WelcomePageContainer from '@/Containers/WelcomePageContainer';
import { Link, Head } from '@inertiajs/react';
import { Card, List, ListItem, Typography } from '@material-tailwind/react';
import WelcomePageNav from '@/Components/WelcomePageNav';
import AboutUsContainer from '@/Containers/AboutUsContainer';
import SwimBackground from '../../../public/assets/swim-background.jpg';
import 'animate.css';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Granite State Penguins" />

            <main>
                <WelcomePageNav className="animate__animated animate__slower animate__fadeIn" />
                <WelcomePageContainer className="relative flex items-center justify-center h-screen overflow-hidden mb-2">
                    <div className='text-center animate__animated animate__slower animate__fadeIn'>
                        <h1 className='z-30 font-extrabold text-7xl'>The Granite State Penguins</h1>
                        <h2 className='z-30 font-semibold text-5xl'>Masters Swim Team</h2>
                    </div>
                </WelcomePageContainer>

                {/* <MembershipContainer className='relative mb-2 overflow-hidden pb-6'>
                    <img src={MembershipBackground} className='absolute  mx-auto left-0 right-0 top-0 m-auto z-0'></img>
                    <div className='absolute h-full w-[100%] mx-auto left-0 right-0 m-auto z-10 bg-black bg-opacity-75'></div>

                    {/* <div className='w-[90%] mx-auto mt-4 mb-2 relative z-20'>

                    </div> */}

                    {/* <div className='mx-auto relative z-20 w-[60%] mt-6'>
                    <h3 className='text-4xl'>Membership & Equipment</h3>
                        <Card className=' align-middle bg-black text-white text-2xl p-4 bg-opacity-30'>

                            <p>Practice Suit</p>
                            <p>Goggles</p>
                            <p>Most People Bring Fins</p>
                            <p>Some People Use Paddles</p>
                            <p>Note: pull buoys and kick boards are provided at the pool</p>

                            <br />
                            <p>
                                Membership rates are collected quarterly with the current rate set at $120 per quarter. We charge a $10 daily drop-in price that may be applied towards your first quarter membership. For insurance reasons, you are required to join US Masters Swimming (USMS) within 30 days, which is typically $55 depending on options. We’re so sure you’ll love swimming with the Granite State Penguins that we’d like to offer you a one month free trial period. USMS membership is not required for this trial period. Contact Chris Landry at CSL5@cwru.edu or 603-880-6303 for more information. Please fill out the following Penguins application before your first visit.
                            </p>
                        </Card>
                    </div>
                </MembershipContainer> */}

                {/* <AboutUsContainer className='h-screen w-screen relative bg-[#333333]'>
                    <img src={SwimBackground} className='absolute h-[95%] w-[80%] mx-auto left-0 right-0 top-4 m-auto z-0'></img>
                    <div className='absolute h-[95%] w-[80%] mx-auto left-0 right-0 top-4 m-auto z-10 bg-black bg-opacity-75'></div>

                    <div className='relative z-30 mx-auto flex justify-center items-center text-xl  h-screen w-[75%]'>
                        <div>
                            <h2 className='text-2xl'>Who Are the Penguins?</h2>
                            <br />
                            <p>We practice Monday, Wednesday, Thursday, and Friday from 6:30am to 8:00am at the Nashua Boys and Girls Club 5-lane 25-yard pool. A team member is on deck at all times during workout sessions. Structured workouts are geared toward adults above age 20 from a wide variety of swimming abilities. Serious swimmers will compete in local, regional, or national meets or in triathlons. Not-so-serious swimmers are very welcome to swim simply to stay in shape.</p>
                            <br />
                            <p>We have a fairly large range of abilities. Our swimmers’ 100 yard freestyle race times vary from about 2:00 minutes to around :48 seconds. Most swimmers who have competed prior to masters are able to match their former high school speeds. Some college times have been broken.</p>
                            <br />
                            <p>Practices concentrate on stroke technique, starts and turns, as well as cardiovascular fitness. In the winter, workouts are geared toward the shorter distances typically swum at indoor meets. In the summer, workouts are geared toward the longer distances used in open water and triathlon competition. At the start of each season (September/June) emphasis is put on stroke and turn technique by one-on-one instruction and video taping. Later in the season more emphasis is put on cardiovascular strengthening and maintenance. Weekly, tri-weekly, monthly, and seasonal planning is strictly adhered to. Major focus is around building for two yearly meets: one in December, another in April. Yardage is typically 2500-4000 each morning.</p>
                            <br />
                            <p>Everyone is encouraged to participate in 2-3 swim meets or races each year but many team members do not. There is always a wide range of people of all abilities from all age groups at these meets. The meets are usually quite informal. Everyone has fun. Everyone is welcome.</p>
                        </div>
                    </div>
                </AboutUsContainer> */}
            </main>
        </>
    );
}
