"use client";

import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { Switch } from "../switch";
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

const SwitchFormField = React.forwardRef<
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
            "flex flex-row items-center justify-between rounded-lg border p-4",
            containerClassName
          )}
        >
          <div className="space-y-0.5">
            {label && (
              <FormLabel htmlFor={name} className={labelClassName}>
                {label}{" "}
                {props?.required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            {description && <FormDescription>{description}</FormDescription>}
          </div>

          <FormControl>
            <Switch
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
        </FormItem>
      )}
    />
  )
);

SwitchFormField.displayName = "SwitchFormField";

export { SwitchFormField };
