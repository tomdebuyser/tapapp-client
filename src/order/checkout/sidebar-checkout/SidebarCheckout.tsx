import React, { FC } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { orderSelectors } from '../../../_store/selectors';
import { translations } from '../../../_translations';
import { parseCurrency } from '../../../_utils/parseHelpers';
import { Button } from '../../../_shared';
import { orderActions } from '../../../_store/actions';
import './sidebarCheckout.scss';

type Props = {
  readonly?: boolean;
};

const SidebarCheckout: FC<Props> = ({ readonly }) => {
  const dispatch = useDispatch();
  const items = useSelector(orderSelectors.items);
  const totalCount = useSelector(orderSelectors.totalProductsCount);
  const totalPrice = useSelector(orderSelectors.totalPrice);

  return (
    <div className="sidebar sidebar-checkout">
      <div className="content">
        <div className="order-overview">
          <h3>{translations.getLabel('ORDER.CHECKOUT.SIDEBAR.TITLE')}</h3>
          <div className="products-wrapper">
            {items.map((item, index) => (
              <div className="item-wrapper" key={item.id || index}>
                <div className="item">
                  <span>
                    {item.amount}
                    <span className="small-text">x</span>
                  </span>
                  <span className="name">{item.product.name}</span>
                  <span className="small-text">{parseCurrency(item.amount * item.product.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="products-amount">
            {translations.getLabel(`ORDER.CHECKOUT.SIDEBAR.TOTAL_COUNT.${totalCount === 1 ? 'SINGULAR' : 'PLURAL'}`, {
              amount: totalCount,
            })}
          </div>
        </div>
        <div className={classnames('bottom', { readonly })}>
          <h1>{parseCurrency(totalPrice)}</h1>
          <div className="button-wrapper">
            <Button href="/order/compose">{translations.getLabel('SHARED.BUTTONS.EDIT')}</Button>
          </div>
          <div className="button-wrapper">
            <Button negative onClick={() => dispatch(new orderActions.DeleteOrder())}>
              {translations.getLabel('SHARED.BUTTONS.DELETE')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

SidebarCheckout.defaultProps = {
  readonly: false,
};

export default SidebarCheckout;
