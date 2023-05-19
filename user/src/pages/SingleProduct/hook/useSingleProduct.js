import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Toastobjects } from '~/components/LoadingError/Toast';
import useDebounce from '~/hooks/useDebounce';
import { addProductOrderInCart, addToCart, listCart } from '~/Redux/Actions/cartActions';
import { createProductReview, listProductDetails, getSimilarProduct } from '~/Redux/Actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '~/Redux/Constants/ProductConstants';
import CART_CONST from '~/Redux/Constants/CartConstants';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
export default function useSingleProduct() {
    const { getParamValue } = useSearchParamsCustom();
    const similarProductRef = useRef();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState('');
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const deBounce = useDebounce(qty, 500);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productReviewCreate = useSelector((state) => state.productReviewCreate);

    const similarProduct = useSelector((state) => state.similarProduct);
    const { products: similarProducts } = similarProduct;

    const [loadingAddtoCart, setLoadingAddtoCart] = useState(false);
    const { loading: loadingCreateReview, success: successCreateReview } = productReviewCreate;
    const haveQuantityOfCurrentVariant = product?.variants?.find(
        (value) => value.attributes?.[0].value === value1 && value.attributes?.[1].value === value2,
    )?.quantity;
    const currentVariant = product?.variants?.find(
        (value) => value.attributes?.[0].value === value1 && value.attributes?.[1].value === value2,
    );
    const percentDiscount = (
        currentVariant
            ? ((currentVariant?.price - currentVariant?.priceSale) * 100) / currentVariant?.price
            : ((product?.price - product?.priceSale) * 100) / product?.price
    ).toFixed();

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
    const quantity = product?.variants?.find(
        (value) => value.attributes?.[0].value === value1 && value.attributes?.[1].value === value2,
    )?.quantity;

    const handleOnFinallAddProductToCart = () => {
        setLoadingAddtoCart(false);
    };

    const handleOnSuccessAddProductToCart = async () => {
        dispatch(listCart());
        toast.success('Sản phẩm đã được thêm vào giỏ hàng', Toastobjects);
    };

    const handleOnErrorAddProductToCart = ({ message }) => {
        dispatch({
            type: CART_CONST?.CART_CREATE_FAIL,
            payload: message,
        });
        toast.error(message, { ...Toastobjects, autoClose: 3000 });
    };
    const AddToCartHandle = (e) => {
        e.preventDefault();
        const variantId = product?.variants?.find((value) => value.attributes?.[0].value === value1)._id;
        if (userInfo && variantId) {
            setLoadingAddtoCart(true);
            dispatch(
                addToCart({
                    variantId,
                    qty,
                    history,
                    handleOnFinallAddProductToCart,
                    handleOnSuccessAddProductToCart,
                    handleOnErrorAddProductToCart,
                }),
            );
        } else history.push('/login');
    };

    const buyProductHandle = (e) => {
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
            history.push('/login?redirect=placeorder');
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

    const handleAfterFetch = {
        success: (slug) => {
            if (similarProducts?.[0]?.slug !== slug) {
                dispatch(
                    getSimilarProduct({
                        id: productId,
                        category: slug,
                    }),
                );
            }
            if (getParamValue('section') === 'similar') {
                setTimeout(() => {
                    window.scrollTo({
                        top: similarProductRef.current.offsetTop - 150,
                        left: 100,
                        behavior: 'smooth',
                    });
                }, 500);
            }
        },
        error: () => {},
    };

    useEffect(() => {
        if (!qty) setQty(null);
        if (qty > quantity) setQty(quantity);
        else if (qty <= 0) setQty(1);
    }, [deBounce]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (successCreateReview) {
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(productId, handleAfterFetch));
    }, [dispatch, productId, successCreateReview]);
    return {
        similarProductRef,
        loading,
        currentVariant,
        percentDiscount,
        submitHandler,
        buyProductHandle,
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
        haveQuantityOfCurrentVariant,
    };
}
