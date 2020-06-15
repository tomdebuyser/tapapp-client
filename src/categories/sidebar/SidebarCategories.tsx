import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { categoriesSelectors, orderSelectors } from '../../_store/selectors';
import './sidebarCategories.scss';
import { Badge } from '../../_shared';
import { ICategory } from '../_models';
import { IOrderItem } from '../../order/_models';
import { orderActions } from '../../_store/actions';

function amountForCategory(category: ICategory, items: IOrderItem[]): number {
  return items
    .filter(item => category.products.some(product => product.id === item.product.id))
    .map(item => item.amount)
    .reduce((a, b) => a + b, 0);
}

const SidebarCategories: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelectors.categories);
  const activeCategory = useSelector(orderSelectors.activeCategory);
  const items = useSelector(orderSelectors.items);
  return (
    <div className="sidebar">
      {categories?.map(category => {
        const amount = amountForCategory(category, items);
        return (
          <button
            className={classnames('category', { active: activeCategory?.id === category.id })}
            key={category.id}
            onClick={() => dispatch(new orderActions.SetActiveCategory({ category }))}
          >
            <span>{category.name}</span>
            <Badge className={classnames({ hidden: !amount })}>{amount}</Badge>
          </button>
        );
      })}
    </div>
  );
};

export default SidebarCategories;
