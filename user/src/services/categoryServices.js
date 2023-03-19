const { default: request } = require('~/utils/request');

const getCategories = async () => {
    return request.get(`/categories/get_category_tree/`);
};
export { getCategories };
