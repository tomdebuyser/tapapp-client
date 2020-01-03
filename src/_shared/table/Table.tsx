import React, { FC, SyntheticEvent } from 'react';
import { Table as SemanticTable, Pagination, Loader } from 'semantic-ui-react';
import './table.scss';

interface Props {
  headerRow: string[];
  renderBodyRow: (data: any, index: number) => any;
  data?: object[];
  isLoading: boolean;
  pagination?: {
    totalPages: number;
    onPageChange?: (event: SyntheticEvent, data: object) => void;
  };
  emptyLabel: string;
}

const Table: FC<Props> = ({ headerRow, renderBodyRow, data = [], isLoading, pagination, emptyLabel }) => {
  return (
    <>
      <SemanticTable
        celled
        headerRow={headerRow}
        renderBodyRow={renderBodyRow}
        tableData={data}
        footerRow={
          isLoading ? (
            <SemanticTable.Row>
              <SemanticTable.Cell>
                <Loader active inline="centered" />
              </SemanticTable.Cell>
            </SemanticTable.Row>
          ) : (
            !data?.length && (
              <SemanticTable.Row>
                <SemanticTable.Cell className="table-empty">{emptyLabel}</SemanticTable.Cell>
              </SemanticTable.Row>
            )
          )
        }
      />
      {!!pagination && <Pagination defaultActivePage={1} totalPages={pagination.totalPages} onPageChange={pagination.onPageChange} />}
    </>
  );
};

export default Table;
