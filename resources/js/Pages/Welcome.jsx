import WelcomePageContainer from '@/Containers/WelcomePageContainer';
import { Link, Head } from '@inertiajs/react';
import { Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import WelcomePageNav from '@/Components/WelcomePageNav';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Granite State Penguins" />
            
            <WelcomePageContainer>
                {/* <div className='fixed top-3 left-3 flex items-center bg-blue-gray-100 bg-opacity-10 p-2 rounded-lg'>
                    
                </div> */}

                <WelcomePageNav />
                <Typography color='white' className='z-30 font-extrabold text-5xl'>The Granite State Penguins</Typography>

                {/* <FontAwesomeIcon icon={faBars} color='white' className='fixed top-4 right-4 hover:cursor-pointer' size='xl' /> */}
            </WelcomePageContainer>
        </>
    );
}
