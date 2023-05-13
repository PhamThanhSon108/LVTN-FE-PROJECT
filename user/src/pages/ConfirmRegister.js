import React from 'react';
import { useDispatch } from 'react-redux';
import Toast from '../components/LoadingError/Toast';
import { cancelRegister, confirmRegister } from '../Redux/Actions/userActions';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
import { useHistory } from 'react-router-dom';

export default function ConfirmRegister() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { getParamValue } = useSearchParamsCustom();
    const emailVerificationToken = getParamValue('emailVerificationToken');
    const handleConfirm = () => {
        dispatch(confirmRegister(emailVerificationToken.toString(), history));
    };

    const handleCancel = () => {
        dispatch(cancelRegister(emailVerificationToken.toString(), history));
    };
    return (
        <div
            className="container d-flex flex-column justify-content-center align-items-center login-center"
            style={{ height: '80VH' }}
        >
            <form className="Login col-md-6 col-lg-4 col-10">
                <h4 style={{ marginBottom: '15PX' }}>Bạn muốn đăng ký tài khoản tại Fashion shop?</h4>
                <div className="d-flex justify-content-between">
                    <div className="btn btn-outline-danger btn__login" onClick={handleCancel}>
                        Hủy
                    </div>
                    <div className="btn"></div>
                    <div className="btn btn-outline-primary btn__login" onClick={handleConfirm}>
                        Xác nhận
                    </div>
                </div>
            </form>
        </div>
    );
}
