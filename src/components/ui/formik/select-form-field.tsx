"use client";

import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Props {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  description?: string;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
}

const SelectFormField = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & Props
>(
  (
    {
      containerClassName,
      labelClassName,
      name,
      label,
      description,
      placeholder,
      options = [],
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        name={name!}
        render={({ field, form }) => (
          <FormItem className={cn("w-full space-y-1", containerClassName)}>
            {label && (
              <FormLabel htmlFor={name} className={labelClassName}>
                {label}{" "}
                {props?.required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            <Select
              {...{
                name,
                label,
                description,
                placeholder,
                options,
                disabled: props.disabled,
                ...props,
                ref,
              }}
              onValueChange={(value) => form.setFieldValue(name!, value)}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue ref={ref} placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {options.map(({ label, value }) => (
                  <SelectItem key={value} {...{ value }}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

SelectFormField.displayName = "SelectFormField";

export { SelectFormField };
