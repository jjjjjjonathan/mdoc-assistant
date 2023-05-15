import copy from "copy-to-clipboard";
import { useState, useRef, useEffect, useCallback } from "react";

const useCopy = (
  text: string
): [boolean, () => void, (value: boolean) => void] => {
  const textToCopy = useRef(text);
  const [copied, setCopied] = useState(false);
  const copyAction = useCallback(() => {
    const copiedText = copy(textToCopy.current, { format: "text/plain" });
    setCopied(copiedText);
  }, [textToCopy]);

  useEffect(() => {
    textToCopy.current = text;
  }, [text]);

  return [copied, copyAction, setCopied];
};

export default useCopy;
