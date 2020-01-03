import React, { FC, SyntheticEvent } from 'react';
import { Table as SemanticTable, Pagination } from 'semantic-ui-react';

interface Props {
  headerRow: string[];
  renderBodyRow: (data: any, index: number) => any;
  data: object[];
  pagination?: {
    totalPages: number;
    onPageChange: (event: SyntheticEvent, data: object) => void;
  };
}

const Table: FC<Props> = ({ headerRow, renderBodyRow, data, pagination }) => {
  return (
    <>
      <SemanticTable celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={data} />
      {!!pagination && <Pagination defaultActivePage={1} totalPages={pagination.totalPages} onPageChange={pagination.onPageChange} />}
    </>
  );
};

export default Table;
