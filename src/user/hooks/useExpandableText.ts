import { useLayoutEffect, useRef, useState } from 'react';

export const useExpandableText = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;

    const fullHeight = el.scrollHeight;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);

    const collapsedHeight = lineHeight * 3; // 3 строки

    setIsOverflowing(fullHeight > collapsedHeight);
    setMaxHeight(expanded ? fullHeight : collapsedHeight);
  }, [expanded]);

  const toggle = () => setExpanded(prev => !prev);

  return {
    textRef,
    maxHeight,
    expanded,
    isOverflowing,
    toggle,
  };
};
