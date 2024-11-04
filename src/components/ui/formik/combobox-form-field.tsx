"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Props {
  name?: string;
  label?: string;
  containerClassName?: string;
  description?: string;
  labelClassName?: string;
  options?: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  placeholder?: string;
}

const ComboboxFormField = ({
  containerClassName,
  labelClassName,
  name,
  label,
  description,
  options = [],
  placeholder,
  ...props
}: Props) => (
  <FormField
    name={name!}
    render={({ field, form }) => (
      <FormItem
        className={cn("w-full flex flex-col space-y-2", containerClassName)}
      >
        {label && (
          <FormLabel htmlFor={name} className={labelClassName}>
            {label}{" "}
            {props?.required && <span className="text-destructive">*</span>}
          </FormLabel>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "justify-between",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? options.find((option) => option.value === field.value)
                      ?.label
                  : placeholder || "Select options"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>

          <PopoverContent className="!w-full p-0">
            <Command className="w-full">
              <CommandInput placeholder={placeholder || "Search options..."} />
              <CommandList>
                <CommandEmpty>No result found.</CommandEmpty>

                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        form.setFieldValue(name!, option.value);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          option.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {description && <FormDescription>{description}</FormDescription>}

        <FormMessage />
      </FormItem>
    )}
  />
);

ComboboxFormField.displayName = "ComboboxFormField";

export { ComboboxFormField };
