import request from '~/utils/request';

const getProducts = async (
    data = {
        category: '',
        keyword: '',
        pageNumber: 0,
        rating: '',
        minPrice: '',
        maxPrice: '',
        priceOrder: '',
        limit: 24,
    },
) => {
    return await request.get(`/products`, {
        params: { ...data, limit: 24 },
    });
};

export { getProducts };
