import WelcomeBackground from '../../../public/assets/welcome-background-video.mp4'

export default function WelcomePageContainer({ children, className }) {
    return (
        <div className={className}>
            <div className='absolute w-auto min-w-full min-h-full max-w-none bg-[#2ac2f2] bg-opacity-20 z-10'></div>
            <div className='absolute w-auto min-w-full min-h-full max-w-none bg-black bg-opacity-50 z-20'></div>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-auto min-w-full min-h-full max-w-none object-cover brightness-75">
                    <source src={WelcomeBackground} type='video/mp4'></source>
            </video>

            <div className="z-20">
                {children}
            </div>
        </div>
    );
}
