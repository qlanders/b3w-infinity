import React, {
  useEffect, useRef, useState, ReactNode,
} from 'react';

export interface IInfinity {
  className?: string
  fetchMore: () => void
  hasMore: boolean
  loaderComp: ReactNode
  wrapperElement?: 'div' | 'ul'
  children?: ReactNode
}

const Infinity = ({
  className,
  children,
  fetchMore,
  hasMore,
  loaderComp,
  wrapperElement = 'div',
}: IInfinity) => {
  const Wrapper = wrapperElement;
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  const loader = useRef(fetchMore);
  useEffect(() => {
    loader.current = fetchMore;
  }, [fetchMore]);

  const callback: IntersectionObserverCallback = (entries) => {
    const first = entries[0];
    if (first.isIntersecting) {
      loader.current();
    }
  };

  const observer = useRef(
      new IntersectionObserver(
          callback,
          { threshold: 0.5, rootMargin: '0px' },
      ),
  );

  useEffect(() => {
    const currentObserver = observer.current;

    if (element) {
      currentObserver.observe(element);
    }
    return () => {
      if (element) {
        currentObserver.unobserve(element);
      }
    };
  }, [element]);

  return (
    <Wrapper className={className}>
      {children}
      <div
        ref={setElement}
        style={{opacity: hasMore ? 1 : 0}}
      >
        {loaderComp}
      </div>
    </Wrapper>
  );
};

Infinity.defaultProps = {
  className: '',
  wrapperElement: 'div',
};

export default Infinity;
