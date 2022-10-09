import { RefObject, useRef } from 'react';

export const useObserver = (ref: RefObject<Element>, canLoad: boolean, callback: { (): void }) => {
  let observer = null;

  const cb = function(entries: { isIntersecting: boolean; }[], observer: any) {
    if (entries[0].isIntersecting && canLoad) {
      callback();
    }
  };
  if (typeof window !== "undefined") {
    observer = new IntersectionObserver(cb);
    if (ref.current) {
      observer.observe(ref.current);
    }
  }
};
