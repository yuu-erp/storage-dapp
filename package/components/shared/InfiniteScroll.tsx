import React, { PropsWithChildren, ReactNode, useEffect, useRef } from 'react'

export interface InfiniteScrollProps extends PropsWithChildren {
  loader?: ReactNode
  fetchMore: (page: number) => void
  hasMore: boolean
  endMessage?: ReactNode
  className?: string
  dataLangth: number
  noDataMessage?: ReactNode
}
const InfiniteScroll = React.forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (props, ref) => {
    const {
      loader,
      fetchMore,
      hasMore,
      endMessage,
      className,
      dataLangth,
      noDataMessage
    } = props

    const pageEndRef = useRef(null)
    const paginationRef = React.useRef<number>(1)
    useEffect(() => {
      if (hasMore) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            paginationRef.current += 1
            fetchMore(paginationRef.current)
          }
        })

        if (pageEndRef.current) {
          console.log('test case 1')
          observer.observe(pageEndRef.current)
        }

        return () => {
          if (pageEndRef.current) {
            console.log('test case 2')

            observer.unobserve(pageEndRef.current)
          }
        }
      }
    }, [hasMore])
    return (
      <React.Fragment>
        <div className={className} ref={ref}>
          {props.children}

          {hasMore ? (
            <div ref={pageEndRef}>{loader}</div>
          ) : dataLangth === 0 ? (
            noDataMessage
          ) : (
            endMessage
          )}
        </div>
      </React.Fragment>
    )
  }
)

InfiniteScroll.displayName = 'InfiniteScroll'
export default React.memo(InfiniteScroll)
