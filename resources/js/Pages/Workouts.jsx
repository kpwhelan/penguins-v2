import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const months = { '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December' };

function currentMonth() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
}

export default function Workouts({ auth, workouts }) {
    const isAdmin = Boolean(auth.user.is_admin);
    const [stateWorkouts, setStateWorkouts] = useState({});
    const [fileData, setFileData] = useState(null);
    const [workoutMonth, setWorkoutMonth] = useState(currentMonth);

    useEffect(() => setStateWorkouts(workouts), [workouts]);

    const submit = (event) => {
        event.preventDefault();
        if (fileData === null) return;
        const formData = new FormData();
        formData.append('workout_file', fileData);
        formData.append('month', workoutMonth);
        axios.post(route('workouts.store'), formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                if (response.data.success) {
                    document.querySelector('#workout-form').reset();
                    toast.success(response.data.message);
                    setStateWorkouts(response.data.workouts);
                    setFileData(null);
                }
            })
            .catch((error) => toast.error(error.response.data.message));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<div><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-penguins-300">Training Library</p><h1 className="mt-2 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Workouts</h1><p className="mt-3 text-white/60">{isAdmin ? 'Find a recent set or add a workout to the team archive.' : 'Find and download recent sets from the team archive.'}</p></div>}>
            <Head title="Workouts" />
            <Toaster toastOptions={{ duration: 8000 }} />

            <div className={isAdmin ? 'grid items-start gap-7 xl:grid-cols-[22rem_minmax(0,1fr)]' : ''}>
                {isAdmin && (
                    <form id="workout-form" onSubmit={submit} className="surface-card p-6">
                        <p className="eyebrow">Add to the Library</p>
                        <h2 className="mt-3 text-2xl font-extrabold text-navy-950">Upload a workout</h2>
                        <p className="mt-2 text-sm leading-6 text-slate">Choose a PDF and the month it belongs to.</p>
                        <label htmlFor="workout-file" className="mt-6 block text-sm font-extrabold text-navy-950">Workout file</label>
                        <input id="workout-file" type="file" accept="application/pdf,.pdf" onChange={(event) => setFileData(event.target.files[0])} className="mt-2 block w-full cursor-pointer rounded-xl border border-navy-950/10 bg-mist p-3 text-sm text-slate file:mr-3 file:rounded-lg file:border-0 file:bg-penguins-100 file:px-3 file:py-2 file:font-bold file:text-penguins-800" />
                        <label htmlFor="workout-month" className="mt-5 block text-sm font-extrabold text-navy-950">Workout month</label>
                        <input id="workout-month" type="month" required value={workoutMonth} onChange={(event) => setWorkoutMonth(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-navy-950/10 bg-white px-4 text-navy-950 focus:border-penguins-500 focus:ring-penguins-500" />
                        <button type="submit" className="button-primary mt-6 w-full" disabled={!fileData}>Upload workout</button>
                    </form>
                )}

                <section>
                    <div className="flex items-end justify-between gap-5"><div><p className="eyebrow">Workout Archive</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950">Past team workouts</h2></div></div>
                    <div className="mt-6 space-y-5">
                        {Object.keys(stateWorkouts).length ? Object.keys(stateWorkouts).map((yearKey) => (
                            <article className="surface-card overflow-hidden" key={yearKey}>
                                <div className="border-b border-navy-950/10 bg-navy-950 px-6 py-4"><h3 className="text-2xl font-extrabold text-white">{yearKey}</h3></div>
                                <div className="grid gap-0 divide-y divide-navy-950/10 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-3">
                                    {Object.keys(stateWorkouts[yearKey]).map((monthKey) => (
                                        <div className="p-6" key={`${yearKey}-${monthKey}`}>
                                            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-700">{months[monthKey]}</p>
                                            <ul className="mt-4 space-y-3">
                                                {stateWorkouts[yearKey][monthKey].map((workout) => (
                                                    <li key={workout.id}><a className="inline-flex items-start gap-2 font-bold leading-6 text-navy-950 transition hover:text-penguins-700" href={workout.download_url} target="_blank" rel="noreferrer"><span aria-hidden="true" className="text-penguins-600">↗</span>{workout.file_name}</a></li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        )) : <div className="surface-card p-10 text-center"><h3 className="text-xl font-extrabold text-navy-950">No workouts uploaded yet</h3><p className="mt-2 text-slate">The team workout archive will appear here.</p></div>}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
