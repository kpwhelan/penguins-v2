import NewsUploadForm from '@/Components/NewsUploadForm';
import SwimmerBioUploadForm from '@/Components/SwimmerBioUploadForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, deck_duty_count, next_deck_duty }) {
    const signUpMoreText = 'You should head over to the calendar and sign up for a few more!';
    const goodJobText = 'Nice job!';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-4xl text-white leading-tight">Hello, {auth.user.first_name}!</h2>}
        >
            <Head title="Dashboard" />

            <div className="w-[90%] lg:w-[70%] mx-auto mt-10 lg:flex lg:justify-between lg:items-center">
                <div className='w-full lg:w-[40%] border-l-2 border-white pl-4'>
                    <p className='mt-4 font-semibold text-xl'>In the last 30 days you did deck duty...</p>
                    <p className='font-bold text-6xl'>{deck_duty_count}<span className='text-4xl'>x</span></p>
                    <p className='mt-2 text-3xl font-semibold'>{deck_duty_count > 1 ? goodJobText : signUpMoreText}</p>

                    <p className='mt-10 font-semibold text-xl'>Your next deck duty is...</p>
                    {next_deck_duty ?
                        <p className='font-bold text-4xl mt-2'>{next_deck_duty.date}</p>
                        :
                        <p className='font-bold text-3xl mt-2'>You're not signed up for any deck duty, you should head over to the calendar and fix that!</p>
                    }
                </div>

               <div className='mt-4 lg:mt-0 w-full lg:w-[50%]'>
                    <img className='rounded-md' src='https://penguins.nyc3.cdn.digitaloceanspaces.com/assets/underwater.jpg'></img>
               </div>
            </div>

            {!!auth.user.is_admin &&
                <div className='lg:flex lg:justify-between w-[75%] mx-auto'>
                    <NewsUploadForm className='w-[90%] lg:w-[45%]' />
                    <SwimmerBioUploadForm className='w-[90%] lg:w-[45%]' />
                </div>
            }

            {/* <div className='w-[34%] ml-[15%]'>
                {!!auth.user.is_admin &&
                    <NewsUploadForm className=' mt-14' />
                }
            </div>

            <div>
                {!!auth.user.is_admin &&
                <SwimmerBioUploadForm class />
                }
            </div> */}
        </AuthenticatedLayout>
    );
}
