import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


export default function Calendar({ events, auth  }) {
    console.log(auth)
    return (
        <AuthenticatedLayout
            user={auth.user}
        >

            <FullCalendar
                viewClassNames={'text-white'}
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                editable={true}
                events={events}
            />

            <h1 className='text-black'>hello</h1>

        </AuthenticatedLayout>
    );
}
