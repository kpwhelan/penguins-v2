import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Locations() {

    return (
        <>
            {/* <h2 className='text-6xl mb-4'>Who Are the Penguins?</h2> */}
            <div className="space-y-14 lg:space-y-0 flex flex-wrap md:justify-around mt-4 mx-auto lg:mx-0">
                <div className="w-[70%] lg:w-[40%] xl:w-[30%] h-96 rounded-md">
                    <iframe className="rounded-md" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5849.088977085471!2d-71.35928388820987!3d42.86135050316398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e252ca24e13c0d%3A0xb2cd2760367094f!2sThe%20Workout%20Club%20of%20Londonderry!5e0!3m2!1sen!2sus!4v1724378643545!5m2!1sen!2sus" width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <p className="mt-2 text-lg">Contact: <a className="underline" href={`mailto:tracyswims@mindspring.com`}>Sheryl Scott</a></p>
                </div>
                <div className="w-[70%] lg:w-[40%] xl:w-[30%] h-96 rounded-md">
                    <iframe className="rounded-md" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5857.096766455702!2d-71.25046042384288!3d42.77675557115727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3abcbf17628a1%3A0x70c48a01d52c514f!2sThe%20Workout%20Club%20of%20Salem!5e0!3m2!1sen!2sus!4v1725551224369!5m2!1sen!2sus" width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <p className="mt-2 text-lg">Contact: <a className="underline" href={`mailto:scottyswims@comcast.net`}>Sheryl Scott</a> or <a className="underline" href={`mailto:emarzano@gmail.com`}>Eric Marzano</a></p>
                </div>
            </div>
        </>
    );
}
