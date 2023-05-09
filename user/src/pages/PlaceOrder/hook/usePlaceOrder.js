import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listCart, listOrderCart } from '~/Redux/Actions/cartActions';
import { getShippingFee } from '~/Redux/Actions/deliveryAction';
import { createOrder } from '~/Redux/Actions/orderActions';
import { getShippingAddresses } from '~/Redux/Actions/userActions';
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
    const [isOpenModalVoucher, setIsOpenModalVoucher] = useState(false);
    const [address, setAddress] = useState();
    const [isOpenModalAddress, setIsOpenModalAddress] = useState(false);
    const [voucher, setVoucher] = useState();
    const shippingReducer = useSelector((state) => state.shippingFee);
    const { shippingFee, loading: loadingShippingFee } = shippingReducer;
    const cartOrder = useSelector((state) => state.cartOrder);
    const { cartOrderItems } = cartOrder;

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
    cartOrder.total = voucher
        ? Math.max(
              voucher?.discountType === 'money'
                  ? cartOrder.totalBeforeApplyVoucher - voucher?.discount
                  : cartOrder.totalBeforeApplyVoucher - (cartOrder.totalBeforeApplyVoucher * voucher?.discount) / 100,
              0,
          )
        : cartOrder.totalBeforeApplyVoucher;

    const [loading, setLoading] = useState(false);

    const handleAfterFetch = {
        success: (order) => {
            dispatch(listCart());
            dispatch(listOrderCart());
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        },
        error: () => {},
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
    const handleApplyVoucher = (voucher) => {
        setVoucher(voucher);
    };

    const placeOrderHandler = () => {
        setLoading(true);
        dispatch(
            createOrder(
                {
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
                },
                handleAfterFetch,
            ),
        );
    };
    const handleAfterFetchAddress = {
        success: (address) => {
            dispatch(
                getShippingFee({
                    from_district_id: 1454,
                    service_id: 53320,
                    service_type_id: null,
                    to_district_id: address.district.id,
                    to_ward_code: address.ward.id.toString(),
                    height: 50,
                    length: 20,
                    weight: 20,
                    width: 20,
                    insurance_value: null,
                    coupon: null,
                }),
            );
        },
    };

    useEffect(() => {
        dispatch(getShippingAddresses(handleAfterFetchAddress));
    }, []);

    return {
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
