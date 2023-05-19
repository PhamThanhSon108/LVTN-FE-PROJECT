import request from '~/utils/request';

const getProducts = async ({
    category = '',
    keyword = '',
    pageNumber = 0,
    rating = '',
    minPrice = '',
    maxPrice = '',
    priceOrder = '',
    pageSize = 24,
}) => {
    return await request.get(
        `/products?category=${category}&keyword=${keyword}&pageNumber=${pageNumber}&rating=${rating}
        &minPrice=${minPrice}&maxPrice=${maxPrice}&priceOrder=${priceOrder}&pageSize=${pageSize}`,
    );
};

export { getProducts };
