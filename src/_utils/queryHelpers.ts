import { HttpMetadataQuery } from '../_http/HttpMetadata';

export const getQueryParams = (query?: HttpMetadataQuery): string => {
  return query
    ? Object.keys(query).reduce(
        (queryParams, key) => (query[key] ? `${queryParams.length ? '&' : '?'}${key}=${query[key]}` : queryParams),
        '',
      )
    : '';
};
