import React, { useEffect, useState } from 'react';
import image from '~/assets/images';

export default function VerifyRegisterSuccess({ location, history }) {
    const [loading, setLoading] = useState(false);
    const email = location.search ? location.search.split('=')[1] : 'nulll';
    setTimeout(() => {}, 2000);
    useEffect(() => {
        if (loading === false) {
            const timeOut = setTimeout(() => {
                setLoading(true);
            }, 500);
        }
        // return clearTimeout(timeOut);
    }, []);
    return (
        <>
            {loading && (
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
                                style={{
                                    height: '100%',
                                }}
                                src={image.logo}
                            />
                        </div>
                        <h4 style={{ color: '#127412' }}>Great, now verify your email</h4>
                        <div
                            style={{
                                // height: '250px',
                                margin: '10px',
                            }}
                        >
                            <img
                                style={{
                                    width: '230px',
                                }}
                                src={image.email}
                                // src="https://account.mongodb.com/static/dist/images/953862e6f29d77cebef307438ae8c10a.png"
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <h4
                                style={{
                                    color: 'rgb(61, 79, 88)',
                                    fontSize: '15px',
                                    letterSpacing: '0px',
                                    linHeight: '19px',
                                    marginBlockEnd: '1em',
                                    marginInlineStart: '0px',
                                    marginInlineEnd: '0px',
                                }}
                            >{`Check your inbox at <${email?.toString()}> and click the verification link inside to complete your registration. This link will expire shortly, so verify soon!`}</h4>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 600,
                                    marginRight: '5px',
                                }}
                            >
                                Don't see an email?
                            </p>
                            <p>Check your spam folder.</p>
                        </div>
                        <div></div>
                    </form>
                </div>
            )}
        </>
    );
}
