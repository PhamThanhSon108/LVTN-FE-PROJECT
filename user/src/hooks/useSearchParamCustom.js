import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function useSearchParamsCustom() {
    let history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const replaceParams = (items = [{ key: '', value: '' }], replaceAll = false) => {
        if (replaceAll) {
            history.replace(`?${items?.[0]?.key}=${items?.[0]?.value}`);
        } else {
            items.forEach((item) => {
                searchParams.set(item.key, item.value);
            });
            history.replace(`?${searchParams.toString()}`);
        }
    };
    const getParamValue = (key) => {
        return searchParams.get(key);
    };
    return { replaceParams, getParamValue };
}
