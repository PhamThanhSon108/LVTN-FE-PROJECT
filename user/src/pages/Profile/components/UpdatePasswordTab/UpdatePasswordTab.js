import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';
import { updateUserPassword } from '~/Redux/Actions/userActions';
import { inputPropsConstants } from '~/constant/variants';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import styles from './UpdatePasswordTab.module.scss';
import { Toastobjects } from '~/Redux/Actions/cartActions';
import { toast } from 'react-toastify';

export const UpdatePasswordTab = () => {
    const dispatch = useDispatch();
    const [objFormPass, setObjFromPass] = useState({});
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    function checkPassword() {
        const passObj = {};
        if (isEmpty(oldPassword)) {
            passObj.oldPassword = 'Bạn chưa nhập mật khẩu hiện tại';
        }
        if (isEmpty(password)) {
            passObj.password = 'Bạn chưa nhập mật khẩu mới';
        } else {
            if (password.length < 6) {
                passObj.password =
                    'Mật khẩu phải từ 6 - 255 ký tự, ít nhất 1 chữ cái, 1 chữ số và không có khoảng trắng';
            }
        }
        if (isEmpty(confirmPassword)) {
            passObj.confirmPassword = 'Bạn chưa nhập lại mật khẩu mới';
        } else {
            if (confirmPassword.length < 6) {
                passObj.confirmPassword =
                    'Mật khẩu phải từ 6 - 255 ký tự, ít nhất 1 chữ cái, 1 chữ số và không có khoảng trắng';
            } else {
                if (password !== confirmPassword) {
                    passObj.confirmPassword = 'Mật khẩu không khớp';
                }
            }
        }
        setObjFromPass(passObj);
        if (Object.keys(passObj).length > 0) return false;
        return true;
    }
    const handleAfterFetch = {
        success: () => {
            toast.success('Cập nhật mật khẩu thành công', Toastobjects);
            setLoadingUpdate(false);
            setOldPassword('');
            setPassword('');
            setConfirmPassword('');
        },
        error: (message) => {
            setLoadingUpdate(false);

            toast.error(message || 'Có lỗi trong quá trình xử lý', Toastobjects);
        },
    };
    const submitUpdatePassword = (e) => {
        e.preventDefault();
        if (!checkPassword()) return; // check funtion check pass để kiểm tra xem có các trường bị rổng hay không
        setLoadingUpdate(true);
        dispatch(updateUserPassword({ currentPassword: oldPassword, newPassword: password }, handleAfterFetch));
    };

    return (
        <form className={styles.wrapper} onSubmit={submitUpdatePassword}>
            <div className="col-md-12">
                <TextField
                    size="small"
                    type="password"
                    label="Mật khẩu hiện tại"
                    sx={{ width: '100%' }}
                    variant="outlined"
                    value={oldPassword}
                    onChange={(e) => {
                        objFormPass.oldPassword = ' ';
                        setOldPassword(e.target.value);
                    }}
                />
                <p className="noti-validate">{objFormPass.oldPassword}</p>
            </div>

            <div className="col-md-12">
                <TextField
                    size="small"
                    type="password"
                    label="Mật khẩu mới"
                    sx={{ width: '100%' }}
                    variant="outlined"
                    value={password}
                    onChange={(e) => {
                        objFormPass.password = ' ';
                        setPassword(e.target.value);
                    }}
                />
                <p className="noti-validate">{objFormPass.password}</p>
            </div>

            <div className="col-md-12">
                <TextField
                    size="small"
                    type="password"
                    label="Nhập lại mật khẩu mới"
                    sx={{ width: '100%' }}
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => {
                        objFormPass.confirmPassword = ' ';
                        setConfirmPassword(e.target.value);
                    }}
                />
                <p className="noti-validate">{objFormPass.confirmPassword}</p>
            </div>

            <div className=" btn-update-profile">
                <LoadingButton
                    loading={loadingUpdate}
                    sx={{ width: '100%', mt: 2 }}
                    type="submit"
                    variant={inputPropsConstants.variantContained}
                    size="medium"
                    startIcon={<AutorenewOutlinedIcon />}
                >
                    Cập nhật thông tin
                </LoadingButton>
            </div>
        </form>
    );
};
