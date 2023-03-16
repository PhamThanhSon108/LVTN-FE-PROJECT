import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import { addProductOrderInCart, addToCart, listCart } from '~/Redux/Actions/cartActions';
import { createProductReview, listProductDetails } from '~/Redux/Actions/ProductActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '~/Redux/Constants/ProductConstants';

export default function useSingleProduct({ history, match }) {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState('');

    const productId = match.params.id;
    const dispatch = useDispatch();
    const deBounce = useDebounce(qty, 500);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productReviewCreate = useSelector((state) => state.productReviewCreate);

    const [loadingAddtoCart, setLoadingAddtoCart] = useState(false);
    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
    } = productReviewCreate;

    const cartUpdate = useSelector((state) => state.cartUpdate);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = cartUpdate;

    const cartAdd = useSelector((state) => state.cartCreate);
    const { success: successAdd, error: errorAdd } = cartAdd;
    const defaultValue1 =
        product?.variants?.reduce((values, value) => {
            if (!values.includes(value.attributes[0].value)) values.push(value.attributes[0].value);
            return values;
        }, []) || [];

    const defaultValue2 =
        product?.variants?.reduce((values, value) => {
            if (!values.includes(value.attributes[1].value)) values.push(value.attributes[1].value);
            return values;
        }, []) || [];

    useEffect(() => {
        dispatch(listCart());
    }, [successAdd]);

    useEffect(() => {
        if (!qty) setQty(null);
        if (qty > quantity) setQty(quantity);
        else if (qty <= 0) setQty(1);
    }, [deBounce]);

    const quantity = product?.variants?.find(
        (value) => value.attributes?.[0].value === value1 && value.attributes?.[1].value === value2,
    )?.quantity;
    useEffect(() => {
        if (successCreateReview) {
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(productId));
    }, [dispatch, productId, successCreateReview]);

    const AddToCartHandle = (e) => {
        e.preventDefault();

        const variantId = product?.variants?.find((value) => value.attributes?.[0].value === value1)._id;

        if (userInfo && variantId) {
            setLoadingAddtoCart(true);
            dispatch(addToCart(variantId, qty, history, setLoadingAddtoCart));
        } else history.push('/login');
    };

    const BuyProductHandle = (e) => {
        e.preventDefault();
        const variantOrder = product?.variants?.find(
            (value) => value.attributes?.[0].value === value1 && value.attributes?.[1].value === value2,
        );
        if (userInfo && variantOrder) {
            dispatch(
                addProductOrderInCart([
                    {
                        quantity: qty,
                        variant: {
                            ...variantOrder,
                            product: { ...product, variants: product?.variants?.map((value) => value._id) },
                        },
                    },
                ]),
            );
            history.push('/login?redirect=shipping');
        } else history.push('/login');
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview({
                productId,
                review: {
                    rating,
                    comment,
                },
            }),
        );
    };

    return {
        submitHandler,
        BuyProductHandle,
        AddToCartHandle,
        defaultValue1,
        defaultValue2,
        error,
        product,
        qty,
        setQty,
        rating,
        setComment,
        loadingCreateReview,
        userInfo,
        loading,
        setValue1,
        setValue2,
        quantity,
        value1,
        value2,
        loadingAddtoCart,
        setRating,
        comment,
    };
}
