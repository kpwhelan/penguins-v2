import WelcomeBackground from '../../../public/assets/welcome-background-video.mp4'

export default function WelcomePageContainer({ children }) {
    return (
        <main className="relative flex items-center justify-center h-screen overflow-hidden bg-blend-darken"> 
            <div className='absolute w-auto min-w-full min-h-full max-w-none bg-black opacity-35 z-10'></div>
            <video src={WelcomeBackground}
                autoplay="{true}" loop muted 
                className="absolute w-auto min-w-full min-h-full max-w-none object-cover brightness-75"> 
            </video> 

            <div className="z-20">
                {children}
            </div>
        </main>
    );
}