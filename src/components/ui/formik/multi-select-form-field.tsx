"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorProps,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { FieldValues, Path, PathValue } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectFormFieldProps<TFieldValues extends FieldValues>
  extends Omit<MultiSelectorProps, "values" | "onValuesChange"> {
  name: Path<TFieldValues>;
  label?: string;
  containerClassName?: string;
  description?: string;
  labelClassName?: string;
  required?: boolean;
  placeholder?: string;
  options?: Option[];
  disabled?: boolean;
}

const MultiSelectFormField = ({
  className,
  containerClassName,
  labelClassName,
  name,
  label,
  description,
  placeholder,
  options = [],
  ...props
}: MultiSelectFormFieldProps<FieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field, form }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel className={labelClassName}>
              {label}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <MultiSelector
              loop={false}
              {...props}
              values={(field.value || []) as string[]}
              onValuesChange={(values) => {
                form.setFieldValue(
                  name,
                  values as PathValue<FieldValues, Path<FieldValues>>
                );
              }}
            >
              <MultiSelectorTrigger className={className}>
                <MultiSelectorInput
                  disabled={props.disabled}
                  placeholder={placeholder}
                />
              </MultiSelectorTrigger>

              <MultiSelectorContent>
                <MultiSelectorList>
                  {options.map((option) => (
                    <MultiSelectorItem key={option.value} value={option.value}>
                      {option.label}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { MultiSelectFormField, type MultiSelectFormFieldProps };
