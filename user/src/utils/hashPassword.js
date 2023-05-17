import { SHA256 } from 'crypto-js';
export const hashPassword = async (password) => {
    try {
        const hashedPassword = SHA256(password).toString();
        return hashedPassword;
    } catch (error) {
        throw new Error('Lỗi xảy ra khi xử lý dữ liệu!');
    }
};
