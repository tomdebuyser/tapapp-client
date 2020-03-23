import React, { FC } from 'react';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import './goBackLink.scss';

interface Props {
  label: string;
  to: string;
}

const GoBackLink: FC<Props> = ({ label, to }) => {
  return (
    <Button asText className="go-back" href={to} primary>
      <Icon name="SvgChevronLeft" size={2} />
      <span>{label}</span>
    </Button>
  );
};

export default GoBackLink;
