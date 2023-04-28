import React from 'react';
import { useLocation } from 'react-router-dom';

export default function useQuery() {
    const { search } = useLocation();
    const query = {
        get: (key) => {
            let result = {};
            search?.split('?').map((value) => {
                const object = value.split('=');
                result[object[0]] = object[1];
            });
            delete result[''];
            return result[key];
        },
    };
    return query;
}
