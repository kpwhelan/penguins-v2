import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

export default function ContactForm({ }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [messageSentAndSuccessful, setMessageSentAndSuccessful] = useState(false);
    const { data, setData, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const submit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        axios.post(route('contact.send'), {
            name: data.name,
            email: data.email,
            message: data.message
        })
        .then(res => {
            // console.log(res.data);

            if (res.data.success) {
                setMessageSentAndSuccessful(true);
            }
        })
        .catch(error => {
            setIsProcessing(false)

            if (error.response.status === 500 && !error.response.data.success) {
                notifyError(error.response.data.message);
            }

            if (error.response.status === 422 && error.response.data.errors) {
                for (const [key, value] of Object.entries(error.response.data.errors)) {
                    errors[key] = value;
                }
            }



        })
    }

    return (
        <>
        {messageSentAndSuccessful &&
            <div className="text-center h-36">
                <p className="text-5xl">Thank You</p>
                <p>Your message has been sent successfully and we will contact you shortly!</p>
            </div>
        }

        {!messageSentAndSuccessful &&
            <>
            <p className="text-6xl mb-6">Contact</p>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Your Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        // isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={isProcessing}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Your Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={isProcessing}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="message" value="Message" />

                    <textarea
                        id="message"
                        name="message"
                        value={data.message}
                        autoComplete="message"
                        onChange={(e) => setData('message', e.target.value)}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        disabled={isProcessing}
                        >
                        </textarea>


                    <InputError message={errors.message} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    {isProcessing &&
                        <ThreeDots color="black" />
                    }
                    {!isProcessing &&
                        <PrimaryButton className="ms-4">
                            Submit
                        </PrimaryButton>
                    }
                </div>

                <ToastContainer position="bottom-right" autoClose={false} />
            </form>
            </>
        }
        </>
    );
}
