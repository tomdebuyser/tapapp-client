export interface HttpMetadataPagingResponse {
  count: number;
  totalCount: number;
  offset: number;
}

export enum HttpSortDirection {
  Ascending = 'ASC',
  Descending = 'DESC',
}

export interface HttpPagedResponse<T> {
  data: T[];
  meta: HttpMetadataPagingResponse;
}
