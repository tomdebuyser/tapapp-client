import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../../_shared';
import { rolesSelectors } from '../../_store/selectors';
import { rolesActions } from '../../_store/actions';
import { IValidatorResponse } from '../../_utils/formValidation';

interface Props {
  label: string;
  name: string;
  onChange: (value: string[], name: string) => void;
  required?: boolean;
  validation?: IValidatorResponse;
  value: string[];
}

const RolesDropdown: FC<Props> = ({ label, name, value, onChange, validation, required }) => {
  const dispatch = useDispatch();
  const roles = useSelector(rolesSelectors.roles);

  useEffect(() => {
    dispatch(new rolesActions.GetRoles());
  }, [dispatch]);

  const options = useMemo(
    () =>
      roles?.map(role => ({
        text: role.name,
        value: role.id,
      })),
    [roles],
  );
  return (
    <Dropdown
      label={label}
      multiple
      name={name}
      onChange={onChange}
      options={options}
      required={required}
      validation={validation}
      value={value}
    />
  );
};

export default RolesDropdown;
