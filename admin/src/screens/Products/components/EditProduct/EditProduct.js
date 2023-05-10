/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Image } from 'primereact/image';

import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Button, Card, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import { ListCategory } from '../../../../Redux/Actions/CategoryActions';
import { fetchProductToEdit, updateProduct } from '../../../../Redux/Actions/ProductActions';
import Toast from '../../../../components/LoadingError/Toast';
import { UploadImageProduct } from '../UploadImageProduct/UploadImageProduct';
import { inputPropsConstants } from '../../../../constants/variants';
import { useParams } from 'react-router-dom';

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

const handleUpdateStatusPreUpdate = (oldVariants = [], variants = []) => {
  const variantsIsDeleted = oldVariants.reduce((variantTarget, oldVariant) => {
    if (!variants.find((variant) => oldVariant?._id === variant?._id && variant?.status === methodToChange.update)) {
      variantTarget.push({ ...oldVariant, status: methodToChange.delete });
    }
    return variantTarget;
  }, []);
  return variants.concat(variantsIsDeleted);
};
const EditProduct = () => {
  const { id: productId } = useParams();

  const [changeForALL, setChangForAll] = useState(false);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [description, setDescription] = useState('');
  const [classifyValue, setClassifyValue] = useState();

  const dispatch = useDispatch();
  const productEdit = useSelector((state) => state.productEdit);
  const { loading, product } = productEdit;

  const defaultGroupProduct = {
    option: ['firstOption', 'secondOption'],
    secondOption: [],
    firstOption: [],
    variants: [],
  };

  const { getValues, setValue, register, handleSubmit, watch, control } = useForm({
    defaultValues: defaultGroupProduct,
    shouldUseNativeValidation: true,
  });

  const fetchProduct = {
    success: (product) => {
      const defaultFirstValue =
        product?.variants?.reduce((storeVariant, value) => {
          const valueInStoreVariant = storeVariant.includes(value?.attributes?.[0]?.value);
          if (!valueInStoreVariant) storeVariant.push(value?.attributes?.[0]?.value);
          return storeVariant;
        }, []) || [];

      const defaultSecondValue =
        product?.variants?.reduce((storeVariant, value) => {
          const valueInStoreVariant = storeVariant.includes(value?.attributes?.[1]?.value);
          if (!valueInStoreVariant) storeVariant.push(value?.attributes?.[1]?.value);
          return storeVariant;
        }, []) || [];

      const defaultVariants = defaultFirstValue?.map((value, index) =>
        product.variants.reduce(
          (variants, variant, i) => {
            if (variant.attributes[0].value === value)
              variants = { field: [...variants.field, { ...variant, status: methodToChange.update }] };
            return variants;
          },
          { field: [] },
        ),
      );

      setValue('firstOption', defaultFirstValue);
      setValue('secondOption', defaultSecondValue);
      setValue('variants', defaultVariants);
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setImage(product.images?.[0]);
    },
  };

  useEffect(() => {
    dispatch(ListCategory());
    dispatch(fetchProductToEdit(productId, fetchProduct));
  }, [productId, dispatch]);

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate } = productUpdate;

  const categoriesInStore = useSelector((state) => state.CategoryChildren);
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
          handleUpdateStatusPreUpdate(
            product?.variants,
            data.variants.reduce((variants, variant) => {
              variants = variants.concat(variant.field);
              return variants;
            }, []),
          ),
        ),
      );
      newImage ? newProduct.append('imageFile', newImage) : newProduct.append('imageFile', image);
      dispatch(updateProduct(newProduct));
    }
  };

  const labelOfFirstOption = product?.variants?.[0]?.attributes?.[0]?.name || '';
  const labelOfSecondOption = product?.variants?.[1]?.attributes?.[1]?.name || '';
  return (
    <>
      <Toast />
      <section>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="d-flex" style={{ marginBottom: 16 }}>
            <h2 className="content-title">Cập nhật sản phẩm</h2>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div style={{ height: 2.5 }}>
                {loading ? (
                  <LinearProgress sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }} />
                ) : null}
              </div>
              <Card sx={{ padding: 2, mb: 2 }}>
                <div className="mb-4">
                  <h5>Thông tin cơ bản</h5>
                </div>
                <div className="mb-4">
                  <label htmlFor="product_title" className="form-label">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
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
                      Chọn thể loại
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
                  <label className="form-label">Ảnh cũ của sản phẩm</label>

                  <Image src={image} template="Preview Content" alt="Image Text" preview width="40px" />

                  <UploadImageProduct setImage={(value) => setNewImage(value)} name={name} />
                </div>
              </Card>
              <Card sx={{ padding: 2, mb: 2 }}>
                <div className="mb-4">
                  <h5>Thông tin bán hàng</h5>
                </div>
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
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
                                          field: getValues('secondOption').reduce((newArray) => {
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
                                    <Button sx={{ mt: 1 }} startIcon={<AddIcon />}>
                                      Thêm thể loại
                                    </Button>
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
                        Áp dụng cho tất cả sản phẩm
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
                              <th scope="col">Giá đặc biệt</th>
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
                                    <td className="col-2">
                                      <input
                                        type="number"
                                        className=""
                                        placeholder="Enter price"
                                        {...register(`variants.${iClass1}.field.${iClass2}.price`, {
                                          required: 'This is required',
                                          validate: {
                                            positive: (value) => value >= 0 && value < 100000000000,
                                          },
                                        })}
                                      ></input>
                                    </td>
                                    <td className="col-2">
                                      <input
                                        type="number"
                                        className=""
                                        placeholder="Enter price"
                                        {...register(`variants.${iClass1}.field.${iClass2}.priceSale`, {
                                          required: 'This is required',
                                          validate: {
                                            positive: (value) =>
                                              value >= 0 && value < watch(`variants.${iClass1}.field.${iClass2}.price`),
                                          },
                                        })}
                                      ></input>
                                    </td>
                                    <td className="col-2">
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
              </Card>

              <div className="col-12 ">
                <Card sx={{ padding: 2 }}>
                  <div className="d-flex align-content-between justify-content-end">
                    <LoadingButton
                      loading={loadingUpdate}
                      type="submit"
                      variant={inputPropsConstants.variantContained}
                      startIcon={<AutorenewOutlinedIcon />}
                    >
                      Cập nhật sản phẩm
                    </LoadingButton>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProduct;
