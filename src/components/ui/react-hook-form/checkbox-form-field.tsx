"use client";

import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-checkbox";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { Checkbox } from "../checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./form";

interface Props {
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
  labelClassName?: string;
}

const CheckboxFormField = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & Props
>(
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
        <FormItem
          className={cn(
            "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
            containerClassName
          )}
        >
          <FormControl>
            <Checkbox
              {...field}
              ref={ref}
              {...props}
              id={name}
              name={name}
              disabled={formState.isSubmitting || props.disabled}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <div className="space-y-1 leading-none">
            {label && (
              <FormLabel htmlFor={name} className={labelClassName}>
                {label}{" "}
                {props?.required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  )
);

CheckboxFormField.displayName = "CheckboxFormField";

export { CheckboxFormField };
