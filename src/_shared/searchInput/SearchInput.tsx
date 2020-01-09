import React, { useState, useEffect, FC } from 'react';
import { translations } from '../../_translations';
import { useDebounce } from '../../_hooks';
import InputField from '../inputField/InputField';
import { HttpMetadataQuery } from '../../_http/HttpMetadata';

interface Props {
  get: (query: HttpMetadataQuery) => void;
}

const SearchInput: FC<Props> = ({ get }) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    get({ search: debouncedSearch });
  }, [debouncedSearch, get]);

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
