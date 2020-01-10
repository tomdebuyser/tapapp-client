import React, { useState, useEffect, FC } from 'react';
import { translations } from '../../_translations';
import { useDebounce } from '../../_hooks';
import InputField from '../inputField/InputField';
import { FillMetadataQueryFunction, HttpMetadataQuery } from '../../_http/HttpMetadata';

interface Props {
  query?: HttpMetadataQuery;
  setQuery: FillMetadataQueryFunction;
}

function shouldSearch(currentQuery: HttpMetadataQuery, searchString: string): boolean {
  if (currentQuery?.search === searchString) return false;
  if (!currentQuery?.search && !searchString) return false;
  return true;
}

const SearchInput: FC<Props> = ({ query, setQuery }) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (shouldSearch(query, debouncedSearch)) {
      setQuery({ search: debouncedSearch });
    }
  }, [debouncedSearch, query, setQuery]);

  return (
    <InputField
      className="search-field"
      icon="search"
      value={search}
      onChange={setSearch}
      placeholder={translations.getLabel('SEARCH_PLACEHOLDER')}
    />
  );
};

export default SearchInput;
