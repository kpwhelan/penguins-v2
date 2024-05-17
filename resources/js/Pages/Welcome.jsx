import WelcomePageContainer from '@/Containers/WelcomePageContainer';
import GspHeader from '../../../public/assets/GSP-header-no-background.png'
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            
            <WelcomePageContainer>
                <img className='fixed top-3 left-3' src={GspHeader}></img>
            </WelcomePageContainer>
        </>
    );
}
