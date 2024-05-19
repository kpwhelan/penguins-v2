import WelcomePageContainer from '@/Containers/WelcomePageContainer';
import { Link, Head } from '@inertiajs/react';
import { Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import WelcomePageNav from '@/Components/WelcomePageNav';
import MembershipContainer from '@/Containers/MembershipContainer';

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

                <MembershipContainer>
                    
                </MembershipContainer>
            </main>
        </>
    );
}
