"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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

const DatePickerFormField = ({
  containerClassName,
  labelClassName,
  name,
  label,
  description,
  ...props
}: Props) => (
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

        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(value) => form.setFieldValue(name, value)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);

DatePickerFormField.displayName = "DatePickerFormField";

export { DatePickerFormField };
