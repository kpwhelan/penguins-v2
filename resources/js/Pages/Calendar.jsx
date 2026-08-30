import BulkSignUpContent from '@/Components/BulkSingUpContent';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SignUpContent from '@/Components/SignUpContent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const PRACTICE_DAYS = new Set([1, 3, 5]);

function localDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isEligibleDate(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return PRACTICE_DAYS.has(date.getDay()) && date >= today;
}

export default function Calendar({ deckDutyEvents, members = [], auth }) {
    const [events, setEvents] = useState(deckDutyEvents);
    const [signUpDate, setSignUpDate] = useState('');
    const [isSignUpOverride, setIsSignUpOverride] = useState(false);
    const [isViewingBulk, setIsViewingBulk] = useState(false);
    const [bulkEditSelectedDays, setBulkEditSelectedDays] = useState([]);
    const [displaySignUpModal, setDisplaySignUpModal] = useState(false);
    const [displayBulkSignUpModal, setDisplayBulkSignUpModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => setEvents(deckDutyEvents), [deckDutyEvents]);

    const eventsByDate = useMemo(() => new Map(events.map((event) => [event.date, event])), [events]);

    const closeSignUpModal = () => {
        setDisplaySignUpModal(false);
        setSignUpDate('');
        setIsSignUpOverride(false);
    };

    const toggleBulkMode = () => {
        setIsViewingBulk((current) => !current);
        setBulkEditSelectedDays([]);
    };

    const handleDateClick = ({ date, dateStr }) => {
        if (!isEligibleDate(date)) return;

        if (isViewingBulk) {
            setBulkEditSelectedDays((selected) => selected.includes(dateStr)
                ? selected.filter((item) => item !== dateStr)
                : [...selected, dateStr].sort());
            return;
        }

        const existingEvent = eventsByDate.get(dateStr);
        setSignUpDate(dateStr);
        setIsSignUpOverride(Boolean(existingEvent && String(existingEvent.user_id) !== String(auth.user.id)));
        setDisplaySignUpModal(true);
    };

    const handleEventClick = ({ event, jsEvent }) => {
        jsEvent.preventDefault();

        if (!event.start) return;

        handleDateClick({
            date: event.start,
            dateStr: event.startStr.slice(0, 10),
        });
    };

    const submitSignUp = () => {
        setProcessing(true);
        axios.post(route('calendar.signup'), { date: signUpDate, confirm_override: isSignUpOverride })
            .then((response) => {
                setEvents(response.data.deckDutyEvents);
                toast.success(response.data.message);
                closeSignUpModal();
            })
            .catch((error) => {
                const responseData = error.response?.data;

                if (responseData?.deckDutyEvents) {
                    setEvents(responseData.deckDutyEvents);
                }

                if (responseData?.requires_confirmation) {
                    setIsSignUpOverride(true);
                } else {
                    closeSignUpModal();
                }

                toast.error(responseData?.message ?? 'We could not update that date. Please try again.');
            })
            .finally(() => setProcessing(false));
    };

    const submitBulkSignUp = (userId) => {
        setProcessing(true);
        axios.post(route('calendar.bulk.signup'), { dates: bulkEditSelectedDays, user_id: userId })
            .then((response) => {
                setEvents(response.data.deckDutyEvents);
                setBulkEditSelectedDays([]);
                setDisplayBulkSignUpModal(false);
                toast.success(response.data.message);
            })
            .catch((error) => toast.error(error.response?.data?.message ?? 'We could not update those dates. Please try again.'))
            .finally(() => setProcessing(false));
    };

    const dayCellClassNames = ({ date }) => {
        const dateString = localDateString(date);
        if (!isEligibleDate(date)) return ['deck-duty-unavailable'];
        if (bulkEditSelectedDays.includes(dateString)) return ['deck-duty-available', 'deck-duty-selected'];
        return ['deck-duty-available'];
    };

    const eventClassNames = ({ event }) => event.extendedProps.user_id === auth.user.id
        ? ['deck-duty-event-mine']
        : ['deck-duty-event-assigned'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-penguins-300">Team Schedule</p><h1 className="mt-2 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Deck Duty</h1><p className="mt-3 text-white/60">Choose an available practice date and help keep the team moving.</p></div>}
        >
            <Head title="Deck Duty Calendar" />
            <Toaster toastOptions={{ duration: 8000, style: { marginTop: '10px' } }} />

            <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="rounded-panel border border-navy-950/15 bg-white p-5 shadow-soft sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <div><p className="eyebrow">How it works</p><p className="mt-2 text-sm leading-6 text-slate">Select any upcoming <span className="font-extrabold text-navy-950">Monday, Wednesday, or Friday</span> to volunteer.</p></div>
                        <div className="flex flex-wrap gap-4 text-xs font-bold text-slate">
                            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-penguins-500" />Your assignment</span>
                            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-navy-700" />Another swimmer</span>
                        </div>
                    </div>
                </div>

                {!!auth.user.is_admin && (
                    <div className="flex flex-wrap gap-3 rounded-panel border border-navy-950/15 bg-white p-3 shadow-soft">
                        <button
                            type="button"
                            onClick={toggleBulkMode}
                            className={isViewingBulk
                                ? 'inline-flex min-h-12 items-center justify-center rounded-full bg-navy-950 px-6 text-sm font-extrabold text-white transition hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-penguins-500 focus:ring-offset-2'
                                : 'button-primary'}
                        >
                            {isViewingBulk ? 'Exit bulk edit' : 'Bulk edit dates'}
                        </button>
                        {isViewingBulk && bulkEditSelectedDays.length > 0 && <PrimaryButton onClick={() => setDisplayBulkSignUpModal(true)}>Assign {bulkEditSelectedDays.length} {bulkEditSelectedDays.length === 1 ? 'date' : 'dates'}</PrimaryButton>}
                    </div>
                )}
            </div>

            {isViewingBulk && <div className="mb-5 rounded-2xl border border-penguins-500/30 bg-penguins-50 px-5 py-4 text-sm text-navy-950"><span className="font-extrabold">Bulk edit is active.</span> Select eligible dates, then assign them to a swimmer or clear their current assignments.</div>}

            <section className="calendar-shell overflow-hidden rounded-panel border border-navy-950/15 bg-white p-3 shadow-elevated sm:p-6">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    eventContent={({ event }) => <span className="deck-duty-event-name">{event.extendedProps.user_name}</span>}
                    dayCellClassNames={dayCellClassNames}
                    eventClassNames={eventClassNames}
                    editable={false}
                    selectable={false}
                    dayMaxEvents={2}
                    fixedWeekCount={false}
                    height="auto"
                    headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
                    buttonText={{ today: 'Today' }}
                />
            </section>

            <Modal show={displaySignUpModal} maxWidth="lg" onClose={closeSignUpModal}>
                <SignUpContent signUpDate={signUpDate} submitSignUp={submitSignUp} toggleSetDisplaySignUpModal={closeSignUpModal} isSignUpOverride={isSignUpOverride} processing={processing} />
            </Modal>

            <Modal show={displayBulkSignUpModal} maxWidth="lg" onClose={() => setDisplayBulkSignUpModal(false)}>
                <BulkSignUpContent members={members} bulkEditSelectedDays={bulkEditSelectedDays} toggleSetDisplayBulkSignUpModal={() => setDisplayBulkSignUpModal(false)} submitBulkSignUp={submitBulkSignUp} processing={processing} />
            </Modal>
        </AuthenticatedLayout>
    );
}
