function formatDate(dateString) {
    if (!dateString) {
        return null;
    }

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(dateString));
}

function excerpt(text, length = 180) {
    if (!text) {
        return '';
    }

    if (text.length <= length) {
        return text;
    }

    return `${text.slice(0, length).trim()}…`;
}

export default function NewsCard({
    newsItem,
    featured = false,
}) {
    const date = formatDate(newsItem.created_at);

    if (featured) {
        return (
            <article className="group overflow-hidden rounded-panel bg-navy-950 shadow-elevated">
                <div className="grid min-h-full lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative min-h-72 overflow-hidden sm:min-h-96 lg:min-h-[30rem]">
                        {newsItem.image_cdn ? (
                            <img
                                src={newsItem.image_cdn}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-penguins-400 via-penguins-600 to-navy-950" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/20" />

                        <div className="absolute left-6 top-6">
                            <span className="rounded-full border border-white/20 bg-navy-950/55 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur">
                                Latest
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                        {date && (
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-penguins-300">
                                {date}
                            </p>
                        )}

                        <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.025em] text-white sm:text-4xl">
                            {newsItem.title || 'Penguins Update'}
                        </h3>

                        {newsItem.body && (
                            <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                                {excerpt(newsItem.body, 320)}
                            </p>
                        )}

                        <div className="mt-8 flex items-center gap-3 text-sm font-bold text-penguins-200">
                            <span className="h-px w-10 bg-penguins-400" />

                            Granite State Penguins
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-card border border-navy-950/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
            <div className="relative aspect-[16/10] overflow-hidden bg-penguins-100">
                {newsItem.image_cdn ? (
                    <img
                        src={newsItem.image_cdn}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-penguins-200 via-penguins-400 to-penguins-700" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
                {date && (
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-penguins-700">
                        {date}
                    </p>
                )}

                <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.02em] text-navy-950">
                    {newsItem.title || 'Penguins Update'}
                </h3>

                {newsItem.body && (
                    <p className="mt-4 leading-7 text-slate">
                        {excerpt(newsItem.body)}
                    </p>
                )}
            </div>
        </article>
    );
}
