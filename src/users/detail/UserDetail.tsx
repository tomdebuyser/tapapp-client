import React from 'react';
import { Container } from 'semantic-ui-react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Icon, Button } from '../../_shared';
import { translations } from '../../_translations';
import { usersSelectors } from '../../_store/selectors';
import './userDetail.scss';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import { usersActions } from '../../_store/actions';
import { labelForUserState } from '../_utils';
import { UserState, IUserForm } from '../_models/User';
import UserForm from '../edit/UserForm';

const UserDetail = () => {
  const { id } = useParams();
  const user = useSelector(usersSelectors.user(id));
  const isUpdateLoading = useSelector(usersSelectors.isUpdateUserLoading);
  const isInactivateLoading = useSelector(usersSelectors.isInactivateUserLoading);
  const isResendRegisterMailLoading = useSelector(usersSelectors.isResendRegisterEmailLoading);
  const errorUpdateUser = useSelector(usersSelectors.errorUpdateUser);
  const dispatch = useDispatch();

  if (!user) return <Redirect to="/users" />;

  function renderHeader() {
    return (
      <header>
        <h1>{user.email}</h1>
        <div className="timestamps">
          <div>
            {translations.getLabel('USERS.DETAIL.CREATED_AT_BY', {
              date: formatDate(dateFromISOString(user.createdAt), 'dd/MM/yyyy HH:mm'),
              name: user.createdBy,
            })}
          </div>
          <div>
            {translations.getLabel('USERS.DETAIL.UPDATED_AT_BY', {
              date: formatDate(dateFromISOString(user.updatedAt), 'dd/MM/yyyy HH:mm'),
              name: user.updatedBy,
            })}
          </div>
        </div>
      </header>
    );
  }

  function renderDetailsSection() {
    const initialForm: IUserForm = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      roleIds: user.roles.map(role => role.id),
    };
    return (
      <section>
        <h2>{translations.getLabel('USERS.DETAIL.DETAILS.TITLE')}</h2>
        <UserForm
          error={errorUpdateUser}
          initialForm={initialForm}
          isSubmitting={isUpdateLoading}
          submitForm={(form: IUserForm) => dispatch(new usersActions.UpdateUser({ userId: user.id, form }))}
          userId={user.id}
        />
      </section>
    );
  }

  function renderStatusSection() {
    let button = (
      <Button
        loading={isResendRegisterMailLoading}
        onClick={() => dispatch(new usersActions.ResendRegisterEmail({ user }))}
        primary
      >
        {translations.getLabel(
          user.state === UserState.Registering
            ? 'USERS.DETAIL.STATUS.BUTTON.RESEND_REGISTER_MAIL'
            : 'USERS.DETAIL.STATUS.BUTTON.ACTIVATE',
        )}
      </Button>
    );
    if (user.state === UserState.Active) {
      button = (
        <Button loading={isInactivateLoading} onClick={() => dispatch(new usersActions.InactivateUser({ user }))} primary>
          {translations.getLabel('USERS.DETAIL.STATUS.BUTTON.INACTIVATE')}
        </Button>
      );
    }
    return (
      <section className="section-status">
        <h2>{translations.getLabel('USERS.DETAIL.STATUS.TITLE')}</h2>
        <div>
          <span>{`${translations.getLabel('USERS.DETAIL.STATUS.SUBTITLE')} `}</span>
          <span className={classnames('status', user.state)}>{labelForUserState(user.state)}</span>
        </div>
        <div className="description">
          <span>{translations.getLabel(`USERS.DETAIL.STATUS.DESCRIPTION.${user.state}`)}</span>
        </div>
        <div className="actions">{button}</div>
      </section>
    );
  }

  return (
    <Container as="main" className="form-container">
      <Link className="go-back" to="/users">
        <Icon name="SvgChevronLeft" size={2} />
        <span>{translations.getLabel('USERS.DETAIL.BACK')}</span>
      </Link>
      {renderHeader()}
      {renderDetailsSection()}
      {renderStatusSection()}
    </Container>
  );
};

export default UserDetail;
