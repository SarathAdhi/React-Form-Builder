"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { PasswordInput } from "../password-input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface PasswordInputFormField
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  description?: string;
  labelClassName?: string;
}

const PasswordInputFormField = React.forwardRef<
  HTMLInputElement,
  PasswordInputFormField
>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      name,
      label,
      description,
      ...props
    },
    ref
  ) => (
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

          <FormControl>
            <PasswordInput
              ref={ref}
              {...props}
              {...field}
              name={name}
              disabled={form.isSubmitting || props.disabled}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  )
);

PasswordInputFormField.displayName = "PasswordInputFormField";

export { PasswordInputFormField };
