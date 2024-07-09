import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({ events, auth  }) {
    const editableDays = ['fc-day-mon', 'fc-day-wed', 'fc-day-fri'];

    function renderEventContent(eventInfo) {
        return (
          <>
            <p>{eventInfo.event.extendedProps.user_name}</p>
          </>
        )
      }

      const handleDayClick = (day) => {
        const dayClassList = day.dayEl.classList.value;

        editableDays.forEach(editableDay => {
            if (dayClassList.includes(editableDay)) alert('hi')
        })
      }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >

            <div className='w-[75%] mx-auto'>
                <h1 className='text-3xl'>Deck Duty</h1>
            </div>

            <FullCalendar
                viewClassNames={'text-white w-[75%] mx-auto'}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                editable={true}
                eventInteractive={true}
                eventClick={() => alert('hi')}
                dateClick={(day) => handleDayClick(day)}
                events={events}
                eventContent={renderEventContent}
            />

        </AuthenticatedLayout>
    );
}
