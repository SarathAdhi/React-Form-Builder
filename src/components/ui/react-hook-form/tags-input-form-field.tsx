"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { TagsInput } from "../tags-input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Props extends React.InputHTMLAttributes<HTMLDivElement> {
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
  labelClassName?: string;
}

const TagsInputFormField = React.forwardRef<HTMLDivElement, Props>(
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
            <TagsInput
              ref={ref}
              value={field.value || []}
              onValueChange={field.onChange}
              placeholder={props.placeholder}
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

TagsInputFormField.displayName = "TagsInputFormField";

export { TagsInputFormField };
