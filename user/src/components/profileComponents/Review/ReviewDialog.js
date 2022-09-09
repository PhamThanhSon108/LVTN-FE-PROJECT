import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './ReviewDialog.css';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { style } from '@mui/material/node_modules/@mui/system';
import { createProductReview } from '~/Redux/Actions/ProductActions';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '~/components/LoadingError/Toast';
import 'primereact/resources/themes/lara-light-indigo//theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Controller, useForm } from 'react-hook-form';
export const ReviewDialog = ({ order }) => {
    const { control, handleSubmit } = useForm();

    const [displayBasic, setDisplayBasic] = useState(false);
    const dispatch = useDispatch();
    // const [displayBasic2, setDisplayBasic2] = useState(false);
    // const [displayModal, setDisplayModal] = useState(false);
    // const [displayMaximizable, setDisplayMaximizable] = useState(false);
    // const [displayPosition, setDisplayPosition] = useState(false);
    // const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
    } = productReviewCreate;
    const dialogFuncMap = {
        displayBasic: setDisplayBasic,
        // displayBasic2: setDisplayBasic2,
        // displayModal: setDisplayModal,
        // displayMaximizable: setDisplayMaximizable,
        // displayPosition: setDisplayPosition,
        // displayResponsive: setDisplayResponsive,
    };
    console.log(order);
    const submitHandler = (data) => {
        if (order?.variant?.product?._id && data.comment && data.rating)
            dispatch(
                createProductReview({
                    productId: order?.variant?.product?._id,
                    review: {
                        rating: data.rating,
                        comment: data.comment,
                    },
                    onHide,
                }),
            );
    };
    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    };

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };

    const renderFooter = (name) => {
        return (
            <div className="bg-white" style={{ height: '100%' }}>
                <Button label="Cancel" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button
                    label="Public"
                    icon="pi pi-check"
                    type="submit"
                    form="review"
                    // onClick={(e) => {
                    //     console.log('fssdfaloalo');
                    //     if (rating && comment) {
                    //         submitHandler(e, order);
                    //         onHide(name);
                    //     }
                    // }}
                    autoFocus
                    style={{ backgroundColor: '#ee4d2d', color: 'white', border: 'none' }}
                />
            </div>
        );
    };

    return (
        <div className="dialog-demo d-flex justify-content-center">
            <div className="card ">
                <Button
                    label="Review"
                    icon="pi pi-external-link"
                    style={{ backgroundColor: '#ee4d2d', border: 'none', color: 'white', width: '100%' }}
                    onClick={() => onClick('displayBasic')}
                />
                <Dialog
                    header="Review"
                    visible={displayBasic}
                    style={{ width: '25%', backgroundColor: 'white !important' }}
                    footer={renderFooter('displayBasic')}
                    onHide={() => onHide('displayBasic')}
                    contentStyle={{ backgroundColor: 'white' }}
                    headerStyle={{ backgroundColor: '#ee4d2d', color: 'white' }}
                    className="bg-white"
                >
                    {
                        <form
                            id="review"
                            className="col-md-12 col-12
                             d-flex align-items-center justify-content-center flex-column"
                            style={{ backgroundColor: 'white' }}
                            onSubmit={handleSubmit(submitHandler)}
                        >
                            <div style={{ backgroundColor: 'white', marginTop: '15px' }}>
                                <img style={{ height: '50%' }} src={order?.variant?.product?.image} alt={order?.name} />
                            </div>
                            <Link to={`/product/${order?.product}`}>
                                <h6
                                    className="text-bg-danger"
                                    style={{
                                        color: 'black',
                                        marginTop: '15px',
                                        fontSize: '2.0rem',
                                        paddingBottom: '15px',
                                    }}
                                >
                                    {order?.variant?.product?.name}
                                </h6>
                            </Link>
                            <div className="d-flex ">
                                <div className=" d-flex align-items-center flex-column justify-content-center ">
                                    <h6
                                        style={{ color: 'black', paddingRight: '10px' }}
                                    >{`Size: ${order?.variant?.size}`}</h6>
                                </div>
                                <div className="d-flex align-items-center flex-column justify-content-center ">
                                    <h6 style={{ color: 'black' }}>Color: {order?.variant?.color}</h6>
                                </div>
                            </div>
                            <strong>Rating</strong>
                            <Controller
                                rules={{ required: true }}
                                render={({ field: { onChange, ref }, fieldState: { error } }) => (
                                    <Rating
                                        className={error && 'border-red'}
                                        ref={ref}
                                        name="simple-controlled"
                                        onChange={onChange}
                                    />
                                )}
                                name="rating"
                                control={control}
                                defaultValue=""
                            />

                            <div style={{ color: 'black', paddingRight: '10px' }}>Review</div>
                            <Controller
                                rules={{ required: true }}
                                render={({ field: { onChange, ref }, fieldState: { error } }) => (
                                    <textarea
                                        ref={ref}
                                        style={{
                                            width: '100%',
                                            height: '70px',
                                            display: 'block',
                                            backgroundColor: 'white',
                                            color: 'black',
                                        }}
                                        className={error && 'border-red'}
                                        onChange={onChange}
                                    />
                                )}
                                name="comment"
                                control={control}
                                defaultValue=""
                            />
                        </form>
                    }
                </Dialog>
            </div>
        </div>
    );
};
