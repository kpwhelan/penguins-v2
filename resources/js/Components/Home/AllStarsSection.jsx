import AllStarCard from '@/Components/Home/AllStarCard';
import Container from '@/Components/UI/Container';

export default function AllStarsSection({ swimmerBios = [] }) {
    if (!swimmerBios?.length) {
        return null;
    }

    return (
        <section
            id="all-stars"
            className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24 lg:py-30"
        >
            <div
                aria-hidden="true"
                className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-penguins-400/15 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-penguins-700/20 blur-3xl"
            />

            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="eyebrow-light">
                        Penguins All Stars
                    </p>

                    <h2 className="section-title-light mt-5">
                        Celebrating the swimmers who make the Penguins special.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
                        Meet some of the swimmers whose dedication, personality,
                        and love of the water help define the Granite State
                        Penguins.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                    {swimmerBios.map((bio) => (
                        <AllStarCard
                            key={bio.id}
                            bio={bio}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
