import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
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
            header={<div><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-penguins-300">Administration</p><h1 className="mt-2 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Member Invitations</h1><p className="mt-3 text-white/60">Review outstanding registration links and resend them when needed.</p></div>}
        >
            <Head title="Registration Status" />

            <main>
                <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {tokens.map(token => {
                        return <article key={token.id ?? token.email} className="w-full rounded-panel border border-navy-950/15 bg-white p-6 shadow-soft">
                        <div>
                          <h2 className="mb-4 break-all text-xl font-extrabold text-navy-950">
                            {token.email}
                          </h2>
                          <p className="text-sm text-slate">
                            Email Sent: <FontAwesomeIcon icon={token.email_successfully_sent ? faCheck : faX} />
                          </p>
                          <p className="mt-2 text-sm text-slate">
                            Expired: <FontAwesomeIcon icon={(token.is_expired || (token.expires_at && new Date(token.expires_at) < new Date())) ? faCheck : faX} />
                          </p>
                        </div>
                        <div className="mt-6 border-t border-navy-950/10 pt-5">
                            <PrimaryButton onClick={() => generateNewToken(token.email)} disabled={isProcessing}>
                                Send new invitation
                            </PrimaryButton>
                        </div>
                      </article>
                    })}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
