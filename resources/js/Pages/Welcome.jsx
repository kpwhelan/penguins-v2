import WelcomePageContainer from '@/Containers/WelcomePageContainer';
import GspHeader from '../../../public/assets/GSP-header-no-background.png'
import { Link, Head } from '@inertiajs/react';
import { Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            
            <WelcomePageContainer>
                <div className='fixed top-3 left-3 flex items-center bg-blue-gray-100 bg-opacity-10 p-2 rounded-lg'>
                    <img src={GspHeader}></img>
                    <Typography color='white' className='z-30 text-5xl'>The Granite State Penguins</Typography>
                </div>

                <FontAwesomeIcon icon={faBars} color='white' className='fixed top-4 right-4' size='xl' />
            </WelcomePageContainer>
        </>
    );
}
