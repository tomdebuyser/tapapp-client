import React, { FC, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { ordersSelectors } from '../../../_store/selectors';
import { ordersActions } from '../../../_store/actions';
import { translations } from '../../../_translations';
import { Icon } from '../../../_shared';
import { IOrder } from '../../../order/_models';
import { parseCurrency } from '../../../_utils/parseHelpers';
import { formatDate } from '../../../_utils/dateHelpers';
import './ordersUnfinishedList.scss';

type Props = {
  filter?: (order: IOrder) => boolean;
  renderButton: (order: IOrder) => ReactNode;
};

const OrdersUnfinishedList: FC<Props> = ({ filter, renderButton }) => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelectors.unfinishedOrders);
  const isLoading = useSelector(ordersSelectors.isGetUnfinishedOrdersLoading);

  useEffect(() => {
    dispatch(new ordersActions.GetUnfinishedOrders());
  }, []);

  function renderOrder(order: IOrder) {
    const price = order.items.map(item => item.amount * item.product.price).reduce((a, b) => a + b, 0);
    return (
      <div className="item" key={order.id}>
        <div>
          <div className="item-name">{order.clientName || translations.getLabel('ORDERS.UNFINISHED.ITEM.NO_NAME')}</div>
          <div className="item-date">
            {translations.getLabel('ORDERS.UNFINISHED.ITEM.CREATED_AT', { date: formatDate(new Date(order.createdAt)) })}
          </div>
        </div>
        <div className="item-price">{parseCurrency(price)}</div>
        <div className="item-button">{renderButton(order)}</div>
      </div>
    );
  }

  if (!isLoading && !orders?.length) {
    return (
      <div className="no-results">
        <Icon name="SvgRockHand" size={10} />
        <span>{translations.getLabel('ORDERS.UNFINISHED.NO_RESULTS')}</span>
      </div>
    );
  }
  return (
    <div className="orders-unfinished-list">
      {orders?.filter(filter)?.map(renderOrder)}
      <Loader active={isLoading} inline="centered" size="large" />
    </div>
  );
};

OrdersUnfinishedList.defaultProps = {
  filter: () => true,
};

export default OrdersUnfinishedList;
