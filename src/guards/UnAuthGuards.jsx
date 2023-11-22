import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import AuthService from '../services/auth';


const UnAuthGuard = ({ component }) => {
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
    }, [component]);

    const checkUser = async () => {
        try {
            // let user = await AuthService.getProfile();
            let user = JSON.parse(localStorage.getItem("userInfo"));
            if (!user) {
                localStorage.removeItem("userInfo")
            } else {
                navigate(`/`);
            }
            setStatus(true);
        } catch (error) {
            navigate(`/`);
        }
    }

    return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
}

UnAuthGuard.propTypes = {
    component: PropTypes.element.isRequired
  };

export default UnAuthGuard;