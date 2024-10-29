"use client";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check, X as RemoveIcon } from "lucide-react";
import React, {
  KeyboardEvent,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

// Improved TypeScript types
export type MultiSelectorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
> & {
  values: string[];
  onValuesChange: (value: string[]) => void;
  loop?: boolean;
};

interface MultiSelectContextProps {
  value: string[];
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  inputRef: React.RefObject<HTMLInputElement>;
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider");
  }
  return context;
};

/**
 * Inspired from
 * MultiSelect Docs: {@link: https://shadcn-extension.vercel.app/docs/multi-select}
 */

const SelectionBadge = ({
  item,
  isActive,
  onRemove,
}: {
  item: string;
  isActive: boolean;
  onRemove: (value: string) => void;
}) => {
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleRemove = useCallback(() => {
    onRemove(item);
  }, [item, onRemove]);

  return (
    <Badge
      className={cn("space-x-1", isActive && "ring-2 ring-muted-foreground")}
      variant="secondary"
    >
      <span className="text-xs">{item}</span>
      <button
        aria-label={`Remove ${item} option`}
        type="button"
        onMouseDown={handleMouseDown}
        onClick={handleRemove}
      >
        <RemoveIcon className="h-4 w-4 hover:stroke-destructive" />
      </button>
    </Badge>
  );
};

SelectionBadge.displayName = "SelectionBadge";

const MultiSelector = ({
  values,
  onValuesChange,
  loop = false,
  className,
  children,
  dir,
  ...props
}: MultiSelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const onValueChange = useCallback(
    (val: string) => {
      onValuesChange(
        values.includes(val)
          ? values.filter((item) => item !== val)
          : [...values, val]
      );
    },
    [values, onValuesChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const target = inputRef.current;
      if (!target) return;

      const moveIndex = (delta: number) => {
        const nextIndex = activeIndex + delta;
        if (nextIndex < 0) {
          setActiveIndex(loop ? values.length - 1 : -1);
        } else if (nextIndex >= values.length) {
          setActiveIndex(loop ? 0 : -1);
        } else {
          setActiveIndex(nextIndex);
        }
      };

      switch (e.key) {
        case "ArrowLeft":
          if (
            (dir === "rtl" && (activeIndex !== -1 || loop)) ||
            (!dir && target.selectionStart === 0)
          ) {
            moveIndex(-1);
          }
          break;

        case "ArrowRight":
          if (
            (dir === "rtl" && target.selectionStart === 0) ||
            (!dir && (activeIndex !== -1 || loop))
          ) {
            moveIndex(1);
          }
          break;

        case "Backspace":
        case "Delete":
          if (values.length > 0 && target.selectionStart === 0) {
            if (activeIndex !== -1 && activeIndex < values.length) {
              onValueChange(values[activeIndex]);
              setActiveIndex(Math.max(-1, activeIndex - 1));
            } else {
              onValueChange(values[values.length - 1]);
            }
          }
          break;

        case "Enter":
          setOpen(true);
          break;

        case "Escape":
          if (activeIndex !== -1) {
            setActiveIndex(-1);
          } else if (open) {
            setOpen(false);
          }
          break;
      }
    },
    [values, activeIndex, loop, dir, open, onValueChange]
  );

  //ize context value
  const contextValue = useMemo(
    () => ({
      value: values,
      onValueChange,
      open,
      setOpen,
      inputValue,
      setInputValue,
      activeIndex,
      setActiveIndex,
      inputRef,
    }),
    [values, onValueChange, open, inputValue, activeIndex]
  );

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <Command
        onKeyDown={handleKeyDown}
        className={cn(
          "overflow-visible bg-transparent flex flex-col space-y-2",
          className
        )}
        dir={dir}
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorTrigger = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { value, onValueChange, activeIndex } = useMultiSelect();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap gap-1 p-2 ring-1 ring-muted rounded-lg bg-background",
        {
          "ring-1 focus-within:ring-ring": activeIndex === -1,
        },
        className
      )}
      {...props}
    >
      {value.map((item, index) => (
        <SelectionBadge
          key={item}
          item={item}
          isActive={activeIndex === index}
          onRemove={onValueChange}
        />
      ))}
      {children}
    </div>
  );
});

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const {
    setOpen,
    inputValue,
    setInputValue,
    activeIndex,
    setActiveIndex,
    inputRef,
  } = useMultiSelect();

  const handleFocus = useCallback(() => setOpen(true), [setOpen]);
  const handleBlur = useCallback(() => setOpen(false), [setOpen]);
  const handleClick = useCallback(() => setActiveIndex(-1), [setActiveIndex]);

  return (
    <CommandPrimitive.Input
      {...props}
      ref={ref || inputRef}
      value={inputValue}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onClick={handleClick}
      className={cn(
        "ml-2 bg-transparent outline-none placeholder:text-muted-foreground placeholder:text-sm flex-1",
        className,
        activeIndex !== -1 && "caret-transparent"
      )}
    />
  );
});

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  const { open } = useMultiSelect();

  return open ? (
    <div ref={ref} className="relative">
      {children}
    </div>
  ) : null;
});

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children }, ref) => (
  <CommandList
    ref={ref}
    className={cn(
      "p-2 flex flex-col gap-2 rounded-md scrollbar-thin scrollbar-track-transparent transition-colors scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg w-full absolute bg-background shadow-md z-10 border border-muted top-0",
      className
    )}
  >
    {children}
    <CommandEmpty>
      <span className="text-muted-foreground">No results found</span>
    </CommandEmpty>
  </CommandList>
));

MultiSelectorList.displayName = "MultiSelectorList";

const MultiSelectorItem = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  { value: string } & React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.Item
  >
>(({ className, value, children, ...props }, ref) => {
  const { value: options, onValueChange, setInputValue } = useMultiSelect();

  const handleSelect = useCallback(() => {
    onValueChange(value);
    setInputValue("");
  }, [value, onValueChange, setInputValue]);

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const isIncluded = options.includes(value);

  return (
    <CommandItem
      ref={ref}
      onSelect={handleSelect}
      onClick={() => alert("HELLO")}
      className={cn(
        "rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between",
        className,
        isIncluded && "opacity-50 cursor-default",
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
      onMouseDown={mousePreventDefault}
      {...props}
    >
      {children}
      {isIncluded && <Check className="h-4 w-4" />}
    </CommandItem>
  );
});

MultiSelectorItem.displayName = "MultiSelectorItem";

export {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
};
