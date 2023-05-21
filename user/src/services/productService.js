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
        pageSize: 24,
    },
) => {
    return await request.get(`/products`, {
        params: { ...data },
    });
};

export { getProducts };
