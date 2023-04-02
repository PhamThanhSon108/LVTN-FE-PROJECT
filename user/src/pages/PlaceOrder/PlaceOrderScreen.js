import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Message from '../../components/LoadingError/Error';
import WrapConfirmModal from '~/components/Modal/WrapConfirmModal';
import Toast from '~/components/LoadingError/Toast';
import { LoadingButton } from '@mui/lab';
import usePlaceOrder from './hook/usePlaceOrder';
import { Fragment } from 'react';

export const RenderAttributes = ({ attributes }) => {
    if (attributes && attributes.length > 0) {
        return attributes?.map((attribute) => (
            <div
                key={attribute.value}
                className="mt-3 mt-md-0 col-md-1 col-1  d-flex align-items-center flex-column justify-content-center"
                style={{ width: 90, display: 'flex', flexDirection: 'column' }}
            >
                <h6>{attribute.name}</h6>
                <span>{attribute?.value}</span>
            </div>
        ));
    } else return <Fragment />;
};

const PlaceOrderScreen = ({ history }) => {
    const { userInfo, cartOrder, createContent, placeOrderHandler, loading } = usePlaceOrder(history);
    return (
        <>
            <Toast />
            <Header />
            <div className="container">
                <div className="row  order-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div className="row " style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom">
                                <div className="alert-success order-box fix-none">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-9 mb-lg-9 fix-display">
                                <p>{`Tên: ${userInfo.name}`}</p>
                                <p>{`Số điện thoại: ${userInfo.phone}`}</p>
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div
                            className="row"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
                        >
                            <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom">
                                <div className="alert-success order-box fix-none">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-9 mb-lg-9">
                                <p>
                                    Địa chỉ:{' '}
                                    {` ${userInfo?.address?.specificAddress}, ${userInfo?.address?.ward}, ${userInfo?.address?.district},  ${userInfo?.address?.province}`}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom">
                                <div className="alert-success order-box fix-none">
                                    <i class="fab fa-pa"></i>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-9 mb-lg-9">
                                <p>
                                    <p>Phương thức: {'Thanh toán khi nhận hàng'}</p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-12 fix-padding cart-scroll">
                        {cartOrder.cartOrderItems?.length === 0 ? (
                            <Message variant="alert-info mt-5">No product is selected</Message>
                        ) : (
                            <>
                                {cartOrder.cartOrderItems?.map((item) => (
                                    <div className="order-product row" key={item.id}>
                                        <div className="col-md-3 col-3" style={{ width: '20%' }}>
                                            <img
                                                className="col-md-3 col-3"
                                                src={item.variant.product.images?.[0]}
                                                alt={item.variant.product.name}
                                            />
                                        </div>
                                        <div className="col-md-5 col-5 d-flex align-items-center">
                                            <Link to={`/product/${item.variant.product._id}`}>
                                                <h6>{item.variant.product.name}</h6>
                                            </Link>
                                        </div>
                                        <RenderAttributes attributes={item?.attributes} />

                                        <div className="mt-3 mt-md-0 col-md-1 col-1  d-flex align-items-center flex-column justify-content-center ">
                                            <h4>QUANTITY</h4>
                                            <h6>{item?.quantity}</h6>
                                        </div>
                                        <div className="mt-3 mt-md-0 col-md-1 col-1 align-items-end  d-flex flex-column justify-content-center ">
                                            <h4>SUBTOTAL</h4>
                                            <h6>${item?.quantity * item?.variant?.price}</h6>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="row d-flex" style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px' }}>
                    {/* total */}
                    <div className="col-9 d-flex align-items-end flex-column subtotal-order">
                        <table className="table table-bordered fix-bottom">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Products</strong>
                                    </td>
                                    <td>${cartOrder.itemsPrice}</td>
                                    <td>
                                        <strong>Tax</strong>
                                    </td>
                                    <td>${cartOrder.taxPrice}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Shipping</strong>
                                    </td>
                                    <td>${cartOrder.shippingPrice}</td>

                                    <td>
                                        <strong>Total</strong>
                                    </td>
                                    <td>${cartOrder.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-3 d-flex justify-content-center align-content-center flex-column ">
                        <div style={{ fontWeight: '600', height: '50%', textAlign: 'center', lineHeight: '2.5rem' }}>
                            Total: ${cartOrder.totalPrice}
                        </div>
                        {cartOrder.cartOrderItems?.length === 0 ? null : (
                            <WrapConfirmModal content={createContent()} handleSubmit={placeOrderHandler}>
                                <LoadingButton
                                    type="submit"
                                    class="btn btn-primary pay-button col-12"
                                    variant="outlined"
                                    loading={loading}
                                    loadingPosition="start"
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    PLACE ORDER
                                </LoadingButton>
                            </WrapConfirmModal>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderScreen;
