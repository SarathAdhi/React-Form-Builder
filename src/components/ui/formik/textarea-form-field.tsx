"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Textarea } from "../textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
  description?: string;
}

const TextareaFormField = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, containerClassName, name, label, description, ...props },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <Textarea
              {...field}
              ref={ref}
              {...props}
              name={name}
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

TextareaFormField.displayName = "TextareaFormField";

export { TextareaFormField };
