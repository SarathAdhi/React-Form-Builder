"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  code: string;
  codeContainerClassName?: string;
};

function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

const CodeHighlighter = ({ code, codeContainerClassName }: Props) => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [hasCopied]);

  const formattedCode = code;

  return (
    <div className="relative">
      <Button
        variant="secondary"
        className="z-40 absolute top-2 right-2 size-6 p-1.5"
        onClick={() => {
          copyToClipboard(code);
          setHasCopied(true);
        }}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? (
          <CheckIcon className="size-5" />
        ) : (
          <CopyIcon className="size-5" />
        )}
      </Button>

      <Highlight code={formattedCode} language="tsx" theme={themes.oneDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
          <pre
            className={cn(
              "p-4 text-sm rounded-lg h-full md:max-h-[80vh] overflow-auto",
              className,
              codeContainerClassName
            )}
            style={style}
          >
            {tokens.map((line: any, i: number) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token: any, key: any) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeHighlighter;
