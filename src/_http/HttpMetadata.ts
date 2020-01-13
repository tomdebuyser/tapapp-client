export interface HttpMetadataPagingResponse {
  count: number;
  totalCount: number;
  skip: number;
}

export enum HttpSortDirection {
  Ascending = 'ASC',
  Descending = 'DESC',
}

export interface HttpPagedResponse<T> {
  data: T[];
  meta: HttpMetadataPagingResponse;
}

export interface HttpMetadataQuery {
  take?: number;
  skip?: number;
  search?: string;
  sortDirection?: HttpSortDirection;
  sortBy?: string;
}

export type FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => void;
