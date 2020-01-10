import React, { FC, ReactElement, createContext, useContext } from 'react';
import { Table as SemanticTable, Loader } from 'semantic-ui-react';
import { Sorting } from '../../_hooks/useSort';
import './table.scss';

interface Props {
  renderHeader: () => ReactElement;
  renderBody: (data: object[]) => ReactElement;
  data?: object[];
  columnCount: number;
  isLoading: boolean;
  emptyLabel: string;
  sorting?: Sorting;
}

const SortContext = createContext<Sorting>({ handleSort: null, getSortDirection: null });

const Table: FC<Props> & { Body; Cell; Footer; Header; HeaderCell; Row } = ({
  renderHeader,
  renderBody,
  data = [],
  columnCount,
  isLoading,
  emptyLabel,
  sorting,
}) => {
  return (
    <SemanticTable celled fixed sortable={!!sorting}>
      <SortContext.Provider value={sorting}>
        <SemanticTable.Header>{renderHeader()}</SemanticTable.Header>
      </SortContext.Provider>
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

const HeaderCell = ({ children, className, name }) => {
  const { getSortDirection, handleSort } = useContext(SortContext);
  return (
    <SemanticTable.HeaderCell className={className} sorted={getSortDirection(name)} onClick={() => handleSort(name)}>
      {children}
    </SemanticTable.HeaderCell>
  );
};

Table.Body = SemanticTable.Body;
Table.Cell = SemanticTable.Cell;
Table.Footer = SemanticTable.Footer;
Table.Header = SemanticTable.Header;
Table.HeaderCell = HeaderCell;
Table.Row = SemanticTable.Row;

export default Table;
