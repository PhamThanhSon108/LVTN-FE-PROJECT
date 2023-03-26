import request from '~/utils/request';

const addOrder = async (order) => {
    return await request.post(`/orders`, order);
};

const getOrder = async (id) => {
    return await request.get(`/orders/${id}`);
};

const getOrdersByUser = async (pageNumber) => {
    return await request.get(`/orders?pageSize=20&&pageNumber=${pageNumber}`);
};
export { addOrder, getOrder, getOrdersByUser };
