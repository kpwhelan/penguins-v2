import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';

export default function RegistrationStatus({ auth, registration_tokens }) {
    const generateNewToken = (email) => {
        axios.post(route('registration-token.store'), {
            'email': email
        })
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-4xl text-white leading-tight">Registration Token Status</h2>}
        >
            <Head title="Registration Status" />

            <main>
                <div className='w-[80%] mx-auto flex flex-wrap justify-around'>
                    {registration_tokens.map(token => {
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
                            <PrimaryButton onClick={() => generateNewToken(token.email)} disabled={token.is_expired ? false : true}>
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
