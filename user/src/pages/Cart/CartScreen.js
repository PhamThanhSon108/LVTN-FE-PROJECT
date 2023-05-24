import React, { useEffect, useState, useRef, useCallback, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductOrderInCart, listCart, removefromcart, updateCart } from '../../Redux/Actions/cartActions';

import WrapConfirmModal from '~/components/Modal/WrapConfirmModal';
import { FormLoading } from '~/components/LoadingError/Loading';
import SlideDialogConfirm from '~/modal/confirm/SlideDialogConfirm';
import { formatMoney } from '~/utils/formatMoney';
import { Typography } from '@mui/material';

export const RenderAttributes = ({ attributes }) => {
    if (attributes && attributes.length > 0) {
        return (
            <Typography component="div" variant="body2" color="text.primary">
                {attributes?.map(
                    (attribute, index) => `${attribute?.value}${index === attributes.length - 1 ? '' : ','} `,
                )}
            </Typography>
        );
    } else return <Fragment />;
};

const CartScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector((state) => state.cart);
    const { cartItems, loading: loadListCart } = cart;
    const [cartChoise, setCartChoise] = useState({});

    const [loadingIndices, setLoadingIndices] = useState(null);
    const cartDel = useSelector((state) => state.cartDelete);
    const { success: suc } = cartDel;
    const cartCreate = useSelector((state) => state.cartCreate);
    const { success: successCreate } = cartCreate;

    const cartUpdate = useSelector((state) => state.cartUpdate);
    const { success: successUpdate } = cartUpdate;
    const refItem = useRef();

    const total = cartChoise
        ? Object.values(cartChoise).reduce((a, i) => a + i.quantity * i.variant?.priceSale || i.variant?.price, 0)
        : 0;
    const handleAfterFetch = {
        success: () => {
            history.push('/placeorder');
        },
    };
    const checkOutHandler = () => {
        dispatch(addProductOrderInCart(Object.values(cartChoise), handleAfterFetch));
    };

    const removeFromCartHandle = (id, setCartChoise) => {
        dispatch(removefromcart({ id, setCartChoise, deleteCartOnly: true }));
    };
    const handleDeleteAll = useCallback(() => {
        dispatch(removefromcart({ id: Object.keys(cartChoise), setCartChoise, deleteCartAll: true }));
    }, [cartChoise]);

    const createContent = useCallback(() => {
        return { title: 'Xóa sản phẩm khỏi giỏ hàng', body: 'Bạn có chắc?' };
    });
    useEffect(() => {
        dispatch(listCart());
        if (successUpdate)
            setTimeout(() => {
                if (successUpdate && loadingIndices !== null) {
                    setLoadingIndices(null);
                }
            }, 320);
    }, [suc, successCreate, successUpdate]);

    const [isMobile] = useState(window.innerWidth < 540);
    return (
        <>
            <div className="container ">
                {loadListCart && <FormLoading />}
                {cartItems?.length === 0 || !cartItems ? (
                    <div className=" alert alert-info text-center mt-3 position-relative ">
                        <div className="mb-1" style={{ display: 'flex', flexDirection: 'column' }}>
                            <img
                                className="mb-1"
                                alt="Không tìm thấy sản phẩm nào"
                                style={{ width: '100px', height: '100px', margin: '0 auto' }}
                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
                            ></img>
                            Giỏ hàng của bạn chưa có sản phẩm nào
                        </div>
                        <Link
                            className="btn btn-success mx-5 px-5 py-3"
                            to="/"
                            style={{
                                fontSize: '12px',
                            }}
                        >
                            Mua hàng ngay
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="backTo" style={{ paddingTop: '10px' }}>
                            <Link to="/" className="col-md-6 ">
                                <i class="fas fa-undo" style={{ paddingRight: '5px' }}></i>
                                Trở lại trang chủ
                            </Link>
                        </div>
                        <div className=" alert alert-info text-center mt-3">
                            Tổng số sản phẩm
                            <Link className="text-success mx-2" to="/cart">
                                ({cartItems?.length ?? 0})
                            </Link>
                        </div>
                        {/* cartiterm */}

                        <div className="cart-scroll">
                            {cartItems?.map((item, index) => {
                                const notEnough =
                                    item.quantity <= item.variant.quantity ? (
                                        <input
                                            id={item?.id}
                                            style={{ height: '100%' }}
                                            type="checkbox"
                                            checked={cartChoise[item?.variant?._id] != undefined}
                                            onChange={(e) => {
                                                setCartChoise((pre) => {
                                                    if (pre[item?.variant?._id] === undefined)
                                                        pre[item?.variant?._id] = item;
                                                    else delete pre[item?.variant?._id];
                                                    return { ...pre };
                                                });
                                                refItem.current.focus();
                                            }}
                                        ></input>
                                    ) : (
                                        <span className="text-danger col-12">
                                            {`Không có sẵn
                                                        ${item?.quantity} sản phẩm`}
                                        </span>
                                    );

                                const notHaveProduct =
                                    item.variant.quantity > 0 ? (
                                        notEnough
                                    ) : (
                                        <span className="text-danger col-12">Hết hàng</span>
                                    );
                                const isVisible = item.variant?.deleted || item.variant?.disabled;
                                return (
                                    <div
                                        key={item?.id}
                                        className="cart-iterm row d-flex"
                                        ref={refItem}
                                        style={{
                                            height: '100%',
                                            opacity: isVisible ? '0.5' : 1,
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        {item?.quantity > 0 ? (
                                            <div
                                                className="col-1 cart-check d-flex
                                        "
                                                style={{
                                                    height: '100%',

                                                    alignItems: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <label
                                                    for={item?.id}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        cursor: isVisible ? 'default' : 'pointer',
                                                    }}
                                                >
                                                    {isVisible ? (
                                                        <Typography className="text-danger">
                                                            Sản phẩm đã ngừng bán
                                                        </Typography>
                                                    ) : (
                                                        notHaveProduct
                                                    )}
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="col-1 cart-check">
                                                <Typography className="text-danger">Hết hàng</Typography>
                                            </div>
                                        )}
                                        <div
                                            className="cart-image col-md-3 col-sm-5 col-lg-2 col-2"
                                            style={isMobile ? { width: 300 } : null}
                                        >
                                            <img src={item?.variant?.product?.images[0]} alt={item.product?.name} />
                                        </div>
                                        <div
                                            className="cart-text col-4 col-md-8 col-sm-7 col-lg-4 d-flex align-items-center"
                                            style={isMobile ? { width: '100%', marginBottom: 15 } : null}
                                        >
                                            <Link to={`/product/${item?.variant?.product?._id}`}>
                                                <Typography
                                                    component="div"
                                                    variant="body1"
                                                    fontWeight={600}
                                                    color="text.primary"
                                                >
                                                    {item?.variant?.product?.name}
                                                </Typography>
                                            </Link>
                                        </div>
                                        <div
                                            className="cart-text col-sm-3 col-lg-2 col-5 col-md-3 col-xl-2 d-flex align-items-start flex-column"
                                            style={isMobile ? { width: '100%', marginBottom: 15 } : null}
                                        >
                                            <Typography component="div" variant="body2" color="text.primary">
                                                Phân loại hàng:
                                            </Typography>
                                            <RenderAttributes attributes={item?.attributes} />
                                        </div>

                                        <div
                                            className="cart-qty col-sm-3 col-lg-1 col-5 col-md-3 col-xl-1 flex-column justify-content-center align-content-center d-flex quantity-css"
                                            style={{ position: 'relative', width: '90' }}
                                        >
                                            <select
                                                className="form-select select-quantity col-12"
                                                disabled={
                                                    item?.variant?.quantity <= 0 ||
                                                    // loadingCreate === true ||
                                                    loadingIndices === index ||
                                                    isVisible
                                                }
                                                value={item?.quantity <= item?.variant?.quantity ? item.quantity : ''}
                                                // defaultValue=""
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setLoadingIndices(index);
                                                    dispatch(
                                                        updateCart({
                                                            variantId: item?.variant?._id,
                                                            qty: e.target.value,
                                                            setCartChoise,
                                                            setLoadingIndices,
                                                            updateCart: true,
                                                        }),
                                                    );
                                                }}
                                            >
                                                {[...Array(item?.variant?.quantity).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div
                                            className="cart-price col-12 col-sm-3 col-lg-1 align-items-sm-end align-items-start  d-flex flex-column justify-content-center quantity-css"
                                            style={isMobile ? { width: 90, marginRight: '20%' } : null}
                                        >
                                            <Typography component="div" variant="body2" color="red">
                                                {formatMoney(item?.variant?.priceSale || item?.variant?.price)}
                                            </Typography>
                                        </div>

                                        <div
                                            className=" col-3 delete-cart col-sm-3 col-lg-1"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'right',
                                                cursor: 'pointer',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <SlideDialogConfirm
                                                handleConfirm={{
                                                    handleSubmit: removeFromCartHandle,
                                                    key: item.variant._id,
                                                    setCartChoise: setCartChoise,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* End of cart iterms */}
                        <hr />
                        <div className="cart-buttons d-flex align-items-center row">
                            <div className="total col-md-4 d-flex align-items-center">
                                <Typography
                                    sx={{ display: 'inline', mr: 1 }}
                                    component="span"
                                    variant="body1"
                                >{`Tổng tiền (${Object.keys(cartChoise).length || 0} sản phẩm):  `}</Typography>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    color="error"
                                    component="span"
                                    variant="h6"
                                >{` ${formatMoney(total || 0)} `}</Typography>
                            </div>

                            <div className="total col-md-3">
                                {Object.keys(cartChoise).length > 0 && (
                                    <WrapConfirmModal content={createContent()} handleSubmit={handleDeleteAll}>
                                        <span>Xóa</span>
                                    </WrapConfirmModal>
                                )}
                            </div>
                            {total > 0 && (
                                <div className="col-md-5 d-flex justify-content-md-end mt-3 mt-md-0">
                                    <button
                                        data-bs-toggle="modal"
                                        // data-bs-target="#staticBackdrop"
                                        onClick={checkOutHandler}
                                    >
                                        Mua ngay
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartScreen;
