import React from 'react';
import EditProductMain from './../components/products/EditproductMain';
import { useParams } from 'react-router-dom';

const ProductEditScreen = () => {
  const { id } = useParams();
  return <EditProductMain productId={id} />;
};
export default ProductEditScreen;
