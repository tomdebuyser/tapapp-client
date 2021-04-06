import React, { FC } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { orderSelectors } from '../../../_store/selectors';
import { Badge, Button } from '../../../_shared';
import { orderActions } from '../../../_store/actions';
import { parseCurrency } from '../../../_utils/parseHelpers';
import { I18n } from '../../../_translations';
import './orderActionBar.scss';

type Props = {
  isOpen?: boolean;
};

const OrderActionBar: FC<Props> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const orderId = useSelector(orderSelectors.orderId);
  const totalPrice = useSelector(orderSelectors.totalPrice);
  const totalCount = useSelector(orderSelectors.totalProductsCount);
  const isCreateLoading = useSelector(orderSelectors.isCreateOrderLoading);
  const isUpdateLoading = useSelector(orderSelectors.isUpdateOrderLoading);

  function renderButtons() {
    if (orderId) {
      return (
        <>
          <Button negative onClick={() => dispatch(new orderActions.GetOrder({ orderId }))}>
            {I18n.labels.ORDER.COMPOSE.ACTION_BAR.CANCEL}
          </Button>
          <Button loading={isUpdateLoading} onClick={() => dispatch(new orderActions.UpdateOrder())} primary>
            {I18n.labels.ORDER.COMPOSE.ACTION_BAR.CHECKOUT}
          </Button>
        </>
      );
    }
    return (
      <>
        <Button negative onClick={() => dispatch(new orderActions.DeleteOrder())}>
          {I18n.labels.ORDER.COMPOSE.ACTION_BAR.DELETE}
        </Button>
        <Button loading={isCreateLoading} onClick={() => dispatch(new orderActions.CreateOrder())} primary>
          {I18n.labels.ORDER.COMPOSE.ACTION_BAR.CHECKOUT}
        </Button>
      </>
    );
  }

  return (
    <div className={classnames('order-action-bar', { open: isOpen })}>
      <Badge>{totalCount}</Badge>
      <div className="total">
        <div className="label">{I18n.labels.ORDER.COMPOSE.ACTION_BAR.TOTAL.toUpperCase()}</div>
        <div className="price">{parseCurrency(totalPrice)}</div>
      </div>
      {renderButtons()}
    </div>
  );
};

OrderActionBar.defaultProps = {
  isOpen: false,
};

export default OrderActionBar;
