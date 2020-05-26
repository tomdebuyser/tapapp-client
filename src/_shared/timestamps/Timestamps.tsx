import React, { FC } from 'react';
import { translations } from '../../_translations';
import { formatISOString } from '../../_utils/dateHelpers';
import './timestamps.scss';

type Props = {
  entity: {
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
  };
};

function formatTimestamp(at: string, by: string, translationKey: string): string {
  const params: Record<string, string> = { date: formatISOString(at, 'dd/MM/yyyy HH:mm') };
  if (by) params.name = by;
  return translations.getLabel(`${translationKey}${by ? '_BY' : ''}`, params);
}

const Timestamps: FC<Props> = ({ entity }) => {
  const { createdAt, createdBy, updatedAt, updatedBy } = entity;
  return (
    <div className="timestamps">
      {createdAt && <div>{formatTimestamp(createdAt, createdBy, 'SHARED.DETAIL.CREATED_AT')}</div>}
      {updatedAt && <div>{formatTimestamp(updatedAt, updatedBy, 'SHARED.DETAIL.UPDATED_AT')}</div>}
    </div>
  );
};

export default Timestamps;
