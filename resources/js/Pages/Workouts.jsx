import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import WorkoutsContainer from '@/Containers/WorkoutsContainer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useState } from 'react';


export default function Workouts({ auth, workouts }) {
    console.log(workouts)
    const [fileData, setFileData] = useState(null);
    const [date, setDate] = useState(new Date());

    const handleSelectedFile = (e) => {
        setFileData(e.target.files[0]);
    }

    const handleSelectedDate = (e) => {
        setDate(new Date(e.target.value))
    }

    const submit = (e) => {
        e.preventDefault();

        if (fileData === null) return;

        const formData = new FormData()
        formData.append('workout_file', fileData);
        formData.append('date', Math.floor(date.getTime() / 1000));

        axios.post(route('workouts.create'), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            let form = document.querySelector('#workout-form');
            form.reset();
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Workouts" />

            <div className='w-[80%] mx-auto mt-20'>
                <form onSubmit={submit} id="workout-form">
                    <Card className="mt-6 w-96 bg-[#000000] text-white">
                        <CardBody>
                            <Typography variant="h5" color="white" className="mb-2">
                                Upload a Workout
                            </Typography>

                            <InputLabel className='text-white'>File</InputLabel>
                            <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            onChange={handleSelectedFile}
                            />

                            <InputLabel className='text-white mt-4'>Workout Date</InputLabel>
                            <InputLabel className='text-white'>This will help organize workouts</InputLabel>
                            <input
                            className='text-black rounded-md'
                            aria-label="Date"
                            type='date'
                            onChange={handleSelectedDate}
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <PrimaryButton>Submit</PrimaryButton>
                        </CardFooter>
                    </Card>
                </form>
            </div>

            <WorkoutsContainer>

            </WorkoutsContainer>
        </AuthenticatedLayout>
    );
}
