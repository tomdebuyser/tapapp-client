import { useEffect, useLayoutEffect } from 'react';
import { HttpMetadataPagingResponse } from '../_http';

const SCROLL_OFFSET = 150;

const useInfiniteScroll = (fetchData: (skip: number) => void, metadata: HttpMetadataPagingResponse, isLoading: boolean): void => {
  function shouldFetchData(): boolean {
    const hasNoMoreDataToFetch = metadata?.skip === metadata?.totalCount;
    const hasScrolled = window.scrollY !== 0;
    const hasScrollableWindow = window.innerHeight !== document.documentElement.scrollHeight;
    const hasAlmostReachedEndOfPage =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - SCROLL_OFFSET;

    if (isLoading) return false;
    if (metadata && hasNoMoreDataToFetch) return false;
    // Check to fetch more data for when pages are too large and user cannot reach scroll trigger
    if (!hasScrolled && !hasScrollableWindow) return true;
    return hasAlmostReachedEndOfPage;
  }

  function fetchMoreData(): void {
    if (shouldFetchData()) {
      const newOffset = (metadata?.skip || 0) + (metadata?.count || 0);
      fetchData(newOffset);
    }
  }

  // Needed for initial extra load(s) (can be invoked multiple times untill the page is scrollable)
  useEffect(() => {
    fetchMoreData();
  }, [isLoading, metadata]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', fetchMoreData);
    return () => window.removeEventListener('scroll', fetchMoreData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, metadata]);
};

export default useInfiniteScroll;
