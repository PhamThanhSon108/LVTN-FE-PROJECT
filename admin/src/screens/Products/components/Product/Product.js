import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Product.module.scss';

import {
  Avatar,
  Card,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  deleteProduct,
  disableProduct,
  restoreProduct,
  visibleProduct,
} from '../../../../Redux/Actions/ProductActions';
import { formatMoney } from '../../../../utils/formatMoney';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm??')) {
      dispatch(deleteProduct(id));
    }
  };

  const restoreHandler = (id) => {
    if (window.confirm('Bạn có chắc muốn khôi phục sản phẩm??')) {
      dispatch(restoreProduct(id));
    }
  };

  const disableHandler = (id) => {
    if (window.confirm('Bạn có chắc muốn ẩn sản phẩm??')) {
      dispatch(disableProduct(id));
    }
  };

  const visibleHandler = (id) => {
    if (window.confirm('Bạn có chắc muốn hiện sản phẩm??')) {
      dispatch(visibleProduct(id));
    }
  };
  const isDeleted = product?.deleted;
  const isDisabled = product?.disabled;
  return (
    <tr>
      <td>
        <Avatar alt={product?.name} src={product?.images?.[0]} />
      </td>
      <td>
        <Tooltip title={product?.name || 'Tên sản phẩm'}>
          <Typography variant="subtitle2" gutterBottom>
            {product?.name || 'Tên sản phẩm'}
          </Typography>
        </Tooltip>
      </td>
      <td>
        <Typography>{product?.category?.name || 'Thể loại sản phẩm'} </Typography>
      </td>
      <td>
        <div className="d-flex align-content-center">
          <Typography sx={{ textDecoration: 'line-through' }} color="black">
            {formatMoney(product?.price || 0)}
          </Typography>
          <Typography sx={{ pl: 1, pr: 1 }}>-</Typography>

          <Typography color="error">{formatMoney(product?.priceSale || 0)}</Typography>
        </div>
      </td>
      <td>
        <Typography>{`x${product?.quantity || 0}`}</Typography>
      </td>
      <td style={{ display: 'flex', justifyContent: 'end' }}>
        {isDeleted ? (
          <Tooltip title="Khôi phục sản phẩm">
            <IconButton onClick={() => restoreHandler(product?._id)}>
              <RestartAltIcon color="primary" />
            </IconButton>
          </Tooltip>
        ) : (
          <Fragment>
            {isDisabled ? (
              <Tooltip title="Hiện sản phẩm">
                <IconButton onClick={() => visibleHandler(product?._id)}>
                  <VisibilityOffIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Ẩn sản phẩm">
                <IconButton onClick={() => disableHandler(product?._id)}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            )}

            <Link to={`/products/${product._id}/edit`}>
              <IconButton>
                <Tooltip title="Chỉnh sửa sản phẩm">
                  <EditIcon />
                </Tooltip>
              </IconButton>
            </Link>
            <IconButton onClick={() => deletehandler(product._id)}>
              <Tooltip title="Xóa sản phẩm">
                <DeleteIcon color="error" />
              </Tooltip>
            </IconButton>
          </Fragment>
        )}
      </td>
    </tr>

    /* <div className="col-md-3 col-sm-4 col-lg-3 mb-5 col-xl-2 fix-bottom">
        <Toast />
        <div className="card card-product-grid">
          <Link to={`/products/${product._id}/edit`} className="img-wrap">
            <img src={product.images?.[0]} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link
              to={`/products/${product._id}/edit`}
              className="title text-truncate"
              style={{ color: 'black', padding: '5px 0' }}
            >
              {product.name}
            </Link>
            <div className="countInStock-price" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="price mb-2">Giá: {product.price} VNĐ</div>
            </div>
            <div className="row">
              <div className="d-flex align-content-center justify-content-between">
                <Link
                  to={`/products/${product._id}/edit`}
                  className="btn  btn-outline-primary col-6 "
                  style={{ fontSize: '18px', fontWeight: '600', marginRight: '5px' }}
                >
                  <i className="fas fa-pen"></i>
                </Link>

                <div
                  onClick={() => deletehandler(product._id)}
                  className="btn btn-outline-danger col-6 "
                  style={{ fontSize: '18px', fontWeight: '600', marginLeft: '5px' }}
                >
                  <i className="fas fa-trash-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
  );
};

export default Product;
