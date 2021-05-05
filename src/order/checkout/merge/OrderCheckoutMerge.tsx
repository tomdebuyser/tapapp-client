import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import classnames from 'classnames';
import OrdersUnfinishedList from '../../../orders/unfinished/list/OrdersUnfinishedList';
import { Button } from '../../../_shared';
import './orderCheckoutMerge.scss';
import { ordersSelectors, orderSelectors } from '../../../_store/selectors';
import { useModal } from '../../../_hooks';
import { ordersActions } from '../../../_store/actions';
import { IOrder } from '../../_models';
import { I18n } from '../../../_translations';
import OrderAddClientNameModal from './addClientName/OrderAddClientNameModal';

const OrderCheckoutMerge: FC = () => {
  const dispatch = useDispatch();
  const orderId = useSelector(orderSelectors.orderId);
  const orders = useSelector(ordersSelectors.unfinishedOrders);
  const isGetOrdersLoading = useSelector(ordersSelectors.isGetUnfinishedOrdersLoading);
  const isUnfinishedOrder = useSelector(orderSelectors.isUnfinishedOrder);
  const noResults = !isGetOrdersLoading && !orders?.length;

  const [renderOrderClientNameModal, openOrderClientNameModal] = useModal(modalProps => (
    <OrderAddClientNameModal {...modalProps} />
  ));

  function title(): string {
    if (isUnfinishedOrder) return I18n.labels.ORDER.CHECKOUT.MERGE.UNFINISHED.TITLE;
    return I18n.labels.ORDER.CHECKOUT.MERGE.TITLE;
  }

  function explanation(): string {
    if (isUnfinishedOrder) return I18n.labels.ORDER.CHECKOUT.MERGE.UNFINISHED.EXPLANATION;
    if (noResults) return I18n.labels.ORDER.CHECKOUT.MERGE.EXPLANATION_NEW;
    return I18n.labels.ORDER.CHECKOUT.MERGE.EXPLANATION;
  }

  return (
    <div className="order-checkout-merge">
      <div className="container">
        <h1>{title()}</h1>
        <span>{explanation()}</span>
        <div className="content">
          <div className="buttons-wrapper">
            {!isUnfinishedOrder && (
              <Button onClick={() => openOrderClientNameModal()} primary>
                {I18n.labels.ORDER.CHECKOUT.MERGE.BUTTON_NEW}
              </Button>
            )}
            <Button negative onClick={() => dispatch(push('/order/checkout'))}>
              {I18n.labels.ORDER.CHECKOUT.MERGE.BUTTON_STOP}
            </Button>
          </div>
          <div className={classnames('orders-unfinished-list-wrapper', { hidden: noResults })}>
            <OrdersUnfinishedList
              filter={order => order.id !== orderId}
              renderButton={(targetOrder: IOrder) => (
                <Button onClick={() => dispatch(new ordersActions.MergeOrders({ targetOrder }))}>
                  {I18n.labels.ORDERS.UNFINISHED.ITEM.BUTTON_ADD}
                </Button>
              )}
            />
          </div>
        </div>
      </div>
      {renderOrderClientNameModal()}
    </div>
  );
};

export default OrderCheckoutMerge;
