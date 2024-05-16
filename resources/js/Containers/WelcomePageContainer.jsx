import WelcomeBackground from '../../../public/assets/welcome-background-video.mp4'

export default function WelcomePageContainer({ children }) {
    return (
        <main className="relative flex items-center justify-center h-screen overflow-hidden"> 
            <video src={WelcomeBackground}
                autoplay="{true}" loop muted 
                className="absolute w-auto min-w-full min-h-full max-w-none object-cover"> 
            </video> 

            <div className=" z-10">
                {children}
            </div>
        </main>
    );
}