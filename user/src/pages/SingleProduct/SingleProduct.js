import React, { Fragment } from 'react';

import Message from '../../components/LoadingError/Error';

import { LoadingButton } from '@mui/lab';
import useSingleProduct from './hook/useSingleProduct';
import styles from './SingleProduct.module.scss';
import { Button, Chip, Rating, Typography, styled } from '@mui/material';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { formatMoney } from '~/utils/formatMoney';
import Review from './components/Review/Review';
import ReactQuill from 'react-quill';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'red',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});
const RenderPrice = ({ product, value1, value2 }) => {
    return (
        <Fragment>
            {formatMoney(
                product?.variants?.find(
                    (value) => value.attributes?.[0].value === value1 && value.attributes?.[1].value === value2,
                )?.priceSale ||
                    product.priceSale ||
                    0,
            )}
        </Fragment>
    );
};
const RenderStatus = ({ value1, value2, product }) => {
    if (!value1 || !value2) {
        if (product?.variants?.reduce((count, value) => count + value.quantity, 0) > 0)
            return <Chip label="Có sẵn" color="primary" sx={{ color: 'white ' }} />;
        else
            return <Chip label="Tạm thời hết hàng" color="error" sx={{ color: 'white', backgroundColor: '#d32f2f' }} />;
    } else {
        if (
            product?.variants?.find(
                (value) => value.attributes?.[0].value === value1 && value.attributes?.[1].value === value2,
            )?.quantity > 0
        ) {
            return <Chip label="Có sẵn" color="primary" sx={{ color: 'white ' }} />;
        } else {
            return <Chip label="Tạm thời hết hàng" color="error" sx={{ color: 'white', backgroundColor: '#d32f2f' }} />;
        }
    }
};

