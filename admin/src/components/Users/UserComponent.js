import React, { Children, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUser } from '../../Redux/Actions/UserActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { LinearProgress } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách người dùng</h2>
      </div>
      <div className="card mb-4">
        <div className="card-body">{children}</div>
      </div>
    </section>
  );
};

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  if (loading) {
    return (
      <MainLayout>
        <LinearProgress />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Message variant="alert-danger">{error}</Message>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
        {users?.map((user) => (
          <div className="col" key={user._id}>
            <div className="card card-user shadow-sm">
              <div className="card-header">
                <img className="img-md img-avatar" src="images/favicon.png" alt="User pic" />
              </div>
              <div className="card-body">
                <h5 className="card-title mt-5">{user.name}</h5>
                <div className="card-text text-muted">
                  {user.role === 'admin' ? <p className="m-0">Admin</p> : <p className="m-0">Khách hàng</p>}

                  <p>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default UserComponent;
