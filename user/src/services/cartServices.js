const { default: request } = require('~/utils/request');

const getListCart = async () => {
    return await request.get(`/carts`);
};

const addProductToCart = async (data) => {
    return await request.post(`/carts/add`, data);
};

const updateCartService = async (data) => {
    return await request.patch(`/carts/update`, data);
};

const removeFromCart = async (id) => {
    return request.patch(`/carts/remove`, {
        variantIds: id,
    });
};

export { getListCart, addProductToCart, updateCartService, removeFromCart };
