import React from 'react';
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
import { deleteProduct } from '../../../../Redux/Actions/ProductActions';
import { formatMoney } from '../../../../utils/formatMoney';

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm('Are you sure??')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <Card className={styles.cardProduct} key={product?._id}>
      <ListItem key={product} role="listitem" button>
        <ListItemAvatar>
          <Avatar alt={product?.name} src={product?.images?.[0]} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Tooltip title={product?.name || 'Tên thể loại'}>
              <Typography noWrap={true} variant="subtitle2" gutterBottom>
                {product?.name || 'Tên thể loại'}
              </Typography>
            </Tooltip>
          }
          sx={{ width: '30%', maxWidth: '300px', pr: 2 }}
        />

        <ListItemText
          sx={{ width: '20%', maxWidth: '300px', pr: 2 }}
          primary={product?.category?.name || 'Thể loại sản phẩm'}
        />
        <ListItemText
          sx={{ width: '20%', maxWidth: '300px', pr: 2 }}
          primary={
            <div className="d-flex align-content-center">
              <Typography sx={{ textDecoration: 'line-through' }} color="black">
                {formatMoney(product?.price || 0)}
              </Typography>
              <Typography sx={{ pl: 1, pr: 1 }}>-</Typography>

              <Typography color="error">{formatMoney(product?.priceSale || 0)}</Typography>
            </div>
          }
        />
        <ListItemText sx={{ width: '10%', maxWidth: '300px', pr: 2 }} primary={`x${product?.quantity || 0}`} />
        <ListItemIcon>
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
        </ListItemIcon>
      </ListItem>
    </Card>
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
