import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [title, setTitle] = useState("Profile");

  useEffect(() => {
    const storedUserData = localStorage.getItem('userInfo');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <>
      <div className='main-container'>
        <div className="grid w-full gap-4">
          <div className="grid grid-cols-1 gap-8 mx-auto">
            <div className="">
              <Card className="w-[400px]" style={{ backgroundColor: '#1d2634', color: '#ffffff' }}>
                <CardHeader className="flex justify-center items-center">
                  <Avatar>
                    <AvatarImage src="/avataaars.svg" alt="@shadcn" />
                    <AvatarFallback>{ }</AvatarFallback>
                  </Avatar>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>Login Details</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-1 mx-auto">
                  <div className="flex items-center mx-auto">
                    <span className="text-slate-300 font-bold">Full Name : </span>
                    <CardDescription className="mx-2 text-slate-300"> {userData && (
                      <div>
                        <p>{userData.fullName}</p>
                      </div>
                    )}</CardDescription>
                  </div>
                  <div className="flex items-center mx-auto">
                    <span className="text-slate-300 font-bold">Username : </span>
                    <CardDescription className="mx-2 text-slate-300">
                      {userData && (
                        <div>
                          <p>{userData.username}</p>
                        </div>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center mx-auto">
                    <span className="text-slate-300 font-bold">Role Type : </span>
                    <CardDescription className="mx-2 text-slate-300">
                      {userData && (
                        <div>
                          <p>{userData.roleType}</p>
                        </div>
                      )}
                    </CardDescription>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
