import { publicationsLists } from '@/services/PublicationsService';
import { publicationsTypeLists } from '@/services/PublicationsType';
import { rcCenterLists } from '@/services/RcCenterService';
import { userLists } from '@/services/UserService';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FcSalesPerformance } from "react-icons/fc";
import { RiNumbersLine } from "react-icons/ri";

function ManagerDashboard(props) {

  const [user, setUser] = useState([]);
  const [rcCenter, setRcCenter] = useState([]);
  const [publicationsType, setPublicationsType] = useState([]);
  const [publications, setPublications] = useState([]);

  useEffect(() => {

    userLists().then((response) => {
      setUser(response.data.listOfData);
    }).catch(error => {
      console.log(error)
    })

    rcCenterLists().then((response) => {
      setRcCenter(response.data.listOfData);
    }).catch(error => {
      console.log(error)
    })

    publicationsTypeLists().then((response) => {
      setPublicationsType(response.data.listOfData);
    }).catch(error => {
      console.log(error);
    })

    publicationsLists().then((response) => {
      setPublications(response.data.listOfData);
    }).catch(error => {
      console.log(error);
    })

  }, [])

  const userCount = user.length;
  const rcCenterCount = rcCenter.length;
  const publicationsTypeCount = publicationsType.length;
  const publicationsCount = publications.length;

  return (
    <>
    <Toaster/>
      <div className="mt-12">
        {/* <!-- dashboard menu start --> */}
        <div className="mb-12 grid gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
          {/* user count */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                className="w-6 h-6 text-white">
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                <path fillRule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                  clipRule="evenodd" />
                <path
                  d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                User&apos;s
              </p>
              <h4
                className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {userCount}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">Total active</strong>&nbsp;user&apos;s
              </p>
            </div>
          </div>
          {/* rc center count */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                className="w-6 h-6 text-white">
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                <path fillRule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                  clipRule="evenodd" />
                <path
                  d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                RC Center&apos;s
              </p>
              <h4
                className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {rcCenterCount}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">Total active</strong>&nbsp;RC center&apos;s
              </p>
            </div>
          </div>
          {/* Parameter type count */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <RiNumbersLine className='icon' />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Parameter&apos;s
              </p>
              <h4
                className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {publicationsTypeCount}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-500">Total updated</strong>&nbsp;parameter&apos;s
              </p>
            </div>
          </div>
          {/* Performance count */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-600 to-purple-400 text-white shadow-purple-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <FcSalesPerformance className='icon' />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Performance&apos;s
              </p>
              <h4
                className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {publicationsCount}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-500">Total updated</strong>&nbsp;performance&apos;s
              </p>
            </div>
          </div>
        </div>
        {/* <!-- dashboard menu end --> */}
      </div>
    </>
  );
}

export default ManagerDashboard;