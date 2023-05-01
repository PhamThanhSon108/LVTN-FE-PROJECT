import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { ListCategory } from '../../Redux/Actions/CategoryActions';
import Pagination from '../Home/pagination';
import { Button } from '@mui/material';
import { inputPropsConstants } from '../../constants/variants';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from 'lodash';
import NotFoundResult from '../NotFoundResult/NotFoundResult';
const RenderProducts = ({ loading, error, products = [] }) => {
  if (loading) {
    return <Loading />;
  }
  if (error) return <Message variant="alert-danger">{error}</Message>;

  if (products.length === 0) {
    return (
      <div className="row">
        <NotFoundResult title="Không tìm thấy sản phẩm" />
      </div>
    );
  }
  return (
    <div className="row">
      {products?.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
};

const MainProducts = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [keyword] = useState(searchParams.get('search') || '');
  const [category] = useState(searchParams.get('category') || '');
  const [pageNumber, setPageNumber] = useState(1);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;
  //category
  const lcategories = useSelector((state) => state.CategoryChildren);
  const { categories } = lcategories;

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      history.replace(`?search=${criteria.trim()}&category=${searchParams.get('category') || ''}`);
    }, 500),
  ).current;

  const handleCategory = (e) => {
    if (e.target.value !== undefined) {
      history.replace(`?category=${e.target.value?.trim()}&search=${searchParams.get('search') || ''}`);
    }
  };

  async function handleChangeSearch(e) {
    debouncedSearch(e.target.value);
  }
  useEffect(() => {
    dispatch(listProducts(category, keyword, pageNumber));
  }, [dispatch, successDelete, category, keyword, pageNumber]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(ListCategory());
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      debouncedSearch?.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      {/* <Toast /> */}

      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Danh sách sản phẩm</h2>
          <div>
            <Link to="/products/add">
              <Button type="submit" variant={inputPropsConstants.variantContained} startIcon={<AddIcon />}>
                Thêm sản phẩm
              </Button>
            </Link>
          </div>
        </div>

        <div className="card mb-4 shadow-sm main-card-wrapper">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                {/* <form onSubmit={(e) => handleSearch(e)}> */}
                <div className="input-group">
                  <input
                    type="search"
                    placeholder="Nhập sản phẩm cần tìm..."
                    className="form-control p-2"
                    onChange={handleChangeSearch}
                    defaultValue={keyword}
                    disabled={loading}
                  />
                  <button className="btn btn-light bg" type="submit">
                    <i className="far fa-search"></i>
                  </button>
                </div>
                {/* </form> */}
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => {
                    handleCategory(e);
                  }}
                  disabled={loading}
                  defaultValue={category}
                >
                  <option value={''}>Tất cả thể loại</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </header>

          <div className="card-body">
            {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
            <RenderProducts products={products} error={error} loading={loading} />
            <Pagination
              pages={pages}
              page={page}
              category={category ? category : ''}
              keyword={keyword ? keyword : ''}
            ></Pagination>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProducts;
