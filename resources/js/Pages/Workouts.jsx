import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import WorkoutsContainer from '@/Containers/WorkoutsContainer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Workouts({ auth, workouts }) {
    const [stateWorkouts, setStateWorkouts] = useState({});
    const [fileData, setFileData] = useState(null);
    const [date, setDate] = useState(new Date());

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        setStateWorkouts(workouts);
    }, [])

    const months = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'};

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
            notifySuccess(res.data.message);
            setStateWorkouts(res.data.workouts);
        })
        .catch(error => {
            notifyError(error.response.data.message)
        })
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-white leading-tight">Workouts</h2>}
        >
            <Head title="Workouts" />

            <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

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

            <WorkoutsContainer className='mt-4 w-[80%] mx-auto'>
                {Object.keys(stateWorkouts).map(yearKey => {
                    return <Card className='bg-black h-fit mt-2' key={yearKey}>
                        <CardBody>
                            <Typography variant='lead' color='white'>{yearKey}</Typography>

                            {Object.keys(stateWorkouts[yearKey]).map(monthKey => {
                                return <CardBody className='bg-black p-2' key={yearKey + monthKey}>
                                    <Typography variant='lead' color='white'>{months[monthKey]}</Typography>

                                    {stateWorkouts[yearKey][monthKey].map(workout => {
                                        return <Typography key={workout.id}><a className='text-[#E2DFD2]' href={workout.file_cdn} target='_blank'>{workout.file_name}</a></Typography>
                                    })}
                                </CardBody>
                            })}
                        </CardBody>
                    </Card>
                })}
            </WorkoutsContainer>
        </AuthenticatedLayout>
    );
}
