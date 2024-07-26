import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@/Components/Modal';
import SignUpContent from '@/Components/SignUpContent';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Calendar({ events, auth }) {
    const editableDays = ['fc-day-mon', 'fc-day-wed', 'fc-day-fri'];
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const [stateEvents, setStateEvents] = useState([]);
    const [displaySignUpModal, setDisplaySignUpModal] = useState(false);
    const [signUpDate, setSignUpDate] = useState('');
    const [isSignUpOverride, setIsSignUpOverride] = useState(false);
    const [isViewingBulk, setIsViewingBulk] = useState(false);
    const [bulkEditSelectedDays, setBulkEditSelectedDays] = useState([]);

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

      const toggleIsViewingBulk = () => {
        if (isViewingBulk) setBulkEditSelectedDays([]);
        setIsViewingBulk(isViewingBulk ? false : true);
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

      const handleBulkEditDayLick = (day, cell) => {
        console.log(day)
        
        if (bulkEditSelectedDays.includes(day.dateStr)) {
            setBulkEditSelectedDays(bulkEditSelectedDays.filter(item => item !== day.dateStr));
            day.dayEl.style.backgroundColor = 'black';
            return;
        }

        setBulkEditSelectedDays([...bulkEditSelectedDays, day.dateStr]);
        day.dayEl.style.backgroundColor = '#36454f';
      }

      const checker = () => console.log(bulkEditSelectedDays)

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Deck Duty Calendar" />

            <div className='w-[75%] mx-auto mt-8 mb-4'>
                <h1 className='text-3xl'>Deck Duty</h1>
                {!!auth.user.is_admin &&
                    <>
                        <p>Currently Viewing: <span className='text-xl font-semibold'>{isViewingBulk ? 'Bulk Edit Calendar' : 'Standard Calendar'}</span></p>
                        <PrimaryButton onClick={toggleIsViewingBulk} className='mt-1 active:none'>{isViewingBulk ? 'Switch To Regular Calendar' : 'Switch To Bulk Edit'}</PrimaryButton>
                        <PrimaryButton onClick={checker}>Click Me!!!</PrimaryButton>
                    </>
                }
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

            {isViewingBulk ?
                <FullCalendar
                    viewClassNames={'text-white w-[75%] mx-auto'}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    editable={true}
                    dateClick={(day) => handleBulkEditDayLick(day)}
                    events={stateEvents}
                    eventContent={renderEventContent}
                 />
                :
                <FullCalendar
                    viewClassNames={'text-white w-[75%] mx-auto'}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    editable={true}
                    eventInteractive={true}
                    // eventClick={() => alert('hi')}
                    dateClick={(day) => handleDayClick(day)}
                    events={stateEvents}
                    eventContent={renderEventContent}
                />
            }
            
            {/* {isViewingBulk &&
                
            } */}

        </AuthenticatedLayout>
    );
}
