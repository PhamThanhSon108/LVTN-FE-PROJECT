import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatMoney } from '~/utils/formatMoney';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '~/Redux/Actions/orderActions';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
const MyOrders = () => {
    const dispatch = useDispatch();
    const myOrders = useSelector((state) => state.myOrders);
    const { loading, error, orders } = myOrders;
    useEffect(() => {
        dispatch(getMyOrders({}));
    }, []);
    if (loading) {
        return (
            <div className=" d-flex justify-content-center align-items-center flex-column">
                <Loading />
            </div>
        );
    }
    if (error) {
        return <Message variant="alert-danger">{error}</Message>;
    }
    return (
        <div className=" d-flex justify-content-center align-items-center flex-column">
            <Fragment>
                {!orders || orders?.length === 0 ? (
                    <div className="col-12 alert alert-info text-center mt-3">
                        No Orders
                        <Link
                            className="btn btn-success mx-2 px-3 py-2"
                            to="/"
                            style={{
                                fontSize: '12px',
                            }}
                        >
                            START SHOPPING
                        </Link>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>STATUS</th>
                                    <th>TIME</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order) => (
                                    <tr
                                        className={`${order?.status === 'Cancelled' && 'alert-dark'} 
                                            ${order?.status === 'Completed' && ' alert-success'}
                                            ${order?.status === 'Failed' && 'alert-danger'}
                                            `}
                                        key={order._id}
                                    >
                                        {' '}
                                        <td>
                                            <a href={`/order/${order._id}`} className="link">
                                                {order._id}
                                            </a>
                                        </td>
                                        <td>
                                            <span className="">{order?.status}</span>
                                        </td>
                                        <td>{moment(order.createdAt).calendar()}</td>
                                        <td>{formatMoney(order.totalPayment)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Fragment>

            {orders && orders?.orders?.length > 1 && !loading && (
                <div className="col-12 d-flex justify-center" style={{ display: 'flex', justifyContent: 'center' }}>
                    <nav aria-label="...">
                        <ul class="pagination">
                            {[...Array(orders?.pages).keys()].map((item) => (
                                <li
                                    key={item._id}
                                    class={`page-item ${item === orders?.page - 1 && 'active'}`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <a class="page-link">{item + 1}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default MyOrders;