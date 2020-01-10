import { useLayoutEffect, useState, useCallback } from 'react';
import { HttpMetadataPagingResponse } from '../_http/HttpMetadata';

const SCROLL_OFFSET = 150;

interface Response {
  resetOffset: () => void;
}

const useInfiniteScroll = (
  fetchData: (offset: number) => void,
  metadata: HttpMetadataPagingResponse,
  isLoading: boolean,
  element?: HTMLElement,
): Response => {
  const [offset, setOffset] = useState<number>(metadata?.count || 0);

  const didFetchTotal = useCallback((): boolean => {
    return metadata && (offset >= metadata.totalCount || metadata.count + offset >= metadata.totalCount);
  }, [metadata, offset]);

  const startFetchData = useCallback(() => {
    const newOffset = offset + (metadata?.count || 0);
    setOffset(newOffset);
    fetchData(newOffset);
  }, [fetchData, metadata, offset]);

  const shouldFetchData = useCallback((): boolean => {
    if (isLoading) return false;
    if (didFetchTotal()) return false;
    if (element) {
      return element.scrollTop + element.getBoundingClientRect().height >= element.scrollHeight - SCROLL_OFFSET;
    }
    return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - SCROLL_OFFSET;
  }, [didFetchTotal, element, isLoading]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (shouldFetchData()) {
        startFetchData();
      }
    };
    (element || window).addEventListener('scroll', handleScroll);
    return () => (element || window).removeEventListener('scroll', handleScroll);
  }, [element, isLoading, metadata, offset, shouldFetchData, startFetchData]);

  return {
    resetOffset: () => setOffset(0),
  };
};

export default useInfiniteScroll;
