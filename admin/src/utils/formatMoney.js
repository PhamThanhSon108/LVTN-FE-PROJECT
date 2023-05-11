import React from 'react';

const formatMoney = (number) => {
    return number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
};

export { formatMoney };
