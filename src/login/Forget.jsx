import { changePassword } from '@/services/LoginService';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom'

const Forget = () => {

    const [inputs, setInputes] = useState({
        username: "",
        oldPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        setInputes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await changePassword(inputs.username, inputs.oldPassword, inputs.newPassword);
            if (!res.data.status) {
                toast.error("Wrong Credentials 😢");
            }
            if (res.data.status) {
                toast.success("Password changed successfully!! 😢");
                setLoading(false);
                navigate('/login')
            }
        } catch (error) {
            toast.error("Something went wrong 😢");
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex justify-center">
                            Forget Password?
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input onChange={handleChange} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                            </div>
                            <div>
                                <label htmlFor="old-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                                <input onChange={handleChange} type="password" name="oldPassword" id="oldPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                <input onChange={handleChange} type="password" name="newPassword" id="newPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg
                                    className="w-6 h-6 -ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy={7} r={4} />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3">{loading ? (
                                    <AiOutlineLoading3Quarters className="flex items-center justify-center w-full animate-spin" />
                                ) : (
                                    "Reset Password"
                                )}</span>
                            </button>
                        </form>
                        <div className="mt-5 text-gray-800 font-bold flex justify-center">
                    <Link to={`/login`}>Back Login?</Link>
                  </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Forget