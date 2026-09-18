import Container from '@/Components/UI/Container';
import NewsCard from '@/Components/Home/NewsCard';
import Modal from '@/Components/Modal';
import { useState } from 'react';

function formatDate(dateString) {
    if (!dateString) return null;

    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(dateString));
}

function LinkedNewsBody({ children }) {
    const linkPattern = /(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;

    return children.split(linkPattern).map((part, index) => {
        if (part.match(/^https?:\/\//)) {
            return <a key={`${part}-${index}`} href={part} target="_blank" rel="noreferrer" className="font-bold text-penguins-700 underline decoration-penguins-300 underline-offset-4 transition hover:text-navy-950">{part}</a>;
        }

        if (part.match(/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/)) {
            return <a key={`${part}-${index}`} href={`mailto:${part}`} className="font-bold text-penguins-700 underline decoration-penguins-300 underline-offset-4 transition hover:text-navy-950">{part}</a>;
        }

        return part;
    });
}

export default function NewsSection({ newsItems = [] }) {
    const items = newsItems?.slice(0, 3) ?? [];
    const featuredItem = items[0];
    const additionalItems = items.slice(1);
    const historicalItems = newsItems?.slice(3) ?? [];
    const [selectedNewsItem, setSelectedNewsItem] = useState(null);
    const [archiveIsOpen, setArchiveIsOpen] = useState(false);

    return (
        <>
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
                            onReadMore={setSelectedNewsItem}
                        />

                        {additionalItems.length > 0 && (
                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                {additionalItems.map((newsItem) => (
                                    <NewsCard
                                        key={newsItem.id}
                                        newsItem={newsItem}
                                        onReadMore={setSelectedNewsItem}
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

                {historicalItems.length > 0 && (
                    <div className="mt-10 border-t border-navy-950/10 pt-8">
                        <button
                            type="button"
                            aria-expanded={archiveIsOpen}
                            aria-controls="news-archive"
                            onClick={() => setArchiveIsOpen((current) => !current)}
                            className="flex w-full items-center justify-between gap-5 rounded-2xl border border-navy-950/10 bg-mist px-5 py-4 text-left transition hover:border-penguins-500/40 hover:bg-penguins-50 focus:outline-none focus:ring-2 focus:ring-penguins-500 focus:ring-offset-4 sm:px-6"
                        >
                            <span>
                                <span className="block text-lg font-extrabold text-navy-950">News archive</span>
                                <span className="mt-1 block text-sm text-slate">Browse {historicalItems.length} older {historicalItems.length === 1 ? 'update' : 'updates'} from the Penguins.</span>
                            </span>
                            <svg className={`h-6 w-6 shrink-0 text-penguins-700 transition-transform ${archiveIsOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        {archiveIsOpen && (
                            <div id="news-archive" className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {historicalItems.map((newsItem) => (
                                    <NewsCard key={newsItem.id} newsItem={newsItem} onReadMore={setSelectedNewsItem} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </Container>

        </section>

        <Modal show={Boolean(selectedNewsItem)} maxWidth="2xl" onClose={() => setSelectedNewsItem(null)}>
                {selectedNewsItem && (
                    <article>
                        <div className="relative aspect-[16/8] overflow-hidden bg-penguins-100">
                            {selectedNewsItem.image_url ? (
                                <img src={selectedNewsItem.image_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-penguins-100 via-penguins-300 to-penguins-700 p-10">
                                    <img src="/assets/gsp-logo-1200w.png" alt="" className="max-h-48 w-full object-contain drop-shadow-xl" />
                                </div>
                            )}
                            <button type="button" onClick={() => setSelectedNewsItem(null)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-navy-950/75 text-2xl text-white shadow-lg backdrop-blur transition hover:bg-navy-950 focus:outline-none focus:ring-2 focus:ring-penguins-300" aria-label="Close news article">×</button>
                        </div>
                        <div className="p-6 sm:p-9">
                            {selectedNewsItem.created_at && <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-penguins-700">{formatDate(selectedNewsItem.created_at)}</p>}
                            <h3 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-4xl">{selectedNewsItem.title || 'Penguins Update'}</h3>
                            <div className="mt-6 whitespace-pre-line break-words text-base leading-8 text-slate sm:text-lg"><LinkedNewsBody>{selectedNewsItem.body}</LinkedNewsBody></div>
                            <div className="mt-8 border-t border-navy-950/10 pt-5 text-sm font-extrabold text-navy-950">Granite State Penguins</div>
                        </div>
                    </article>
                )}
        </Modal>
        </>
    );
}
