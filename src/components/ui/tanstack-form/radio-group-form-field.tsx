"use client";

import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-radio-group";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import {
  FormControl,
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
  options?: {
    label: string;
    value: string;
  }[];
}

const RadioGroupFormField = React.forwardRef<
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
      options = [],
      ...props
    },
    ref
  ) => (
    <FormField name={name!}>
      {(field) => (
        <FormItem className={cn("w-full space-y-3", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <RadioGroup
              onValueChange={field.handleChange}
              defaultValue={field.state.value}
              className="flex flex-col space-y-1"
              ref={ref}
              disabled={props.disabled || field.form.state.isSubmitting}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>

                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    </FormField>
  )
);

RadioGroupFormField.displayName = "RadioGroupFormField";

export { RadioGroupFormField };
