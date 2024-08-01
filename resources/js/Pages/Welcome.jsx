import WelcomePageContainer from '@/Containers/WelcomePageContainer';
import { Link, Head } from '@inertiajs/react';
import WelcomePageNav from '@/Components/WelcomePageNav';
import AboutUsContainer from '@/Containers/AboutUsContainer';
import 'animate.css';
import NewsContainer from '@/Containers/NewsContainer';
import swimBackground from '../../../public/assets/swim-background.jpg';
import NewsItemCard from '@/Components/NewsItemCard';
import { Carousel } from '@material-tailwind/react';
import { useState } from 'react';

export default function Welcome({ auth, newsItems }) {
    const [blurNav, setBlurNav] = useState(false);

    const handleScroll = () => {
        window.scrollY >= 35 ? setBlurNav(true) : setBlurNav(false);
    }


    window.addEventListener('scroll', handleScroll);

    return (
        <>
            <Head title="Granite State Penguins" />

            <main>
                <WelcomePageNav className="animate__animated animate__slower animate__fadeIn" blurNav={blurNav} />
                <WelcomePageContainer className="relative flex items-center justify-center h-screen overflow-hidden">
                    <div className='text-center animate__animated animate__slower animate__fadeIn'>
                        <h1 className='z-30 font-extrabold text-7xl'>The Granite State Penguins</h1>
                        <h2 className='z-30 font-semibold text-5xl'>Masters Swim Team</h2>
                    </div>
                </WelcomePageContainer>

                <NewsContainer className="text-white mt-10 w-[90%] p-10 mx-auto bg-[url('https://penguins.nyc3.cdn.digitaloceanspaces.com/assets/section-background.png')] bg-opacity-90 bg-no-repeat bg-cover rounded-md">
                    <h2 className='text-6xl font-semibold'>Pengins News</h2>

                    {newsItems && newsItems.length > 0 ?
                        <Carousel className="rounded-md w-[100%] h-fit max-h-[800px] mt-6 items-center">
                            {newsItems.map(newsItem => {
                                return <NewsItemCard className='rounded-md' newsItem={newsItem} />
                            })}
                        </Carousel>
                        :
                        <p className='text-2xl ml-10 mt-6'>No News Yet...</p>
                    }
                </NewsContainer>

                <hr className="my-12 h-0.5 border-t-0 bg-white dark:bg-white/10" />

                <AboutUsContainer className=' mt-28 w-[95%] text-center mx-auto'>
                    <div className='flex justify-between'>
                        <div className='text-xl w-[90%] mx-auto'>
                            <h2 className='text-6xl mb-4'>Who Are the Penguins?</h2>

                            <p className="text-xl leading-relaxed">We are an amazing group of swimmers who practice Monday, Wednesday, Thursday, and Friday from 6:30am to 8:00am at the Nashua Boys and Girls Club's 5-lane, 25-yard pool. A team member is always present during workouts. Our structured sessions cater to adults aged 20 and above, encompassing a diverse range of swimming abilities.</p>

                            <p className="text-xl leading-relaxed mt-6">Our swimmers exhibit a wide range of abilities, with 100-yard freestyle times spanning from around 2:00 minutes to :48 seconds. Many swimmers match or exceed their high school speeds, and some even surpass their college times.</p>

                            <p className="text-xl leading-relaxed mt-6">Practices focus on stroke technique, starts and turns, and cardiovascular fitness. Winter workouts emphasize shorter distances typical of indoor meets, while summer sessions prepare for longer distances in open water and triathlons. Each season starts with intensive one-on-one instruction and video analysis of stroke and turn techniques, shifting towards cardiovascular strength and maintenance later on. Our training regimen adheres strictly to weekly, tri-weekly, monthly, and seasonal plans, culminating in two main meets each year in December and April.</p>

                            <p className="text-xl leading-relaxed mt-6">While encouraged to participate in 2-3 meets annually, many members choose not to. These meets are inclusive and informal, attracting individuals of all ages and abilities. Above all, we prioritize enjoyment and camaraderie for everyone involved. Join us—you're welcome here!</p>

                            <p className="text-2xl leading-relaxed mt-6">Learn more about membership <Link
                            href={route('membership')}
                            className="text-2xl underline">here</Link>!</p>
                        </div>

                        <div>
                            <img src={swimBackground} className='mx-auto h-[100%] w-[90%] object-none object-right-bottom rounded-md'></img>
                        </div>
                    </div>
                </AboutUsContainer>
            </main>
        </>
    );
}
