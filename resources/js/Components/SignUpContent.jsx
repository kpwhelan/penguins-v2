import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function SignUpContent({signUpDate, submitSignUp, toggleSetDisplaySignUpModal, isSignUpOverride}) {
    const overrideText = "Are you sure want to replace the current swimmer with yourself?";
    const signUpText = "Signing up for deck duty."

    return (
        <div className='p-4'>
            <p className='text-lg font-bold text-black'>{isSignUpOverride ? overrideText : signUpText}</p>
            <p className='text-lg text-black'>For date: {signUpDate}</p>
            <p className='text-lg text-red-400'>Reminder: You must be at deck duty no later than 6:20!</p>
            <div className='w-[75%] mx-auto mt-4 mb-4 flex justify-end'>

                <PrimaryButton onClick={() => submitSignUp(signUpDate)}>Confirm</PrimaryButton>
                <SecondaryButton className='ml-2' onClick={toggleSetDisplaySignUpModal}>Cancel</SecondaryButton>
            </div>
        </div>
    );
}
