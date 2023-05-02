import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/LoadingError/Loading';
import Message from '../../../../components/LoadingError/Error';

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  if (loading)
    return (
      <div className="card-body">
        <h4 className="card-title">New orders</h4>
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="card-body">
        <h4 className="card-title">New orders</h4>
        <Message variant="alert-danger">{error}</Message>
      </div>
    );
  return (
    <div className="card-body">
      <h4 className="card-title">New orders</h4>

      <div className="table-responsive">
        <table className="table">
          <tbody>
            {orders?.orders?.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td>
                  <b>{order?.username}</b>
                </td>
                <td>{order?.contactInformation?.email}</td>
                <td>${order?.totalPrice}</td>
                <td>
                  <span
                    className={`badge rounded-pill alert-primary
                     ${order?.status === 'Completed' && 'alert-success'}
                      ${order?.status === 'Cancelled' && 'alert-dark'}
                    `}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{moment(order.createdAt).calendar()}</td>
                <td className="d-flex justify-content-end align-item-center">
                  <Link to={`/order/${order._id}`} className="text-success">
                    <i className="fas fa-eye"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestOrder;
