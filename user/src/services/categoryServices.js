const { default: request } = require('~/utils/request');

const getCategories = async () => {
    return request.get(`/categorie/`);
};
export { getCategories };
