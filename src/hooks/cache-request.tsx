import { useCallback, useRef } from 'react'

interface CacheEntry<T> {
  data: Promise<T>
  expiry: number
}

export function useCachedRequest<T>(
  fetcher: (query: string) => Promise<T>,
  cacheTime: number = 5 * 60 * 1000 // 5 minutes default cache time
) {
  const cache = useRef<Record<string, CacheEntry<T>>>({})

  const cachedFetch = useCallback(
    async (query: string): Promise<T> => {
      const now = Date.now()
      const cacheKey = JSON.stringify(query)

      if (cache.current[cacheKey] && cache.current[cacheKey].expiry > now) {
        return cache.current[cacheKey].data
      }

      const data = fetcher(query);
      cache.current[cacheKey] = {
        data,
        expiry: now + cacheTime,
      }

      return data
    },
    [fetcher, cacheTime]
  )

  return cachedFetch
}

