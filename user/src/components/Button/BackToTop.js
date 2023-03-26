import React, { useEffect, useState } from 'react';
import image from '~/assets/images';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
            /* you can also use 'auto' behaviour
         in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div
            style={{
                position: 'fixed',
                right: '10px',
                bottom: '40px',
                height: '55px',
                fontSize: '40px',
                zIndex: '1',
                cursor: 'pointer',
                color: 'var(--primary-btn-color)',
                transition: 'width 8s linear 7s',
                alignItems: 'center',
                padding: 5,
                display: visible ? 'flex' : 'none',
            }}
            onClick={scrollToTop}
        >
            {image.icon.ArrowUp}
        </div>
    );
};

export default BackToTop;
