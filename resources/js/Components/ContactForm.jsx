import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [messageSentAndSuccessful, setMessageSentAndSuccessful] =
        useState(false);

    const {
        data,
        setData,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = async (event) => {
        event.preventDefault();

        setIsProcessing(true);
        clearErrors();

        try {
            const response = await axios.post(route('contact.send'), {
                name: data.name,
                email: data.email,
                message: data.message,
            });

            if (response.data.success) {
                reset();
                setMessageSentAndSuccessful(true);
            }
        } catch (error) {
            const status = error.response?.status;
            const responseData = error.response?.data;

            if (status === 422 && responseData?.errors) {
                setError(responseData.errors);
            } else {
                toast.error(
                    responseData?.message ??
                        'Something went wrong while sending your message. Please try again.',
                );
            }
        } finally {
            setIsProcessing(false);
        }
    };

    if (messageSentAndSuccessful) {
        return (
            <div className="flex min-h-72 flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-penguins-100 text-penguins-700">
                    <svg
                        aria-hidden="true"
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="m5 12 4 4L19 6"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <h4 className="mt-5 text-2xl font-extrabold tracking-tight text-navy-950">
                    Message sent!
                </h4>

                <p className="mt-3 max-w-md leading-7 text-slate">
                    Thanks for reaching out. Someone from the Granite State
                    Penguins will get back to you shortly.
                </p>

                <button
                    type="button"
                    onClick={() => setMessageSentAndSuccessful(false)}
                    className="mt-6 text-sm font-extrabold text-penguins-700 transition hover:text-penguins-900"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <>
            <form
                onSubmit={submit}
                className="space-y-6"
                noValidate
            >
                <FormField
                    id="name"
                    label="Your Name"
                    error={errors.name}
                >
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        onChange={(event) =>
                            setData('name', event.target.value)
                        }
                        disabled={isProcessing}
                        className={inputClasses(Boolean(errors.name))}
                    />
                </FormField>

                <FormField
                    id="email"
                    label="Your Email"
                    error={errors.email}
                >
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="email"
                        onChange={(event) =>
                            setData('email', event.target.value)
                        }
                        disabled={isProcessing}
                        className={inputClasses(Boolean(errors.email))}
                    />
                </FormField>

                <FormField
                    id="message"
                    label="Message"
                    error={errors.message}
                >
                    <textarea
                        id="message"
                        name="message"
                        value={data.message}
                        rows={6}
                        onChange={(event) =>
                            setData('message', event.target.value)
                        }
                        disabled={isProcessing}
                        className={`${inputClasses(
                            Boolean(errors.message),
                        )} resize-y`}
                    />
                </FormField>

                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm leading-6 text-slate">
                        We’ll only use your information to respond to your
                        message.
                    </p>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="button-primary min-w-40 disabled:pointer-events-none disabled:opacity-60"
                    >
                        {isProcessing ? (
                            <>
                                <svg
                                    aria-hidden="true"
                                    className="h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        className="opacity-25"
                                    />

                                    <path
                                        d="M21 12a9 9 0 0 0-9-9"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message

                                <svg
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M5 12h14M14 7l5 5-5 5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </form>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
            />
        </>
    );
}

function FormField({
    id,
    label,
    error,
    children,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-extrabold text-navy-950"
            >
                {label}
            </label>

            <div className="mt-2">
                {children}
            </div>

            {error && (
                <p
                    className="mt-2 text-sm font-semibold text-red-600"
                    role="alert"
                >
                    {Array.isArray(error) ? error[0] : error}
                </p>
            )}
        </div>
    );
}

function inputClasses(hasError) {
    return [
        'block w-full rounded-xl border bg-white px-4 py-3.5 text-base text-navy-950',
        'shadow-sm transition duration-200 placeholder:text-slate/50',
        'focus:border-penguins-500 focus:outline-none focus:ring-4 focus:ring-penguins-500/10',
        'disabled:cursor-not-allowed disabled:bg-mist disabled:opacity-70',
        hasError
            ? 'border-red-400'
            : 'border-navy-950/15 hover:border-navy-950/25',
    ].join(' ');
}
