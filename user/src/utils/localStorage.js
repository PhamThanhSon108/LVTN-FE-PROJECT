const setLocalStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
};
const clearLocalStorage = (name) => {
    localStorage.removeItem(name);
};
const getItemFromLocalstorage = (name) => {
    return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : null;
};

const getRefreshToken = () => {
    const userInfo = getItemFromLocalstorage('userInfo');
    if (userInfo?.refreshToken) {
        return userInfo.refreshToken;
    }
    return null;
};
export { setLocalStorage, clearLocalStorage, getItemFromLocalstorage, getRefreshToken };
