import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCart, listOrderCart } from '~/Redux/Actions/cartActions';
import { createOrder } from '~/Redux/Actions/orderActions';
import { ORDER_CREATE_RESET } from '~/Redux/Constants/OrderConstants';

export default function usePlaceOrder(history) {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const cartOrder = useSelector((state) => state.cartOrder);
    const { cartOrderItems } = cartOrder;
    const currentCartItems = cartOrderItems.map((product) => ({
        variant: product.variant._id,
        quantity: product.quantity,
    }));
    const createContent = useCallback(() => {
        return { title: 'Place order this product?', body: 'Are you sure?' };
    });
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Calculate Price
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    cartOrder.itemsPrice = addDecimals(
        cartOrder.cartOrderItems?.reduce((totalPrice, i) => totalPrice + i.quantity * i.variant.price, 0).toFixed(2),
    );
    cartOrder.shippingPrice = addDecimals(cartOrder.itemsPrice > 0 ? (cartOrder.itemsPrice > 100 ? 0 : 20) : 0);
    cartOrder.taxPrice = addDecimals(Number((0.15 * cartOrder.itemsPrice).toFixed(2)));
    cartOrder.totalPrice =
        cartOrder?.cartOrderItems?.length > 0
            ? (Number(cartOrder.itemsPrice) + Number(cartOrder.shippingPrice) + Number(cartOrder.taxPrice)).toFixed(2)
            : 0;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order } = orderCreate;
    const [loading, setLoading] = useState(false);

    const handleAfterFetch = {
        success: () => {
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
    const placeOrderHandler = () => {
        setLoading(true);
        dispatch(
            createOrder(
                {
                    orderItems: currentCartItems,
                    shippingAddress: {
                        receiver: userInfo.name,
                        email: userInfo.email,
                        phone: userInfo.phone,
                        province: userInfo.address.province,
                        ward: userInfo.address.ward,
                        district: userInfo.address.district,
                        specificAddress: userInfo.address.specificAddress,
                    },

                    paymentMethod: 'payment-with-momo',
                    taxPrice: cartOrder.taxPrice,
                    shippingPrice: cartOrder.shippingPrice,
                    totalPrice: cartOrder.totalPrice,
                },
                handleAfterFetch,
            ),
        );
    };

    return {
        userInfo,
        cartOrder,
        createContent,
        placeOrderHandler,
        loading,
    };
}
