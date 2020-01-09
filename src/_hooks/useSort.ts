import { useState, useCallback } from 'react';
import { HttpSortDirection } from '../_http/HttpMetadata';

const useSort = (): {
  sortBy: string;
  sortDirection: HttpSortDirection;
  sorting: { handleSort: (clickedColumn: string) => void; setSorted: (column: string) => 'ascending' | 'descending' };
} => {
  const [sortBy, setSortBy] = useState();
  const [sortDirection, setSortDirection] = useState();

  const handleSort = useCallback(
    (clickedColumn: string) => {
      if (!clickedColumn) return;
      if (sortBy !== clickedColumn) {
        setSortBy(clickedColumn);
        setSortDirection('ASC');
      } else {
        setSortDirection(sortDirection === 'DESC' ? 'ASC' : 'DESC');
      }
    },
    [sortBy, sortDirection],
  );

  const setSorted = useCallback(
    (column: string) => {
      const direction = sortDirection === 'ASC' ? 'ascending' : 'descending';
      return column && sortBy === column ? direction : null;
    },
    [sortBy, sortDirection],
  );

  return { sortBy, sortDirection, sorting: { handleSort, setSorted } };
};

export default useSort;
