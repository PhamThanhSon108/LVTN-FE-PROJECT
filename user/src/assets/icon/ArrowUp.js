import React from 'react';

export default React.memo(function ArrowUp() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" version="1">
            <defs>
                <circle id="b" cx="22" cy="21" r="20"></circle>
                <filter id="a" width="118%" height="118%" x="-9%" y="-6%" filterUnits="objectBoundingBox">
                    <feOffset dy="1" in="SourceAlpha" result="f"></feOffset>
                    <feGaussianBlur in="f" result="f" stdDeviation="1"></feGaussianBlur>
                    <feComposite in="f" in2="SourceAlpha" operator="out" result="f"></feComposite>
                    <feColorMatrix in="f" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix>
                </filter>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <use fill="#000" filter="url(#a)" xlinkHref="#b"></use>
                <use fill="#fff" xlinkHref="#b"></use>
                <circle cx="22" cy="21" r="20"></circle>
                <path fill="currentColor" d="M12 13h20v2H12zm11 7v13h-2V20l-6 6-1-2 8-8 9 8-2 2z"></path>
            </g>
        </svg>
    );
});
