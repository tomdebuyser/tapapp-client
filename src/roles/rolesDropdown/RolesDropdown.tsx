import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../../_shared';
import { rolesSelectors } from '../../_store/selectors';
import { rolesActions } from '../../_store/actions';

interface Props {
  label: string;
  name: string;
  value: string[];
  onChange: (value: string[], name: string) => void;
}

const RolesDropdown: FC<Props> = ({ label, name, value, onChange }) => {
  const dispatch = useDispatch();
  const roles = useSelector(rolesSelectors.roles);

  useEffect(() => {
    dispatch(new rolesActions.GetRoles());
  }, [dispatch]);

  const options = useMemo(
    () =>
      roles?.map(role => ({
        key: role.id,
        text: role.name,
        value: role.id,
      })),
    [roles],
  );
  return <Dropdown label={label} name={name} multiple value={value || []} onChange={onChange} options={options} />;
};

export default RolesDropdown;
