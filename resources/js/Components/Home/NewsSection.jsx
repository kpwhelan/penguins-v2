import Container from '@/Components/UI/Container';
import NewsCard from '@/Components/Home/NewsCard';

export default function NewsSection({ newsItems = [] }) {
    const items = newsItems?.slice(0, 3) ?? [];
    const featuredItem = items[0];
    const additionalItems = items.slice(1);

    return (
        <section
            id="news"
            className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-30"
        >
            {/* Very subtle aquatic background detail */}
            <div
                aria-hidden="true"
                className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-penguins-100/50 blur-3xl"
            />

            <Container>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-3xl">
                        <p className="eyebrow">
                            From the Pool Deck
                        </p>

                        <h2 className="section-title mt-5">
                            Latest from the Penguins.
                        </h2>

                        <p className="lead mt-5 max-w-2xl">
                            Team updates, meet news, announcements, and everything
                            else happening in and around the pool.
                        </p>
                    </div>

                    <a
                        href="https://www.usms.org/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-navy-950 transition hover:text-penguins-700"
                    >
                        US Masters Swimming

                        <svg
                            aria-hidden="true"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7 17 17 7M9 7h8v8"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                </div>

                {featuredItem ? (
                    <div className="mt-12 lg:mt-16">
                        <NewsCard
                            newsItem={featuredItem}
                            featured
                        />

                        {additionalItems.length > 0 && (
                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                {additionalItems.map((newsItem) => (
                                    <NewsCard
                                        key={newsItem.id}
                                        newsItem={newsItem}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="mt-12 overflow-hidden rounded-panel border border-navy-950/10 bg-mist p-8 text-center sm:p-12">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-penguins-100 text-penguins-700">
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M5 5h14v14H5z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M8 9h8M8 13h8M8 17h5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <h3 className="mt-5 text-xl font-extrabold text-navy-950">
                            Nothing new from the pool deck yet.
                        </h3>

                        <p className="mx-auto mt-3 max-w-md leading-7 text-slate">
                            Check back soon for team announcements, meet updates,
                            and other Penguins news.
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}
