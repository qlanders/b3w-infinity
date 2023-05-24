import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  createElement,
  CSSProperties,
} from 'react';

export interface IInfinity {
  className?: string
  fetchMore: () => void
  hasMore: boolean
  loaderComp: ReactNode
  loaderStyles?: CSSProperties
  wrapperElement?: 'div' | 'ul'
  children?: ReactNode
}

const Infinity = ({
  className,
  children,
  fetchMore,
  hasMore,
  loaderComp,
  loaderStyles,
  wrapperElement = 'div',
}: IInfinity) => {
  const loader = useRef(fetchMore);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

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

  return createElement(
    wrapperElement,
    { className },
    children,
    createElement(
      wrapperElement === 'div' ? 'div' : 'li',
      { ref: setElement, style: { ...loaderStyles, opacity: hasMore ? 1 : 0 } },
      loaderComp
    ),
  );
};

Infinity.defaultProps = {
  className: '',
  loaderStyles: {},
  wrapperElement: 'div',
};

export default Infinity;
