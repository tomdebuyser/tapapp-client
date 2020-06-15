import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import SidebarCategories from '../../categories/sidebar/SidebarCategories';
import { orderSelectors } from '../../_store/selectors';
import './orderCompose.scss';
import ProductItem from './productItem/ProductItem';
import OrderActionBar from './actionBar/OrderActionBar';

const OrderCompose = () => {
  const activeCategory = useSelector(orderSelectors.activeCategory);
  const totalCount = useSelector(orderSelectors.totalProductsCount);
  const isActionBarOpen = totalCount > 0;
  return (
    <>
      <SidebarCategories />
      <div className={classnames('container', { 'extra-bottom-padding': isActionBarOpen })}>
        <div className="grid">
          {activeCategory?.products.map(product => (
            <ProductItem key={product.id} product={product}>
              {product.name}
            </ProductItem>
          ))}
        </div>
        <OrderActionBar isOpen={isActionBarOpen} />
      </div>
    </>
  );
};

export default OrderCompose;
