import React from 'react';

const CalltoActionSection = () => {
    return (
        <div className="subscribe-section bg-with-black">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="subscribe-head">
                            <h2>Bạn cần nhiều tip hơn</h2>
                            <p>Đăng ký miễn phí bên dưới để nhận những tip mới nhất</p>
                            <form className="form-section">
                                <input placeholder="Email..." name="email" type="email" />
                                <input value="Có tôi muốn!" name="subscribe" type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalltoActionSection;
