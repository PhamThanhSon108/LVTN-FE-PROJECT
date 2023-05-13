import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormLoading } from './../LoadingError/Loading';
import { updateUserProfile } from '../../Redux/Actions/userActions';
import isEmpty from 'validator/lib/isEmpty';
import { Autocomplete, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import './Profile.scss';
import moment from 'moment';
import { getProvinces } from '~/Redux/Actions/deliveryAction';

const ProfileTab = ({ checkSetPassword, checkProfile, checkbox }) => {
    return (
        <div className="radio-check">
            <form className="radio-from">
                <div className="radio-from__flex">
                    <label for="profile" className={Number(checkbox) === 0 ? 'form-update-profile-tab-focus' : ''}>
                        Update Profile
                    </label>
                    <input
                        id="profile"
                        style={{ display: 'none' }}
                        name="checkProfilePass"
                        type="radio"
                        onClick={checkProfile}
                    ></input>
                </div>
                <div className="radio-from__flex">
                    <label for="pass" className={Number(checkbox) === 1 ? 'form-update-profile-tab-focus' : ''}>
                        Set Password
                    </label>
                    <input
                        id="pass"
                        style={{ display: 'none' }}
                        name="checkProfilePass"
                        type="radio"
                        onClick={checkSetPassword}
                    ></input>
                </div>
            </form>
        </div>
    );
};
const ProfileTabs = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specificAddress, setSpecificAddress] = useState('');
    const [gender, setGender] = useState('male');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uploadProfile, setUploadProfile] = useState(true); //ghi chú
    const [uploadPassword, setUploadPassword] = useState(false); //ghi chú
    const [checkbox, setCheckbox] = useState('0');
    const [birthday, setBirthDay] = useState('2023-04-05');
    const refProfile = useRef(); /// ghi chú
    const refSetPassword = useRef(); /// ghi chú

    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();

    const [tempAddress, setTemAddress] = useState({
        provinces: [],
        wards: [],
        districts: [],
    });

    const changeDistrict = ({ district }) => {};
    const changeProvince = ({ province }) => {};

    const defaultAddress = ({ district, province, ward }) => {};
    const {
        address: { provinces },
    } = useSelector((state) => state.address);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: updateLoading } = userUpdateProfile;

    function checkProfile() {
        let x = Number(checkbox);
        if (x === 0) {
            setUploadProfile(true);
            setUploadPassword(false);
            setCheckbox('0');
        } else {
            setUploadProfile(true);
            setUploadPassword(false);
            setCheckbox('0');
        }
    }
    function checkSetPassword() {
        let y = Number(checkbox);
        if (y === 0) {
            setUploadProfile(false);
            setUploadPassword(true);
            setCheckbox('1');
        } else {
            setUploadProfile(false);
            setUploadPassword(true);
            setCheckbox('1');
        }
    }
    // xư lý profile validate
    const [objProfile, setObjProfile] = useState({});
    function checkObjProfile() {
        const profileObj = {};
        if (isEmpty(specificAddress)) {
            profileObj.specificAddress = 'Please input your specific address';
        }
        if (isEmpty(province)) {
            profileObj.province = 'Please input your province';
        }
        if (isEmpty(ward)) {
            profileObj.ward = 'Please input your ward';
        }
        if (isEmpty(district)) {
            profileObj.district = 'Please input your district';
        }
        if (isEmpty(name)) {
            profileObj.name = 'Please input your phone';
        }
        if (isEmpty(phone)) {
            profileObj.phone = 'Please input your phone';
        } else {
            if (isNaN(phone)) {
                profileObj.phone = 'Incorrect phone number';
            }
        }

        setObjProfile(profileObj);
        if (Object.keys(profileObj).length > 0) return false;
        return true;
    }
    // xử lý login validate profile upload
    const [objFormPass, setObjFromPass] = useState({});

    const handleAfterFetch = {
        success: () => {},
        error: () => {},
        finally: () => {},
    };
    function checkPassword() {
        const passObj = {};
        if (isEmpty(oldPassword)) {
            passObj.oldPassword = 'Please input your Password';
        }
        if (isEmpty(password)) {
            passObj.password = 'Please input your Password';
        } else {
            if (password.length < 6) {
                passObj.password = 'Password must be at least 6 characters';
            }
        }
        if (isEmpty(confirmPassword)) {
            passObj.confirmPassword = 'Please input your ConfirmPassword';
        } else {
            if (confirmPassword.length < 6) {
                passObj.confirmPassword = 'Password must be at least 6 characters';
            } else {
                if (password !== confirmPassword) {
                    passObj.confirmPassword = 'The password entered is incorrect';
                }
            }
        }
        setObjFromPass(passObj);
        if (Object.keys(passObj).length > 0) return false;
        return true;
    }

    useEffect(() => {
        if (user) {
            defaultAddress({
                province: user?.address?.province,
                district: user?.address?.district,
                ward: user?.address?.ward,
            });
            if (user.name) setName(user.name);
            if (user.email) setEmail(user.email);
            if (user.phone) setPhone(user.phone);
            if (user.gender) setGender(user.gender);
            if (user?.address?.specificAddress) setSpecificAddress(user?.address?.specificAddress || '');
            if (user?.birthday) setBirthDay(moment(user.birthday).format('DD/MM/YYYY'));
        }
        dispatch(getProvinces());
    }, [dispatch, user]);

    const submitUpdateProfile = (e) => {
        e.preventDefault();
        if (!checkObjProfile()) return;
        dispatch(
            updateUserProfile({
                id: user._id,
                name,
                email,
                phone,
                address: { province, district, ward, specificAddress },
                gender,
                birthday,
            }),
        );
    };

    const handleSuccessUpdatePassword = () => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Fragment>
            {/* <Toast /> */}
            <div className="row form-container" style={{ position: 'relative' }}>
                {loading && <FormLoading />}
                {updateLoading && <FormLoading />}
                <ProfileTab checkProfile={checkProfile} checkSetPassword={checkSetPassword} checkbox={checkbox} />

                <div
                    ref={refProfile}
                    className={`col-lg-12 col-md-12 col-sm-12 ${uploadProfile ? 'form-update-profile-focus' : ''}`}
                    style={{ display: uploadProfile ? 'block' : 'none', position: 'relative' }}
                >
                    <form
                        className="row form-container form-update-profile"
                        onSubmit={submitUpdateProfile}
                        style={{ position: 'relative' }}
                    >
                        <div className="col-md-12">
                            <TextField
                                size="small"
                                onChange={(e) => setName(e.target.value)}
                                id="outlined-basic"
                                label="Username"
                                sx={{ width: '100%' }}
                                variant="outlined"
                                value={name}
                            />
                            <p className="noti-validate">{objProfile.name}</p>
                        </div>

                        <div className="col-md-12 d-flex form-update-profile-item">
                            <div className="wrap-input-inline col-2-item">
                                <TextField
                                    size="small"
                                    disabled
                                    id="outlined-basic"
                                    label="Email"
                                    sx={{ width: '100%' }}
                                    variant="outlined"
                                    value={email}
                                />
                                <p className="noti-validate"></p>
                            </div>
                            <div className="wrap-input-inline col-2-item">
                                <TextField
                                    size="small"
                                    type={'text'}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id="outlined-basic"
                                    label="Phone"
                                    sx={{ width: '100%' }}
                                    variant="outlined"
                                    value={phone}
                                />
                                <p className="noti-validate">{objProfile.phone}</p>
                            </div>
                        </div>

                        <div className="col-md-12 d-flex form-update-profile-item">
                            <div className="wrap-input-inline col-2-item">
                                <FormControl className="d-flex align-content-center">
                                    <div className="form-update-profile-item-label">
                                        <label>Giới tính</label>
                                    </div>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <FormControlLabel value="male" control={<Radio size="small" />} label="Nam" />
                                        <FormControlLabel value="female" control={<Radio size="small" />} label="Nữ" />
                                    </RadioGroup>
                                </FormControl>
                                <p className="noti-validate"></p>
                            </div>

                            <div className="wrap-input-inline col-2-item">
                                <FormControl className="d-flex align-content-center">
                                    <div className="form-update-profile-item-label">
                                        <label>Giới tính</label>
                                    </div>
                                    <input
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => {
                                            setBirthDay(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <p className="noti-validate"></p>
                            </div>
                        </div>

                        <div
                            className="col-md-12 d-flex justify-content-lg-between form-update-profile-item"
                            style={{ width: '100%' }}
                        >
                            <div className="wrap-input-inline col-3-item">
                                <Autocomplete
                                    size="small"
                                    sx={{ width: '100%' }}
                                    value={
                                        tempAddress?.provinces?.find((item) => item.name === province) || { name: '' }
                                    }
                                    fullWidth={true}
                                    options={provinces}
                                    getOptionLabel={(option) => option.ProvinceName}
                                    onChange={(e, value) => {
                                        changeProvince({ province: value.name });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            {...params}
                                            label="Tỉnh/Thành phố"
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                        />
                                    )}
                                />
                                <p className="noti-validate">{objProfile.province}</p>
                            </div>

                            <div className="wrap-input-inline col-3-item">
                                <Autocomplete
                                    size="small"
                                    sx={{ width: '100%' }}
                                    value={
                                        tempAddress?.districts?.find((item) => item.name === district) || { name: '' }
                                    }
                                    fullWidth={true}
                                    disabled={!province}
                                    options={tempAddress.districts}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, value) => {
                                        changeDistrict({ district: value.name });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            {...params}
                                            label="Quận/ Huyện"
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                        />
                                    )}
                                />
                                <p className="noti-validate">{objProfile.district}</p>
                            </div>
                            <div className="wrap-input-inline col-3-item">
                                <Autocomplete
                                    size="small"
                                    sx={{ width: '100%' }}
                                    value={tempAddress?.wards?.find((item) => item.name === ward) || { name: '' }}
                                    fullWidth={true}
                                    options={tempAddress.wards}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, value) => {
                                        setWard(value.name);
                                    }}
                                    disabled={!district}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            {...params}
                                            label="Phường/ Xã"
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                        />
                                    )}
                                />
                                <p className="noti-validate">{objProfile.ward}</p>
                            </div>
                        </div>
                        <div className="col-md-12 d-flex form-update-profile-item">
                            <div className="wrap-input-inline col-1-item">
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label="Địa chỉ chi tiết"
                                    sx={{ width: '100%' }}
                                    variant="outlined"
                                    value={specificAddress}
                                    onChange={(e) => {
                                        setSpecificAddress(e.target.value);
                                    }}
                                />
                                <p className="noti-validate">{objProfile.specificAddress}</p>
                            </div>
                        </div>

                        <div className=" btn-update-profile">
                            <Button variant="contained" className="btn btn-primary" type="submit">
                                Update Profile
                            </Button>
                        </div>
                    </form>
                </div>

                {/*Update password*/}
            </div>
        </Fragment>
    );
};

export default ProfileTabs;
