import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@/Components/Modal';
import SignUpContent from '@/Components/SignUpContent';

export default function Calendar({ events, auth }) {
    const editableDays = ['fc-day-mon', 'fc-day-wed', 'fc-day-fri'];
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const [stateEvents, setStateEvents] = useState([]);
    const [displaySignUpModal, setDisplaySignUpModal] = useState(false);
    const [signUpDate, setSignUpDate] = useState('');
    const [isSignUpOverride, setIsSignUpOverride] = useState(false);

    useEffect(() => {
        setStateEvents(events);
    }, [])

    function renderEventContent(eventInfo) {
        return (
          <>
            <p>{eventInfo.event.extendedProps.user_name}</p>
          </>
        )
      }

      const isEditableDay = (day) => {
        const dayClassList = day.dayEl.classList.value;
        let isEditable = false;
        editableDays.forEach(editableDay => {
            dayClassList.includes(editableDay) ? isEditable = true : false;
        })

        return isEditable;
      }

      const toggleSetDisplaySignUpModal = () => {
        if (displaySignUpModal) setSignUpDate('');
        displaySignUpModal ? setDisplaySignUpModal(false) : setDisplaySignUpModal(true);
      }

      const submitSignUp = (date) => {
        axios.post(route('calendar.signup'), {
            'date': date
        })
        .then(res => {
            if (res.data.success) {
                console.log(res.data)
                toggleSetDisplaySignUpModal();
                setIsSignUpOverride(false);
                notifySuccess(res.data.message);
                setStateEvents(res.data.events);
            }
        })
        .catch(error => {
            toggleSetDisplaySignUpModal();
            setIsSignUpOverride(false);
            notifyError(error.response.data.message)
        })
      }

      const handleDayClick = (day) => {
        //make sure it's a day you can actually sign up for
        if (isEditableDay(day)) {
            events.forEach(event => {
                //first check to see if there's already someone signed up
                if (event.date === day.dateStr) {
                    setIsSignUpOverride(true);
                }
            })

            setSignUpDate(day.dateStr);
            toggleSetDisplaySignUpModal();
        }
      }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className='w-[75%] mx-auto'>
                <h1 className='text-3xl'>Deck Duty</h1>
            </div>

            <Toaster toastOptions={{duration: 8000, style: {marginTop: '10px'}}} />

            {displaySignUpModal &&
                <Modal show={displaySignUpModal}>
                    <SignUpContent
                        signUpDate={signUpDate}
                        toggleSetDisplaySignUpModal={toggleSetDisplaySignUpModal}
                        submitSignUp={submitSignUp}
                        isSignUpOverride={isSignUpOverride}
                    />
                </Modal>
            }

            <FullCalendar
                viewClassNames={'text-white w-[75%] mx-auto'}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                editable={true}
                eventInteractive={true}
                eventClick={() => alert('hi')}
                dateClick={(day) => handleDayClick(day)}
                events={stateEvents}
                eventContent={renderEventContent}
            />

        </AuthenticatedLayout>
    );
}
