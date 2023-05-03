const { default: request } = require('~/utils/request');

const getCategories = async () => {
    return request.get(`/categories/get-category-tree/`);
};
export { getCategories };
