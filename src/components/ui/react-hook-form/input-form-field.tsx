"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "../input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
  labelClassName?: string;
}

const InputFormField = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      name,
      label,
      control,
      description,
      ...props
    },
    ref
  ) => (
    <FormField
      control={control}
      name={name!}
      render={({ field, formState }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <Input
              {...field}
              ref={ref}
              {...props}
              name={name}
              value={
                props.type === "file" ? field.value?.fileName : field.value
              }
              onChange={(e) =>
                props.type === "file"
                  ? field.onChange(e.target.files?.[0])
                  : field.onChange(e.target.value)
              }
              disabled={formState.isSubmitting || props.disabled}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  )
);

InputFormField.displayName = "InputFormField";

export { InputFormField };
