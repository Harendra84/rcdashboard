import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userInfo, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from local storage on component mount
    const storedUserData = localStorage.getItem('userInfo');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleProfileClick = () => {
    // Handle click event to show user data from local storage
    const storedUserData = localStorage.getItem('userInfo');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  };

  return (
    <div>
      {/* User Profile Icon */}
      <div
        style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ccc', cursor: 'pointer' }}
        onClick={handleProfileClick}
      >
        {/* Display user data in the profile icon */}
        {userInfo && (
          <img
            src={userData.profilePictureUrl} // Replace with the actual property you want to display
            alt={userData.username} // Replace with the actual property you want to display
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        )}
      </div>

      {/* Display additional user information */}
      {userInfo && (
        <div>
          <p>{userInfo.fullName}</p>
          <p>{userInfo.username}</p>
          <p>{userInfo.roleType}</p>
          {/* Add more properties as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;
