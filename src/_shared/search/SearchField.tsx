import React, { useState, useEffect, FC } from 'react';
import { translations } from '../../_translations';
import { useDebounce } from '../../_hooks';
import { FillMetadataQueryFunction, HttpMetadataQuery } from '../../_http';
import InputField from '../input/inputField/InputField';

interface Props {
  query?: HttpMetadataQuery;
  setQuery: FillMetadataQueryFunction;
}

function shouldSearch(currentQuery: HttpMetadataQuery, searchString: string): boolean {
  if (currentQuery?.search === searchString) return false;
  if (!currentQuery?.search && !searchString) return false;
  return true;
}

const SearchField: FC<Props> = ({ query, setQuery }) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (shouldSearch(query, debouncedSearch)) {
      setQuery({ search: debouncedSearch, skip: 0 });
    }
  }, [debouncedSearch, query, setQuery]);

  return (
    <InputField
      className="search-field"
      icon="search"
      name="search"
      onChange={setSearch}
      placeholder={translations.getLabel('SHARED.PLACEHOLDER.SEARCH')}
      value={search}
    />
  );
};

export default SearchField;
