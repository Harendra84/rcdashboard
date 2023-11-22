import React from 'react'

const Logout = () => {
    const userData = localStorage.removeItem('userInfo');
  return (
    <div>Logout</div>
  )
}

export default Logout