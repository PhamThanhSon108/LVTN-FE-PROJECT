import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Toast from '../components/LoadingError/Toast';
import { login } from '../Redux/Actions/UserActions';

import { inputPropsConstants } from '../constants/variants';
import { toast } from 'react-toastify';
import { ToastObject } from '../components/LoadingError/ToastObject';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  const handleLogin = {
    success: () => {
      window.location.href = '/';
    },
    error: (message) => {
      toast.error(message, ToastObject);
    },
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(emailRef.current.value, passwordRef.current.value, handleLogin));
  };

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, []);
  return (
    <>
      <Toast />
      <div className="card shadow mx-auto" style={{ maxWidth: '380px', marginTop: '100px' }}>
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Đăng nhập</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input required className="form-control" placeholder="Email" type="email" ref={emailRef} />
            </div>
            <div className="mb-3">
              <input required className="form-control" placeholder="Password" type="password" ref={passwordRef} />
            </div>

            <div className="mb-4">
              <LoadingButton
                loading={loading}
                type="submit"
                variant={inputPropsConstants.variantContained}
                sx={{ width: '100%' }}
              >
                Đăng nhập
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
