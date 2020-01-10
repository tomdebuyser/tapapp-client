import React, { useState, useEffect, FC } from 'react';
import { translations } from '../../_translations';
import { useDebounce } from '../../_hooks';
import InputField from '../inputField/InputField';
import { FillMetadataQueryFunction } from '../../_http/HttpMetadata';

interface Props {
  setQuery: FillMetadataQueryFunction;
}

const SearchInput: FC<Props> = ({ setQuery }) => {
  const [search, setSearch] = useState('');
  // const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setQuery({ search });
  }, [search]);

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
