import { useState, useCallback } from 'react';
import { HttpSortDirection } from '../_http/HttpMetadata';

const useSort = (): [string, HttpSortDirection, (clickedColumn: string) => void] => {
  const [sortBy, setSortBy] = useState();
  const [sortDirection, setSortDirection] = useState();

  const handleSort = useCallback(
    (clickedColumn: string) => {
      if (sortBy !== clickedColumn) {
        setSortBy(clickedColumn);
        setSortDirection('ASC');
      } else {
        setSortDirection(sortDirection === 'DESC' ? 'ASC' : 'DESC');
      }
    },
    [sortBy, sortDirection],
  );

  return [sortBy, sortDirection, handleSort];
};

export default useSort;
