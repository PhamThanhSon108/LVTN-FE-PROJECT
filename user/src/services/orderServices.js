import request from '~/utils/request';

const addOrder = async (order) => {
    return await request.post(`/orders`, order);
};

const getOrder = async (id) => {
    return await request.get(`/orders/${id}`);
};

const getOrdersByUser = async ({ userId, page, limit = 8, status = '' }) => {
    return await request.get(`/orders/ordered/${userId}`, {
        params: {
            limit,
            page: page,

            status,
        },
    });
};
export { addOrder, getOrder, getOrdersByUser };
