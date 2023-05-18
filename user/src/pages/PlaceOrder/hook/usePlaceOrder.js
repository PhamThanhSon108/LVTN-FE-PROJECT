import { useRef } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Toastobjects, listCart, listOrderCart } from '~/Redux/Actions/cartActions';
import { getShippingFee } from '~/Redux/Actions/deliveryAction';
import { createOrder } from '~/Redux/Actions/orderActions';
import { getShippingAddresses } from '~/Redux/Actions/userActions';
import { getPriceIsReducedAfterApplyVoucher } from '~/Redux/Actions/voucherAction';

import { ORDER_CREATE_RESET } from '~/Redux/Constants/OrderConstants';
const compareAddress = (address1, address2) => {
    if (address1?._id !== address2?._id) return false;
    if (address1?.province?.id !== address2?.province?.id) return false;
    if (address1?.district?.id !== address2?.district?.id) return false;
    if (address1?.ward?.id !== address2?.ward?.id) return false;
    return true;
};
export const PAY_WITH_MOMO = 2;
export const PAY_WITH_CASH = 1;
export default function usePlaceOrder() {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const history = useHistory();
    const [paymentMethod, setPaymentMethod] = useState(PAY_WITH_MOMO);
    const [priceIsReduced, setPriceIsReduced] = useState({ totalDiscount: 0 });
    const [isOpenModalVoucher, setIsOpenModalVoucher] = useState(false);
    const [address, setAddress] = useState();
    const [isOpenModalAddress, setIsOpenModalAddress] = useState(false);
    const [voucher, setVoucher] = useState();
    const shippingReducer = useSelector((state) => state.shippingFee);
    const { shippingFee, loading: loadingShippingFee } = shippingReducer;
    const cartOrder = useSelector((state) => state.cartOrder);
    const { cartOrderItems } = cartOrder;
    const [loadingApplyVoucher, setLoadingApplyVoucher] = useState(false);
    const noteRef = useRef();
    const currentCartItems = cartOrderItems.map((product) => ({
        variant: product.variant._id,
        quantity: product.quantity,
    }));

    const createContent = useCallback(() => {
        return { title: 'Place order this product?', body: 'Are you sure?' };
    });
    const handleOpenModalAddress = (status) => {
        setIsOpenModalAddress(status);
    };

    const handleOpenModalVoucher = (status) => {
        setIsOpenModalVoucher(status);
    };

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const addressReducer = useSelector((state) => state.shippingAddress);
    const { listAddress, loading: loadingGetList } = addressReducer;
    // Calculate Price

    cartOrder.priceOfProducts = cartOrder.cartOrderItems?.reduce(
        (totalPrice, i) => totalPrice + i.quantity * (i.variant.priceSale || i.variant.price),
        0,
    );

    cartOrder.shippingFee = shippingFee?.fee?.total || 20000;

    cartOrder.totalBeforeApplyVoucher = cartOrder.priceOfProducts + cartOrder.shippingFee;
    cartOrder.total = cartOrder.totalBeforeApplyVoucher - priceIsReduced.totalDiscount;

    const [loading, setLoading] = useState(false);

    const handleAfterFetch = {
        success: (order) => {
            toast.success('Đặt hàng thành công!', Toastobjects);
            dispatch(listCart());
            dispatch(listOrderCart());
            setTimeout(() => {
                history.push(`/order/${order._id}`);
            }, 2000);
            dispatch({ type: ORDER_CREATE_RESET });
        },
        error: (message) => {
            toast.error(message || 'Đặt hàng thất bại!', Toastobjects);
        },
        finally: () => {
            setLoading(false);
        },
    };

    const handleAfterFetchFee = {
        success: (order) => {
            toast.success('Áp dụng mã giảm giá thành công!', Toastobjects);
        },
        error: (message) => {
            toast.error(message || 'Áp dụng mã giảm giá thất bại!', Toastobjects);
        },
        finally: () => {
            setLoading(false);
        },
    };
    const defaultAddress = listAddress.find((address) => address.isDefault);
    const handleChangeAddress = (newAddress) => {
        if (!compareAddress(newAddress, address)) {
            setAddress(newAddress);

            dispatch(
                getShippingFee({
                    to_district_id: newAddress.district.id,
                    to_ward_code: newAddress.ward.id.toString(),
                    weight: 1,
                    insurance_value: null,
                    coupon: null,
                }),
            );
        }
    };
    const afterFetchPriceIsReduced = {
        success: (data, voucher) => {
            setVoucher(voucher);
            setPriceIsReduced(data);
            setLoadingApplyVoucher(false);
            toast.success('Áp dụng thành công', Toastobjects);
        },
        error: (message) => {
            setVoucher('');
            toast.error(message || 'Có lỗi xảy ra khi áp dụng voucher', Toastobjects);
        },
        finally: () => {
            setLoadingApplyVoucher(false);
        },
    };
    const handleApplyVoucher = (voucher) => {
        if (voucher) {
            setLoadingApplyVoucher(true);
            dispatch(
                getPriceIsReducedAfterApplyVoucher({
                    voucher,
                    orderItems: cartOrder.cartOrderItems.map((variant) => ({
                        variant: variant.variant._id,
                        quantity: variant.quantity,
                    })),
                    afterFetchPriceIsReduced,
                }),
            );
        } else {
            setPriceIsReduced({ totalDiscount: 0 });
            setVoucher('');
        }
    };

    const placeOrderHandler = () => {
        setLoading(true);
        dispatch(
            createOrder(
                {
                    note: noteRef.current,
                    shippingAddress: {
                        to_name: defaultAddress.name,
                        to_phone: defaultAddress.phone,
                        to_province_id: defaultAddress.province.id,
                        to_district_id: defaultAddress.district.id,
                        to_ward_code: defaultAddress.ward.id,
                        to_address: defaultAddress.specificAddress,
                    },
                    orderItems: cartOrder.cartOrderItems.map((variant) => ({
                        variant: variant.variant._id,
                        quantity: variant.quantity,
                    })),
                    paymentMethod: Number(paymentMethod),
                    discountCode: priceIsReduced?.discountCode,
                },
                handleAfterFetch,
            ),
        );
    };
    const weightOfProduct = cartOrder.cartOrderItems.reduce(
        (weight, product) => weight + product.variant.product.weight * product.quantity,
        0,
    );
    const handleAfterFetchAddress = {
        success: (address) => {
            setAddress(address);
            dispatch(
                getShippingFee({
                    to_district_id: address.district.id,
                    to_ward_code: address.ward.id.toString(),
                    height: 5,
                    length: 5,
                    weight: weightOfProduct,
                    width: 5,
                }),
            );
        },
    };

    const changeNote = (value) => {
        noteRef.current = value;
    };

    useEffect(() => {
        if (cartOrderItems?.length < 1) {
            history.push('/');
        }
        dispatch(getShippingAddresses(handleAfterFetchAddress));
    }, []);
    return {
        changeNote,
        loadingApplyVoucher,
        priceIsReduced,
        paymentMethod,
        setPaymentMethod,
        isOpenModalVoucher,
        voucher,
        handleApplyVoucher,
        handleOpenModalVoucher,
        loadingGetList,
        loadingShippingFee,
        address: address || defaultAddress,
        handleChangeAddress,
        listAddress,
        isOpenModalAddress,
        handleOpenModalAddress,
        shippingFee,
        userInfo,
        cartOrder,
        createContent,
        placeOrderHandler,
        loading,
    };
}
