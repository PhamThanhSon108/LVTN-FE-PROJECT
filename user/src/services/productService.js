import request from '~/utils/request';

const getProducts = async ({ category, keyword, pageNumber, rating, minPrice, maxPrice, priceOrder, pageSize }) => {
    return await request.get(
        `/product?category=${category}&keyword=${keyword}&pageNumber=${pageNumber}&rating=${rating}
        &minPrice=${minPrice}&maxPrice=${maxPrice}&priceOrder=${priceOrder}&pageSize=${pageSize}`,
    );
};

export { getProducts };
