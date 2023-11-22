import React, { useState } from 'react'
import { BsCompass, BsPerson, BsMenuButtonWideFill, BsFillGearFill, BsCompassFill, BsFillPeopleFill, BsGridFill, BsPersonCircle, BsPersonAdd, BsUnity }
    from 'react-icons/bs'
import { AiFillAlert, AiFillSchedule } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ openSidebarToggle, OpenSidebar, accessRoutes }) {

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("userInfo");
        navigate('/login');
    }

    return (
        <aside
            className={`${openSidebarToggle ? '-translate-x-80' : ''} bg-gradient-to-br from-gray-800 to-gray-900  fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}>
            <div className="relative border-b border-white/20">
                <a className="flex items-center gap-4 py-6 px-8" href="#/">
                    <h6
                        className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                        RC Dashboard
                    </h6>
                </a>
                <button
                    onClick={OpenSidebar}
                    className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                    type="button">
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5"
                            stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </button>
            </div>
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    {
                        accessRoutes.length > 0 ? accessRoutes.map((value, index) => (
                            <li key={index}>
                                <Link aria-current="page" className="active" to={value.link}>
                                    <button
                                        className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize ${value.link === location.pathname ? 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : ''}`}
                                        type="button">
                                        <span> {value.iconName} </span>
                                        <p
                                            className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                            {value.name}
                                        </p>
                                    </button>
                                </Link>
                            </li>
                        )
                        ) : <></>

                    }
                </ul>
                <ul className="mb-4 flex flex-col gap-1">
                    <li className="mx-3.5 mt-4 mb-2">
                        <p
                            className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
                            auth pages
                        </p>
                    </li>

                    <li>
                        <button
                            onClick={() => handleLogOut()}
                            className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                className="w-5 h-5 text-inherit">
                                <path fillRule="evenodd"
                                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                    clipRule="evenodd" />
                            </svg>
                            <p
                                className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                logout
                            </p>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

Sidebar.propTypes = {
    accessRoutes: PropTypes.array.isRequired,
    openSidebarToggle: PropTypes.bool.isRequired,
    OpenSidebar: PropTypes.func.isRequired,
};
export default Sidebar