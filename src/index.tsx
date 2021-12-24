import React, {
  useEffect, useRef, useState, ReactNode,
} from 'react';

export interface IInfiniti {
  className?: string;
  fetchMore: () => void;
  hasMore: boolean;
  loaderComp: ReactNode;
  children?: ReactNode;
}

const Infiniti = ({
  className,
  children,
  fetchMore,
  hasMore,
  loaderComp,
}: IInfiniti) => {
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
      <div className={className}>
        {children}
        {hasMore && <div ref={setElement}>{loaderComp}</div>}
      </div>
  );
};

Infiniti.defaultProps = {
  className: '',
};

export default Infiniti;