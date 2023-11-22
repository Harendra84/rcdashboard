import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {userType} from '../utils/globalConfig'

const AuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, [component]);

  const checkUser = async () => {
    try {
      // let user = await AuthService.getProfile(true);
      // let user = await AuthService.getProfile(true);
      JSON.parse(localStorage.getItem("loginStatus"));
      let user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        navigate(`/login`);
        return;
      }

      // Check the user's role
      if (user.roleType === userType.ADMIN) {
        navigate(`/admin-dashboard`);
      }  else if(user.roleType === userType.CEO){
        navigate(`/ceo-dashboard`);
      } else if(user.roleType === userType.COORDINATOR){
        navigate(`/coordinator-dashboard`);
      }else{
        navigate(`/login`);
      }
      setStatus(true);
      return;
    } catch (error) {
      navigate(`/login`);
    }
  }

  return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
}

AuthGuard.propTypes = {
  component: PropTypes.element.isRequired
};
export default AuthGuard;