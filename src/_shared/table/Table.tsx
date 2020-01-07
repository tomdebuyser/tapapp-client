import React, { FC, ReactElement } from 'react';
import { Table as SemanticTable, Loader } from 'semantic-ui-react';
import './table.scss';

interface Props {
  renderHeader: () => ReactElement;
  renderBody: (data: object[]) => ReactElement;
  data?: object[];
  columnCount: number;
  isLoading: boolean;
  emptyLabel: string;
}

const Table: FC<Props> & { Body; Cell; Footer; Header; HeaderCell; Row } = ({
  renderHeader,
  renderBody,
  data = [],
  columnCount,
  isLoading,
  emptyLabel,
}) => {
  return (
    <SemanticTable celled fixed>
      <SemanticTable.Header>{renderHeader()}</SemanticTable.Header>
      <SemanticTable.Body>
        {isLoading ? (
          <SemanticTable.Row>
            <SemanticTable.Cell colSpan={columnCount}>
              <Loader active inline="centered" />
            </SemanticTable.Cell>
          </SemanticTable.Row>
        ) : data?.length ? (
          renderBody(data)
        ) : (
          <SemanticTable.Row>
            <SemanticTable.Cell className="table-empty" colSpan={columnCount}>
              {emptyLabel}
            </SemanticTable.Cell>
          </SemanticTable.Row>
        )}
      </SemanticTable.Body>
    </SemanticTable>
  );
};

Table.Body = SemanticTable.Body;
Table.Cell = SemanticTable.Cell;
Table.Footer = SemanticTable.Footer;
Table.Header = SemanticTable.Header;
Table.HeaderCell = SemanticTable.HeaderCell;
Table.Row = SemanticTable.Row;

export default Table;