const SingleProduct = () => {
    const {
        currentVariant,
        buyProductHandle,
        AddToCartHandle,
        defaultValue1,
        defaultValue2,
        error,
        product,
        qty,
        setQty,
        percentDiscount,
        setValue1,
        setValue2,
        quantity,
        value1,
        value2,
        loadingAddtoCart,

        haveQuantityOfCurrentVariant,
    } = useSingleProduct();

    // if (loading)
    //     return (
    //         <Fragment>
    //             <div className="container single-product">
    //                 <Loading />;
    //             </div>
    //         </Fragment>
    //     );

    if (error)
        return (
            <Fragment>
                <div className="container single-product">
                    <Message variant="alert-danger">{error}</Message>;
                </div>
            </Fragment>
        );
    return (
        <div className="container single-product p-3">
            <div className="row">
                <div className="col-md-12 product-avatar">
                    <div className="row">
                        <div className="col-md-5">
                            <div className={styles.imageWrapper}>
                                <img src={product.images?.[0]} alt={product.name} />
                            </div>
                        </div>
                        <div className="col-md-7 product-postion">
                            <div className={styles.productInfoToBuyWrapper}>
                                <div className="product-count col-lg-12 pt-3">
                                    <div className="">
                                        <Typography noWrap variant="h6" color="black">
                                            {product.name}
                                        </Typography>
                                        <div className={styles.ratingWrapper}>
                                            <Typography
                                                noWrap
                                                variant="body2"
                                                color="error"
                                                sx={{
                                                    textDecoration: 'underline',
                                                    mr: 1,
                                                }}
                                            >
                                                {product.rating}
                                            </Typography>
                                            <StyledRating
                                                size="small"
                                                name="read-only"
                                                value={product.rating || 2}
                                                readOnly
                                                sx={{
                                                    pr: 1,
                                                    mr: 1,
                                                    borderRight: '1px solid var(--border-color)',
                                                    color: 'red',
                                                }}
                                            />
                                            <Typography
                                                noWrap
                                                variant="body2"
                                                color="black"
                                                sx={{
                                                    textDecoration: 'underline',
                                                    mr: 1,
                                                }}
                                            >
                                                {product?.reviews?.length || 0}
                                            </Typography>
                                            <Typography
                                                noWrap
                                                variant="body2"
                                                color="black"
                                                sx={{
                                                    mr: 1,
                                                }}
                                            >
                                                đánh giá
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={styles.priceWrapper}>
                                        <div className="flex-box d-flex justify-content-start align-items-center">
                                            {percentDiscount > 0 ? (
                                                <Typography
                                                    sx={{ textDecoration: 'line-through', mr: 2 }}
                                                    noWrap
                                                    variant="body1"
                                                    color="text.secondary"
                                                >
                                                    {formatMoney(currentVariant?.price || product.price || 0)}
                                                </Typography>
                                            ) : null}

                                            <Typography noWrap variant="h5" color="red" sx={{ mr: 2 }}>
                                                <RenderPrice product={product} value1={value1} value2={value2} />
                                            </Typography>
                                            {percentDiscount > 0 ? (
                                                <div className={styles.chipDiscount}>
                                                    <Typography fontSize={10} noWrap variant="inherit" color="white">
                                                        {percentDiscount} % giảm
                                                    </Typography>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="flex-box d-flex justify-content-start align-items-center mt-2">
                                        <Typography noWrap variant="body1" color="text.secondary" className="col-3">
                                            Trạng thái:
                                        </Typography>
                                        <RenderStatus product={product} value1={value1} value2={value2} />
                                    </div>

                                    <div className="flex-box d-flex justify-content-start align-items-center flex-wrap mt-2">
                                        <Typography noWrap variant="body1" color="text.secondary" className="col-3">
                                            Kích thước:
                                        </Typography>
                                        <div className="col-9">
                                            {defaultValue1?.map((value, index) => (
                                                <button
                                                    key={value}
                                                    onClick={() => {
                                                        setValue1(value);
                                                    }}
                                                    className={`btn text-md-start btn__product-option ${
                                                        value === value1 && 'active'
                                                    }`}
                                                >
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex-box d-flex justify-content-start align-items-center flex-wrap mt-2">
                                        <Typography noWrap variant="body1" color="text.secondary" className="col-3">
                                            Màu sắc:
                                        </Typography>
                                        {defaultValue2?.map((value, index) => (
                                            <button
                                                key={value}
                                                onClick={() => {
                                                    setValue2(value);
                                                }}
                                                className={`btn text-md-start btn__product-option ${
                                                    value === value2 && 'active'
                                                }`}
                                            >
                                                {value}
                                            </button>
                                        ))}
                                    </div>
                                    {haveQuantityOfCurrentVariant > 0 ? (
                                        <>
                                            <div className="flex-box d-flex justify-content-start align-items-center mt-2">
                                                <Typography
                                                    noWrap
                                                    variant="body1"
                                                    color="text.secondary"
                                                    className="col-3"
                                                >
                                                    Số lượng:
                                                </Typography>
                                                <div className="col-9 d-flex align-items-center">
                                                    <i
                                                        class="far fa-minus input-quantity icon"
                                                        onClick={() => {
                                                            if (qty >= 2) setQty((qty) => qty - 1);
                                                        }}
                                                    ></i>
                                                    <input
                                                        class="input-quantity remove-arrow-input"
                                                        type="number"
                                                        value={parseInt(qty)}
                                                        onKeyDown={(evt) =>
                                                            [('e', 'E', '+', '-')].includes(evt.key) &&
                                                            evt.target.startWith(0) &&
                                                            evt.preventDefault()
                                                        }
                                                        onChange={(e) => {
                                                            setQty(parseInt(e.target.value));
                                                        }}
                                                    ></input>
                                                    <i
                                                        class="far fa-plus input-quantity icon"
                                                        style={{ marginRight: '15px' }}
                                                        onClick={() => {
                                                            if (qty < quantity) setQty((qty) => qty + 1);
                                                        }}
                                                    ></i>
                                                    {product?.variants?.find(
                                                        (value) =>
                                                            value.attributes?.[0].value === value1 &&
                                                            value.attributes?.[1].value === value2,
                                                    )?.quantity ||
                                                        product?.variants?.reduce(
                                                            (count, value) => count + value.quantity,
                                                            0,
                                                        )}

                                                    <Typography
                                                        noWrap
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        sản phẩm có sẵn
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div
                                                className="d-flex mt-4"
                                                style={{ marginTop: '10px', marginLeft: '25px' }}
                                            >
                                                <LoadingButton
                                                    variant="outlined"
                                                    loading={loadingAddtoCart}
                                                    onClick={AddToCartHandle}
                                                    style={{ marginRight: '15px' }}
                                                    className="col-4 btn text-primary"
                                                    loadingPosition="start"
                                                >
                                                    Thêm vào giỏ hàng
                                                </LoadingButton>
                                                <Button
                                                    variant="contained"
                                                    style={{ minWidth: 120 }}
                                                    onClick={buyProductHandle}
                                                    className="col-2 btn btn-primary btn-buy-single-product"
                                                >
                                                    Mua ngay
                                                </Button>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                                <div
                                    className="d-flex flex-grow-1 mt-3 align-items-end"
                                    style={{ marginTop: '10px', marginLeft: '25px' }}
                                >
                                    <Typography
                                        noWrap
                                        variant="caption"
                                        color="primary"
                                        sx={{
                                            borderTop: '1px solid var(--border-color)',
                                            mr: 1,
                                            pt: 1,
                                        }}
                                    >
                                        <GppGoodIcon fontSize="1.5" /> Hàng chính hãng 100%
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    <Typography noWrap variant="h6" color="black">
                        Mô tả
                    </Typography>
                    <ReactQuill
                        modules={{ toolbar: false }}
                        style={{ minHeight: '200px' }}
                        theme="snow"
                        value={product?.description}
                        readOnly
                    />
                </div>
                {/* RATING */}
                <Review />
            </div>
        </div>
    );
};

export default SingleProduct;
