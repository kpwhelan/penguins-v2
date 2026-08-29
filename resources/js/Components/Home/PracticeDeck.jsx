const practiceDays = ['Mon', 'Wed', 'Fri'];

export default function PracticeDeck() {
    return (
        <div className="relative z-20 mx-auto w-full max-w-site px-5 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-panel border border-white/20 bg-white/10 shadow-elevated backdrop-blur-xl">
                <div className="grid divide-y divide-white/15 lg:grid-cols-[0.8fr_1.1fr_1.5fr_0.8fr] lg:divide-x lg:divide-y-0">
                    <div className="p-5 sm:p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-penguins-200">
                            Practice
                        </p>

                        <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                            6:30–8:00
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white/55">
                            AM
                        </p>
                    </div>

                    <div className="p-5 sm:p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                            Training Days
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {practiceDays.map((day) => (
                                <span
                                    key={day}
                                    className="flex h-11 min-w-12 items-center justify-center rounded-xl border border-penguins-300/25 bg-penguins-300/10 px-3 text-sm font-extrabold uppercase tracking-wide text-penguins-100"
                                >
                                    {day}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-5 sm:p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                            Pool
                        </p>

                        <p className="mt-2 text-xl font-extrabold text-white">
                            Nashua Boys & Girls Club
                        </p>

                        <p className="mt-2 text-sm leading-6 text-white/60">
                            Five-lane, 25-yard indoor pool in Nashua,
                            New Hampshire.
                        </p>
                    </div>

                    <div className="p-5 sm:p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                            Swimmers
                        </p>

                        <p className="mt-2 text-xl font-extrabold text-white">
                            Adults 18+
                        </p>

                        <p className="mt-2 text-sm leading-6 text-white/60">
                            Varied experience levels.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
