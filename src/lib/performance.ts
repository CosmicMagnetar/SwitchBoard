"use client";

import * as React from "react";
import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Wraps a component with React.memo and displayName for DevTools.
 */
export function memoWithName<T extends object>(
  Component: React.ComponentType<T>,
  displayName: string
): React.ComponentType<T> {
  const Memoized = React.memo(Component);
  (Memoized as any).displayName = displayName;
  return Memoized as unknown as React.ComponentType<T>;
}

/**
 * IntersectionObserver hook for lazy-loading content below the fold.
 * Returns a ref and a boolean indicating if the element is visible.
 */
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    },
    []
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      ...options,
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [observerCallback, options]);

  return { ref, isVisible };
}
