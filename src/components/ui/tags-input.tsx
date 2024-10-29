"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { KeyboardEvent, useCallback, useRef, useState } from "react";

const SPLITTER_REGEX = /[\n#?=&\t,./-]+/;
const FORMATTING_REGEX = /^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g;

type Direction = "ltr" | "rtl";

interface TagsInputProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "value" | "onValueChange"
  > {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  minItems?: number;
  dir?: Direction;
  disabled?: boolean;
}

const TagsInput = React.memo(
  React.forwardRef<HTMLDivElement, TagsInputProps>(
    (
      {
        value,
        onValueChange,
        placeholder = "Add tags...",
        maxItems = Infinity,
        minItems = 0,
        className,
        dir = "ltr",
        disabled,
        ...props
      },
      ref
    ) => {
      const [inputValue, setInputValue] = useState("");
      const [activeIndex, setActiveIndex] = useState(-1);
      const inputRef = useRef<HTMLInputElement>(null);

      const isAtMinLimit = value.length <= minItems;
      const isAtMaxLimit = value.length >= maxItems;

      const addTag = useCallback(
        (tag: string) => {
          const trimmedTag = tag.trim();
          if (trimmedTag && !value.includes(trimmedTag) && !isAtMaxLimit) {
            onValueChange([...value, trimmedTag]);
            setInputValue("");
          }
        },
        [value, onValueChange, isAtMaxLimit]
      );

      const removeTag = useCallback(
        (tagToRemove: string) => {
          if (!isAtMinLimit) {
            onValueChange(value.filter((tag) => tag !== tagToRemove));
          }
        },
        [value, onValueChange, isAtMinLimit]
      );

      const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
          e.preventDefault();
          const pastedTags = e.clipboardData
            .getData("text")
            .split(SPLITTER_REGEX)
            .map((tag) => tag.replaceAll(FORMATTING_REGEX, "").trim())
            .filter((tag) => tag && !value.includes(tag));

          const availableSlots = maxItems - value.length;
          const tagsToAdd = pastedTags.slice(0, availableSlots);

          if (tagsToAdd.length > 0) {
            onValueChange([...value, ...tagsToAdd]);
            setInputValue("");
          }
        },
        [value, onValueChange, maxItems]
      );

      const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
          const input = e.currentTarget;
          const isNavigationKey =
            e.key === "ArrowLeft" || e.key === "ArrowRight";
          const isDeleteKey = e.key === "Backspace" || e.key === "Delete";

          if (isNavigationKey && value.length > 0) {
            const isRTL = dir === "rtl";
            const isMovingLeft = e.key === "ArrowLeft";
            const shouldNavigate = input.selectionStart === 0;

            if (shouldNavigate) {
              const moveDirection = (isRTL ? !isMovingLeft : isMovingLeft)
                ? -1
                : 1;
              const newIndex =
                activeIndex === -1
                  ? value.length - 1
                  : Math.min(
                      Math.max(activeIndex + moveDirection, -1),
                      value.length - 1
                    );

              setActiveIndex(newIndex);
              e.preventDefault();
            }
          } else if (isDeleteKey) {
            if (activeIndex !== -1) {
              removeTag(value[activeIndex]);
              setActiveIndex((prev) => Math.max(-1, prev - 1));
              e.preventDefault();
            } else if (
              input.selectionStart === 0 &&
              !inputValue &&
              value.length > 0
            ) {
              removeTag(value[value.length - 1]);
            }
          } else if (e.key === "Enter" && inputValue) {
            addTag(inputValue);
            e.preventDefault();
          } else if (e.key === "Escape") {
            setActiveIndex(-1);
            input.blur();
          }
        },
        [value, inputValue, activeIndex, dir, addTag, removeTag]
      );

      return (
        <div
          ref={ref}
          dir={dir}
          className={cn(
            "flex items-center flex-wrap gap-1 p-1 rounded-md bg-background",
            "ring-1 ring-muted focus-within:ring-ring",
            "transition-colors duration-200",
            className
          )}
          {...props}
        >
          {value.map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              variant="secondary"
              className={cn(
                "flex items-center gap-1 truncate",
                "transition-all duration-200",
                activeIndex === index && "ring-2 ring-muted-foreground",
                isAtMinLimit && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="text-xs">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                disabled={isAtMinLimit}
                className="focus:outline-none disabled:cursor-not-allowed"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3 hover:stroke-destructive transition-colors" />
              </button>
            </Badge>
          ))}

          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onClick={() => setActiveIndex(-1)}
            disabled={isAtMaxLimit || disabled}
            placeholder={isAtMaxLimit ? "Tag limit reached" : placeholder}
            className={cn(
              "h-8 min-w-fit flex-1 border-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-muted-foreground px-1",
              activeIndex !== -1 && "caret-transparent",
              isAtMaxLimit && "cursor-not-allowed opacity-50"
            )}
            aria-label="Add tag"
          />
        </div>
      );
    }
  )
);

TagsInput.displayName = "TagsInput";

export { TagsInput };
