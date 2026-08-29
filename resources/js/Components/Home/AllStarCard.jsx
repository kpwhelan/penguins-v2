export default function AllStarCard({ bio }) {
    return (
        <article className="group overflow-hidden rounded-card border border-white/10 bg-white/5 shadow-soft backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-card">
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={bio.image_url}
                    alt={bio.swimmer_name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-extrabold tracking-tight text-white">
                        {bio.swimmer_name}
                    </h3>
                </div>
            </div>

            {bio.body && (
                <div className="p-6">
                    <p className="leading-7 text-white/65">
                        {bio.body}
                    </p>
                </div>
            )}
        </article>
    );
}
