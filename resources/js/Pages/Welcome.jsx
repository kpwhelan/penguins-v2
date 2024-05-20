import WelcomePageContainer from '@/Containers/WelcomePageContainer';
import { Link, Head } from '@inertiajs/react';
import { Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import WelcomePageNav from '@/Components/WelcomePageNav';
import MembershipContainer from '@/Containers/MembershipContainer';
import AboutUsContainer from '@/Containers/AboutUsContainer';
import SwimBackground from '../../../public/assets/swim-background.jpg';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Granite State Penguins" />
            
            <main>
                <WelcomePageContainer>
                    <WelcomePageNav />

                    <div className='text-center'>
                        <h1 className='z-30 font-extrabold text-5xl'>The Granite State Penguins</h1>
                        <h2 className='z-30 font-semibold text-3xl'>Masters Swim Team</h2>
                    </div>
                </WelcomePageContainer>

                <AboutUsContainer className='h-screen w-screen relative'>
                    <img src={SwimBackground} className='absolute h-screen w-[80%] mx-auto left-0 right-0 top-2 m-auto z-0'></img>
                    <div className='absolute h-screen w-[80%] mx-auto left-0 right-0 top-2 m-auto z-10 bg-black bg-opacity-35'></div>
                </AboutUsContainer>

                <MembershipContainer>

                </MembershipContainer>
            </main>
        </>
    );
}
