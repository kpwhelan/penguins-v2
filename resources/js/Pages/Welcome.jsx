import WelcomePageContainer from '@/Containers/WelcomePageContainer';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            
            <WelcomePageContainer>
                <h1 className=' text-purple-700'>HELLO!!!</h1>
            </WelcomePageContainer>
        </>
    );
}
