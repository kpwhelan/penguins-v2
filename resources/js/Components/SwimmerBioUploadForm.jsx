import { useForm } from "@inertiajs/react";
import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

export default function SwimmerBioUploadForm({ className }) {
    const [fileData, setFileData] = useState(null);
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        swimmer_name: '',
        body: '',
    });

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleSelectedFile = (e) => {
        setFileData(e.target.files[0]);
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData()
        if (fileData !== null) formData.append('swimmer_image', fileData);
        formData.append('swimmer_name', data.swimmer_name);
        formData.append('body', data.body);

        axios.post(route('swimmer-bios.store'), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            if (res.data.success) {
                let form = document.querySelector('#swimmer-bio-form');
                reset();
                form.reset();
                notifySuccess(res.data.message);
            }
        })
        .catch(error => {
            notifyError(error.response.data.message);
        })
    }

    return (
        <div className={className}>
            <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

            <form onSubmit={submit} id="swimmer-bio-form">
                <Card className="mt-6 w-full bg-[#000000] text-white">
                    <CardBody>
                        <Typography variant="h5" color="white" className="mb-2">
                            Upload a Swimmer Bio
                        </Typography>

                        <InputLabel className='text-white text-xl'>Swimmer Photo</InputLabel>
                        <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        onChange={handleSelectedFile}
                        />

                        <div className="mt-2">
                            <InputLabel className="text-white text-xl" htmlFor="swimmer_name">Swimmer Name</InputLabel>

                            <TextInput
                                id="swimmer_name"
                                className="mt-1 block w-full text-black"
                                onChange={(e) => setData('swimmer_name', e.target.value)}
                                isFocused
                                autoComplete="swimmer_name"
                            />

                            <InputError className="mt-2" message={errors.swimmer_name} />
                        </div>

                        <div className="mt-2 w-full">
                            <InputLabel className="text-white text-xl" htmlFor="body" value="Body" />

                            {/* <TextInput
                                id="body"
                                className="mt-1 block w-full"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                isFocused
                                autoComplete="body"
                            /> */}

                            <textarea
                                className="rounded-md w-full h-60 text-black"
                                onChange={(e) => setData('body', e.target.value)}
                            ></textarea>

                            <InputError className="mt-2" message={errors.body} />
                        </div>


                    </CardBody>
                    <CardFooter className="pt-0">
                        <PrimaryButton>Submit</PrimaryButton>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
