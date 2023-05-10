import React from 'react';

export default function PlacedIcon({ ...props }) {
    return (
        <svg {...props} viewBox="0 0 32 32" class="shopee-svg-icon icon-order-order">
            <path
                d="M5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7V3.4zm5 8.1h12m-12 7h12"
                fill="currentColor"
            />
        </svg>
    );
}
