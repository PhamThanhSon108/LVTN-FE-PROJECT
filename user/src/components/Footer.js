import React from 'react';

const Footer = () => {
    return (
        <div className="footer-section" style={{ color: 'white', borderTop: '2px solid var(--primary-btn-color)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Thiết kế</h1>
                        <ul className="footer-list">
                            <li>Pham Thanh Son</li>
                            <li>Nguyễn Khắc Tuấn</li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Theo dõi</h1>
                        <ul className="footer-list">
                            <li>
                                <a href="#">
                                    <i class="fab fa-facebook"></i>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-instagram"></i>
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-linkedin"></i>
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <div className="foorter-flex">
                            <div className="card-name">
                                <img
                                    alt="mastercard"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                                />
                            </div>
                            <div className="card-name">
                                <img
                                    alt="visa"
                                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                                />
                            </div>
                            <div className="card-name">
                                <img alt="momo" src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" />
                            </div>
                        </div>
                        <div className="foorter-flex">
                            <div className="card-name">
                                <img
                                    alt="express"
                                    src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png"
                                />
                            </div>
                            <div className="card-name">
                                <img
                                    alt="discover"
                                    src="https://icons-for-free.com/iconfiles/png/512/cash+checkout+discover+network+online+shopping+payment+method-1320191225548835050.png"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 center">
                        <h1 className="footer-hearder">Chăm sóc khách hàng</h1>
                        <ul className="footer-list">
                            <li>
                                <a href="#">Trung tâm hỗ trợ</a>
                            </li>
                            <li>
                                <a href="#">Hướng dẫn</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
