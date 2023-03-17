const { default: request } = require('~/utils/request');

const getListCart = async () => {
    return await request.get(`/cart`);
};

const addProductToCart = async (data) => {
    return await request.post(`/cart/add`, data);
};

const updateCart = async (data) => {
    return await request.patch(`/cart/update`, data);
};

const removeFromCart = async (id) => {
    return request.patch(`/cart/remove`, {
        variantIds: id,
    });
};

export { getListCart, addProductToCart, updateCart, removeFromCart };
