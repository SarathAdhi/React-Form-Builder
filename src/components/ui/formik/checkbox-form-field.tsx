"use client";

import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-checkbox";
import * as React from "react";
import { Checkbox } from "../checkbox";
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
  description?: string;
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
      description,
      ...props
    },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
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
              disabled={props.disabled}
              checked={field.value}
              onCheckedChange={(value) => form.setFieldValue(name!, value)}
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

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
);

CheckboxFormField.displayName = "CheckboxFormField";

export { CheckboxFormField };
