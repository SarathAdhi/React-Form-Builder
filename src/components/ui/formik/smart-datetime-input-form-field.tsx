"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { SmartDatetimeInput } from "../smart-datetime-input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Props {
  name: string;
  label?: string;
  containerClassName?: string;
  description?: string;
  labelClassName?: string;
  required?: boolean;
}

const SmartDateTimeFormField = React.forwardRef<
  HTMLInputElement,
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "ref" | "value" | "defaultValue" | "onBlur"
  > &
    Props
>(
  (
    { containerClassName, labelClassName, name, label, description, ...props },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
        <FormItem
          className={cn("w-full flex flex-col space-y-1", containerClassName)}
        >
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <SmartDatetimeInput
              {...props}
              ref={ref}
              value={field.value}
              onValueChange={(value) => form.setFieldValue(name!, value)}
              disabled={props.disabled}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
);

SmartDateTimeFormField.displayName = "SmartDateTimeFormField";

export { SmartDateTimeFormField };
