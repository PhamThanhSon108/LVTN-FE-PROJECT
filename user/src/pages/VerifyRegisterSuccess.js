import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import image from '~/assets/images';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';

export default function VerifyRegisterSuccess() {
    const { getParamValue } = useSearchParamsCustom();
    const email = getParamValue('email');

    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                <form className="Login col-md-6 col-lg-4 col-10">
                    <div
                        style={{
                            height: '40px',
                            margin: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            alt="Fashion shop"
                            style={{
                                height: '100%',
                            }}
                            src={image.logo}
                        />
                    </div>

                    <Typography variant="h6" color="green">
                        Bây giờ hãy xác thực email của bạn
                    </Typography>
                    <div
                        style={{
                            // height: '250px',
                            margin: '10px',
                        }}
                    >
                        <img
                            alt="Hình ảnh email"
                            style={{
                                width: '230px',
                            }}
                            src={image.email}
                            // src="https://account.mongodb.com/static/dist/images/953862e6f29d77cebef307438ae8c10a.png"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <Typography
                            style={{
                                color: 'rgb(61, 79, 88)',
                                fontSize: '15px',
                                letterSpacing: '0px',
                                linHeight: '19px',
                                marginBlockEnd: '1em',
                                marginInlineStart: '0px',
                                marginInlineEnd: '0px',
                            }}
                        >{`Kiểm tra hộp thư của email <${email?.toString()}> và nhấn vào link xác thực để hoàn tất đăng ký`}</Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: '0.8rem',
                                fontWeight: 600,

                                marginRight: 'var(--space-12)',
                            }}
                        >
                            Bạn không thấy tin nhắn?
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem' }}>Kiểm tra tin nhắn spam</Typography>
                    </div>
                    <div></div>
                </form>
            </div>
        </>
    );
}
