import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm, { FormValidationErrors } from '../../../../_hooks/useForm';
import { ApiError } from '../../../../_http';
import { translations } from '../../../../_translations';
import { orderSelectors } from '../../../../_store/selectors';
import { orderActions } from '../../../../_store/actions';
import { Modal, ErrorMessage, InputField, Button } from '../../../../_shared';
import { formValidator } from '../../../../_utils/formValidation';

type Props = {
  closeModal: () => void;
};

type IAddClientNameForm = {
  name: string;
};

const initialForm: IAddClientNameForm = {
  name: '',
};

function validateForm(values: IAddClientNameForm): FormValidationErrors<IAddClientNameForm> {
  return {
    name: formValidator.required(values.name),
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'ORDER_CLIENT_NAME_ALREADY_IN_USE')
    return translations.getLabel(`ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.ERROR_ALREADY_IN_USE`);
  return null;
}

const OrderAddClientNameModal: FC<Props> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(orderSelectors.isUpdateOrderLoading);
  const error = useSelector(orderSelectors.errorCrudOrder);
  const errorMessage = errorAsString(error);
  const form = useForm<IAddClientNameForm>({
    error,
    initialForm,
    submitForm: values => dispatch(new orderActions.AddClientName({ clientName: values.name, onSuccess: closeModal })),
    validateForm,
  });

  return (
    <Modal className="order-add-client-name-modal" onClose={closeModal} open>
      <form onSubmit={form.submit}>
        <Modal.Header>{translations.getLabel('ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.TITLE')}</Modal.Header>
        <Modal.Content>
          <p>{translations.getLabel('ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.CONTENT')}</p>
          <ErrorMessage isGlobal isVisible={!!errorMessage}>
            {errorMessage}
          </ErrorMessage>
          <InputField
            name="name"
            onChange={form.setAttribute}
            placeholder={translations.getLabel('ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.INPUT_PLACEHOLDER')}
            type="text"
            validation={form.validationErrors.name}
            value={form.values.name}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>{translations.getLabel('SHARED.BUTTONS.CANCEL')}</Button>
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel('ORDER.CHECKOUT.MERGE.ADD_CLIENT_NAME_MODAL.BUTTON')}
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
};

export default OrderAddClientNameModal;
