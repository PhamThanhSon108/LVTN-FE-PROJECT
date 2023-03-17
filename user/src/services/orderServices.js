import request from '~/utils/request';

const addOrder = async (order) => {
    return await request.post(`/order`, order);
};

const getOrder = async (id) => {
    return await request.get(`/order/${id}`);
};

const getOrdersByUser = async (pageNumber) => {
    return await request.get(`/order?pageSize=20&&pageNumber=${pageNumber}`);
};
export { addOrder, getOrder, getOrdersByUser };
