import Container from '@/Components/UI/Container';
import Locations from '@/Components/Locations';

export default function AlternateLocationsSection() {
    return (
        <section className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-30">
            <div
                aria-hidden="true"
                className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-penguins-100/70 blur-3xl"
            />

            <Container>
                <div className="max-w-3xl">
                    <p className="eyebrow">
                        More Places to Swim
                    </p>

                    <h2 className="section-title mt-5">
                        Alternate Penguins locations.
                    </h2>

                    <p className="lead mt-6 max-w-2xl">
                        The Granite State Penguins also swim at additional
                        locations in Southern New Hampshire. Each location has
                        its own dues, schedule, and participation requirements,
                        so contact the listed coordinator before attending.
                    </p>
                </div>

                <div className="mt-12 lg:mt-16">
                    <Locations />
                </div>
            </Container>
        </section>
    );
}
