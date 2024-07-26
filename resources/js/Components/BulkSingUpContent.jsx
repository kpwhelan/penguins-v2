import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function BulkSignUpContent({ bulkEditSelectedDays, toggleSetDisplayBulkSignUpModal, submitBulkSignUp }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        retrieveUsers()
    }, []);

    const retrieveUsers = () => {
        axios.get(route('users'))
        .then(res => {
            if (res.data.success) {
                setUsers(res.data.users);
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleSelectedUser = (e) => {
        setSelectedUser(e.target.value);
    }

    return (
        <div className='p-4'>
            <p className='text-lg text-black'>Select User For Bulk SignUp:</p>
            <p className="mt-2 text-md text-black">For Dates:</p>

            {bulkEditSelectedDays.map(day => {
                return <p key={day} className="text-black">{day}</p>
            })}

            <select onChange={(e) => handleSelectedUser(e)} className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=''>Select User</option>
                <option value="clear">No User - This will clear all selected dates</option>
                {users.map(user => {
                    return <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                })}
            </select>

            
            <div className='w-full mx-auto mt-4 mb-4 flex justify-end'>
                <PrimaryButton onClick={() => submitBulkSignUp(selectedUser)}  className=" float-end mb-2 mt-2">Submit</PrimaryButton>
                <SecondaryButton className='ml-2' onClick={toggleSetDisplayBulkSignUpModal}>Cancel</SecondaryButton>
            </div>
        </div>
    );
}