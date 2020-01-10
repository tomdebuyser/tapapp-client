import { useState, useCallback, useEffect } from 'react';
import { HttpSortDirection, HttpMetadataQuery } from '../_http/HttpMetadata';

type SemanticSortDirection = 'ascending' | 'descending';

export interface SortFunctions {
  handleSort: (column: string) => void;
  getSortDirection: (column: string) => SemanticSortDirection;
}

interface Response {
  sortBy?: string;
  sortDirection?: HttpSortDirection;
  sortFunctions: SortFunctions;
}

const useSort = (get: (query: HttpMetadataQuery) => void): Response => {
  const [sortBy, setSortBy] = useState<string>();
  const [sortDirection, setSortDirection] = useState<HttpSortDirection>();

  const handleSort = useCallback(
    (column: string) => {
      if (!column) return;
      if (sortBy !== column) {
        setSortBy(column);
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
    (column: string): SemanticSortDirection => {
      if (column && sortBy === column) return sortDirection === HttpSortDirection.Ascending ? 'ascending' : 'descending';
      return null;
    },
    [sortBy, sortDirection],
  );

  useEffect(() => {
    get({ sortBy, sortDirection });
  }, [get, sortBy, sortDirection]);

  return { sortBy, sortDirection, sortFunctions: { handleSort, getSortDirection } };
};

export default useSort;
