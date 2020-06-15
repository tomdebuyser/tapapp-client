import React, { FC, BaseSyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../../_store/actions';
import { IProduct } from '../../../categories/_models';
import { Badge, Icon } from '../../../_shared';
import { orderSelectors } from '../../../_store/selectors';
import './productItem.scss';

type Props = {
  product: IProduct;
};

const ProductItem: FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const count = useSelector(orderSelectors.productCount(product.id));

  function addRemoveAmount(event: BaseSyntheticEvent, amountToAdd: number) {
    event.stopPropagation();
    dispatch(new orderActions.AddRemoveProduct({ amountToAdd, product }));
  }

  return (
    <div className="item" onClick={event => addRemoveAmount(event, 1)}>
      {count > 0 && (
        <div className="item-active">
          <div className="item-active-buttons">
            <div className="badge-remove" onClick={event => addRemoveAmount(event, -1)}>
              <Badge negative>
                <Icon name="SvgMinus" size={2} />
              </Badge>
            </div>
            <div className="badge-counter">
              <Badge>{count}</Badge>
            </div>
          </div>
        </div>
      )}
      <div className="logo" style={{ backgroundImage: `url(${require(`../../../_assets/images/${product.logo}`)})` }} />
      <div className="name">{product.name}</div>
    </div>
  );
};

export default ProductItem;
