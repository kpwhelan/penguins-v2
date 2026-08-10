const locations = [
    {
        name: 'Londonderry',
        facility: 'The Workout Club of Londonderry',
        mapSrc:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5849.088977085471!2d-71.35928388820987!3d42.86135050316398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e252ca24e13c0d%3A0xb2cd2760367094f!2sThe%20Workout%20Club%20of%20Londonderry!5e0!3m2!1sen!2sus!4v1724378643545!5m2!1sen!2sus',
        contacts: [
            {
                name: 'Sheryl Scott',
                email: 'tracyswims@mindspring.com',
            },
        ],
    },
    {
        name: 'Salem',
        facility: 'The Workout Club of Salem',
        mapSrc:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5857.096766455702!2d-71.25046042384288!3d42.77675557115727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3abcbf17628a1%3A0x70c48a01d52c514f!2sThe%20Workout%20Club%20of%20Salem!5e0!3m2!1sen!2sus!4v1725551224369!5m2!1sen!2sus',
        contacts: [
            {
                name: 'Sheryl Scott',
                email: 'scottyswims@comcast.net',
            },
            {
                name: 'Eric Marzano',
                email: 'emarzano@gmail.com',
            },
        ],
    },
];

export default function Locations() {
    return (
        <div className="grid gap-8 lg:grid-cols-2">
            {locations.map((location) => (
                <article
                    key={location.name}
                    className="overflow-hidden rounded-panel border border-navy-950/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                    <div className="relative">
                        <iframe
                            title={`${location.facility} map`}
                            src={location.mapSrc}
                            className="h-80 w-full border-0 sm:h-96"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-navy-950/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-soft backdrop-blur-md">
                            {location.name}
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-700">
                            Alternate Penguins Location
                        </p>

                        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy-950">
                            {location.facility}
                        </h3>

                        <div className="mt-6 border-t border-navy-950/10 pt-6">
                            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-navy-950/40">
                                Contact
                            </p>

                            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                                {location.contacts.map((contact, index) => (
                                    <span
                                        key={contact.email}
                                        className="inline-flex items-center"
                                    >
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="font-bold text-penguins-700 transition hover:text-penguins-900"
                                        >
                                            {contact.name}
                                        </a>

                                        {index <
                                            location.contacts.length - 1 && (
                                            <span className="ml-2 text-slate">
                                                or
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
