import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function RegistrationStatus({ auth, registration_tokens }) {
    const [tokens, setTokens] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        setTokens(registration_tokens);
    }, []);

    const generateNewToken = (email) => {
        setIsProcessing(true);

        axios.post(route('registration-token.store'), {
            'email': email
        })
        .then(res => {
            console.log(res)
            setIsProcessing(false);

            if (res.data.success) {
                notifySuccess(res.data.message);

                setTokens(res.data.data.tokens);
            }
        })
        .catch(error => {
            setIsProcessing(false);

            if (error.response.status === 500 && !error.response.data.success) {
                notifyError(error.response.data.message);
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-4xl text-white leading-tight">Registration Token Status</h2>}
        >
            <Head title="Registration Status" />

            <main>
                <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

                <div className='w-[80%] mx-auto flex flex-wrap justify-around'>
                    {tokens.map(token => {
                        return <Card key={token} className="mt-6 w-96">
                        <CardBody>
                          <Typography variant="h5" color="blue-gray" className="mb-2">
                            {token.email}
                          </Typography>
                          <Typography color='blue-gray'>
                            Email Sent: <FontAwesomeIcon icon={token.email_successfully_sent ? faCheck : faX} />
                          </Typography>
                          <Typography color='blue-gray'>
                            Expired: <FontAwesomeIcon icon={token.is_expired ? faCheck : faX} />
                          </Typography>
                        </CardBody>
                        <CardFooter>
                            <PrimaryButton onClick={() => generateNewToken(token.email)} disabled={(token.is_expired || isProcessing) ? false : true}>
                                Resend Token
                            </PrimaryButton>
                        </CardFooter>
                      </Card>
                    })}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
