import React from 'react';
import './styles.scss';
const ContactInfo = () => {
    return (
        <div className="contactInfo container">
            <div className="row">
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <h5 className="infor-area-text">Call Us 24x7</h5>
                        <p>0123456789</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <h5 className="infor-area-text">Headquarter</h5>
                        <p>Go vap district - Ho Chi Minh City</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                            <i className="fas fa-fax"></i>
                        </div>
                        <h5 className="infor-area-text">Fax</h5>
                        <p>0123456789</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
