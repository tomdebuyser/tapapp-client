import { useState, useCallback, useEffect } from 'react';
import { HttpSortDirection, HttpMetadataQuery } from '../_http/HttpMetadata';

export interface Sorting {
  handleSort: (clickedColumn: string) => void;
  getSortDirection: (column: string) => 'ascending' | 'descending';
}

const useSort = (get: (query: HttpMetadataQuery) => void): Sorting => {
  const [sortBy, setSortBy] = useState<string>();
  const [sortDirection, setSortDirection] = useState<HttpSortDirection>();

  const handleSort = useCallback(
    (clickedColumn: string) => {
      if (!clickedColumn) return;
      if (sortBy !== clickedColumn) {
        setSortBy(clickedColumn);
        setSortDirection(HttpSortDirection.Ascending);
      } else {
        setSortDirection(
          sortDirection === HttpSortDirection.Descending ? HttpSortDirection.Ascending : HttpSortDirection.Descending,
        );
      }
    },
    [sortBy, sortDirection],
  );

  const getSortDirection = useCallback(
    (column: string) => {
      if (column && sortBy === column) return sortDirection === HttpSortDirection.Ascending ? 'ascending' : 'descending';
      return null;
    },
    [sortBy, sortDirection],
  );

  useEffect(() => {
    get({ sortBy, sortDirection });
  }, [get, sortBy, sortDirection]);

  return { handleSort, getSortDirection };
};

export default useSort;
