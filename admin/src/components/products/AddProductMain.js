/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import Toast from './../LoadingError/Toast';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from './../../Redux/Actions/ProductActions';
import { toast } from 'react-toastify';
import Loading from '../LoadingError/Loading';
import { ListCategory } from '../../Redux/Actions/CategoryActions';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { FileUploadDemo } from './UploadImage';
import { Button } from 'primereact/button';

const MainLayout = ({ children }) => {
  return (
    <section className="content-main" style={{ maxWidth: '1200px' }}>
      <div className="content-header">
        <Link to="/product" className="btn btn-danger text-white">
          Trở về trang danh sách sản phẩm
        </Link>
        <h2 className="content-title">Thêm sản phẩm</h2>
      </div>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const methodToChange = {
  add: 1,
  update: 0,
  delete: -1,
};

const AddProductMain = (props) => {
  const [changeForALL, setChangForAll] = useState(false);
  const { productId } = props;
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [description, setDescription] = useState('');
  const [classifyValue, setClassifyValue] = useState();

  const dispatch = useDispatch();
  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error } = productEdit;

  const defaultGroupProduct = {
    option: ['firstOption', 'secondOption'],
    secondOption: [''],
    firstOption: [''],
    variants: [],
  };

  const { getValues, setValue, register, handleSubmit, watch, control } = useForm({
    defaultValues: defaultGroupProduct,
    shouldUseNativeValidation: true,
  });

  useEffect(() => {
    dispatch(ListCategory());
  }, [productId, dispatch]);

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate } = productUpdate;

  const categoriesInStore = useSelector((state) => state.CategoryList);
  const { categories } = categoriesInStore;

  const checkSameValue = (arrValue) => {
    return (
      arrValue?.length ===
      arrValue.reduce((newArr, item, index) => {
        if (!newArr?.includes(item)) newArr?.push(item);
        return newArr;
      }, [])?.length
    );
  };
  const submitHandler = (data, e) => {
    e.preventDefault();
    console.log(
      data.variants.reduce((variants, variant) => {
        variants = variants.concat(variant.field);
        return variants;
      }, []),

      'submit',
    );
    if (!checkSameValue(data.firstOption) || !checkSameValue(data.secondOption)) {
      toast.error('Name of classify cannot be duplicated!!', ToastObjects);
      return;
    }
    if (category !== -1) {
      let newProduct = new FormData();
      newProduct.append('_id', productId);
      newProduct.append('name', name);
      newProduct.append('description', description);
      newProduct.append('category', category);
      newProduct.append(
        'variants',
        JSON.stringify(
          data.variants.reduce((variants, variant) => {
            variants = variants.concat(variant.field);
            return variants;
          }, []),
        ),
      );
      newImage ? newProduct.append('productImage', newImage) : newProduct.append('productImage', image);
      dispatch(updateProduct(newProduct));
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Fragment />
      </MainLayout>
    );
  }

  const labelOfFirstOption = 'size';
  const labelOfSecondOption = 'color';
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: '1200px' }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              <i className="fas fa-arrow-left" />
            </Link>
            <h2 className="content-title">Thêm sản phẩm</h2>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="product_category" className="form-label">
                      Thể loại
                    </label>
                    <select
                      type="text"
                      id="product_category"
                      className="form-select"
                      placeholder="Category"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value={-1} selected>
                        Chọn thể loại phù hợp
                      </option>
                      {categories?.map((cate, index) => (
                        <option key={cate._id} value={cate._id}>
                          {cate.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      placeholder="Nhập mô tả"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <FileUploadDemo setImage={(value) => setNewImage(value)} name={name} />
                  </div>

                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      <div className="mb-4">
                        <h3>Thông tin bán hàng</h3>
                      </div>

                      {getValues('option')?.map((valueOption, index) => {
                        let dem = 0;
                        return (
                          <>
                            <div className="mb-4 d-flex" key={uuidv4()}>
                              <div className="col-1 col-md-2">{index === 0 ? 'Kích thước' : 'Màu sắc'}</div>
                              <div className="card-body shadow-sm col-11">
                                {getValues(valueOption)?.map((valueField, i) => (
                                  <div className="col-mb-11 d-flex" key={uuidv4()} style={{ marginTop: '15px' }}>
                                    <label className="col-2 text-start ">Tên của phân loại hàng</label>
                                    <div className="col-10 d-flex">
                                      <Controller
                                        control={control}
                                        name={`${valueOption}.${i}`}
                                        render={({ field }) => (
                                          <input
                                            {...field}
                                            onBlur={(e) => {
                                              setClassifyValue(!classifyValue);
                                              field.onBlur(e);
                                            }}
                                            required
                                            className="flex-grow-1 form-control"
                                          />
                                        )}
                                      />
                                      {getValues(valueOption)?.length > 1 && (
                                        <span
                                          onClick={() => {
                                            if (dem === 0) {
                                              if (valueOption === 'firstOption') {
                                                setValue(
                                                  `variants`,
                                                  getValues(`variants`).filter((value, ind) => ind !== i),
                                                );
                                                setValue(
                                                  'firstOption',
                                                  getValues('firstOption').filter((value, ind) => ind !== i),
                                                );
                                              } else {
                                                setValue(
                                                  `variants`,
                                                  getValues(`variants`)?.map((value) => ({
                                                    field: value.field.filter(
                                                      (variant) => variant.attributes?.[1]?.value !== valueField,
                                                    ),
                                                  })),
                                                );
                                                setValue(
                                                  'secondOption',
                                                  getValues('secondOption').filter((_, ind) => ind !== i),
                                                );
                                              }
                                            }
                                            setClassifyValue(!classifyValue);
                                            dem++;
                                          }}
                                          style={{
                                            display: 'flex',
                                            margin: '15px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                          }}
                                        >
                                          <i className="fas fa-trash-alt" style={{ color: 'red' }}></i>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                {getValues(valueOption)?.length <= 10 && (
                                  <div className="mb-4 d-flex">
                                    <div
                                      style={{ cursor: 'pointer' }}
                                      className="flex-grow-1 d-flex justify-content-center"
                                      onClick={() => {
                                        if (index === 0) {
                                          setValue(valueOption, [...getValues(valueOption), '']);
                                          setValue(`variants.${getValues('variants')?.length}`, {
                                            field: getValues('secondOption').reduce((newArray, value, index) => {
                                              newArray.push({
                                                price: '',
                                                quantity: '',
                                                status: methodToChange.add,
                                                attributes: [
                                                  { name: labelOfFirstOption, value: '' },
                                                  { name: labelOfSecondOption, value: '' },
                                                ],
                                              });
                                              return newArray;
                                            }, []),
                                          });
                                        } else {
                                          setValue(valueOption, [...getValues(valueOption), '']);
                                          setValue(
                                            'variants',
                                            getValues('variants')?.map((value) => {
                                              value.field.push({
                                                price: '',
                                                quantity: '',
                                                status: methodToChange.add,
                                                attributes: [
                                                  { name: labelOfFirstOption, value: '' },
                                                  { name: labelOfSecondOption, value: '' },
                                                ],
                                              });
                                              return value;
                                            }),
                                          );
                                        }
                                        setClassifyValue((pre) => !pre);
                                      }}
                                    >
                                      <i class="icon fas fa-plus m-1"></i>
                                      <p>Thêm phâm loại hàng</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })}
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          checked={changeForALL}
                          id="defaultCheck1"
                          onChange={(e) => {
                            e.target.checked ? setChangForAll(true) : setChangForAll(false);
                          }}
                        />
                        <label class="form-check-label" for="defaultCheck1">
                          Áp dụng cho tất cả sản phân loại
                        </label>
                      </div>
                      <table class="table">
                        {' '}
                        <thead>
                          <tr>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                {...register('price')}
                                className="border-0 input "
                                placeholder="Nhập giá"
                                type={'number'}
                              ></input>
                            </td>
                            <td>
                              <input
                                className="border-0 input "
                                type={'number'}
                                {...register('quantity')}
                                placeholder="Nhập số lượng"
                              />{' '}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="mb-4 d-flex">
                        <label className="col-3 text-start ">Danh sách phân loại hàng</label>
                        <div className="col-9 d-flex">
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">Kích thước</th>

                                <th scope="col">Màu sắc</th>

                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getValues('firstOption')?.map((value1, iClass1) => {
                                return getValues('secondOption')?.map((value2, iClass2) => {
                                  setValue(`variants.${iClass1}.field.${iClass2}.attributes.0.value`, value1);
                                  setValue(`variants.${iClass1}.field.${iClass2}.attributes.1.value`, value2);
                                  if (changeForALL) {
                                    setValue(`variants.${iClass1}.field.${iClass2}.price`, watch('price'));
                                    setValue(`variants.${iClass1}.field.${iClass2}.quantity`, watch('quantity'));
                                  }
                                  return (
                                    <tr key={`${value1} + ${value2}`}>
                                      <td className="col-3">{value1 || '?'}</td>
                                      <td className="col-3">{value2 || '?'}</td>
                                      <td className="col-3">
                                        <input
                                          type="number"
                                          className=""
                                          placeholder="Enter price"
                                          {...register(`variants.${iClass1}.field.${iClass2}.price`, {
                                            required: 'This is required',
                                            validate: {
                                              positive: (value) => value >= 0 && value < 10000,
                                            },
                                          })}
                                        ></input>
                                      </td>
                                      <td className="col-3">
                                        <input
                                          type="number"
                                          className="flex-grow-1"
                                          placeholder="Enter quantity"
                                          {...register(`variants.${iClass1}.field.${iClass2}.quantity`, {
                                            required: 'This is required',
                                            validate: {
                                              positive: (value) => value >= 0 && value < 10000,
                                            },
                                          })}
                                        ></input>
                                      </td>
                                    </tr>
                                  );
                                });
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 ">
                <div className="d-flex align-content-between justify-content-end">
                  <Button
                    icon={<i class="fa-solid fa-plus"></i>}
                    loading={loadingUpdate}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Thêm sản phẩm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
