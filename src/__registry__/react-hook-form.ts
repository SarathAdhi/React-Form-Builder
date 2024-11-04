export const reactHookFormComponentRegistry = {
  "checkbox": {
    fileName: `checkbox-form-field.tsx`,
    componentName: `checkbox`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-checkbox";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { Checkbox } from "./checkbox";
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
`
  },
  "combobox": {
    fileName: `combobox-form-field.tsx`,
    componentName: `combobox`,
    sourceCode: `
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Props {
  name?: string;
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
  labelClassName?: string;
  options?: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  placeholder?: string;
}

const ComboboxFormField = ({
  containerClassName,
  labelClassName,
  name,
  label,
  control,
  description,
  options = [],
  placeholder,
  ...props
}: Props) => (
  <FormField
    control={control}
    name={name!}
    render={({ field }) => (
      <FormItem
        className={cn("w-full flex flex-col space-y-2", containerClassName)}
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
                variant="outline"
                role="combobox"
                className={cn(
                  "justify-between",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? options.find((option) => option.value === field.value)
                      ?.label
                  : placeholder || "Select options"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>

          <PopoverContent className="!w-full p-0">
            <Command className="w-full">
              <CommandInput placeholder={placeholder || "Search options..."} />
              <CommandList>
                <CommandEmpty>No result found.</CommandEmpty>

                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        field.onChange(option.value);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          option.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {description && <FormDescription>{description}</FormDescription>}

        <FormMessage />
      </FormItem>
    )}
  />
);

ComboboxFormField.displayName = "ComboboxFormField";

export { ComboboxFormField };
`
  },
  "date-picker": {
    fileName: `date-picker-form-field.tsx`,
    componentName: `date-picker`,
    sourceCode: `
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, FieldValues } from "react-hook-form";

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
  control?: Control<FieldValues>;
  labelClassName?: string;
  required?: boolean;
}

const DatePickerFormField = ({
  containerClassName,
  labelClassName,
  name,
  label,
  control,
  description,
  ...props
}: Props) => (
  <FormField
    control={control}
    name={name!}
    render={({ field }) => (
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
              onSelect={field.onChange}
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
`
  },
  "file-upload": {
    fileName: `file-upload-form-field.tsx`,
    componentName: `file-upload`,
    sourceCode: `
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";
import { CloudUploadIcon, PaperclipIcon } from "lucide-react";
import * as React from "react";
import { DropzoneOptions } from "react-dropzone";
import { Control, FieldValues } from "react-hook-form";
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
  dropzoneOptions?: DropzoneOptions;
}

const dropZoneConfig = {
  maxFiles: 5,
  maxSize: 1024 * 1024 * 4,
  multiple: true,
};

const FileUploadFormField = React.forwardRef<
  HTMLDivElement,
  Props & React.HTMLAttributes<HTMLDivElement>
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
      dropzoneOptions = dropZoneConfig,
      ...props
    },
    ref
  ) => (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <FileUploader
              ref={ref}
              value={field.value}
              onValueChange={field.onChange}
              dropzoneOptions={dropZoneConfig}
              className="relative bg-background rounded-lg p-2"
            >
              <FileInput
                id="fileInput"
                className="outline-dashed outline-1 outline-slate-500"
              >
                <div className="flex items-center justify-center flex-col p-8 w-full ">
                  <CloudUploadIcon className="text-gray-500 w-10 h-10" />

                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                    &nbsp; or drag and drop
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </FileInput>

              <FileUploaderContent>
                {field.value &&
                  field.value.length > 0 &&
                  (field.value as any[]).map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <PaperclipIcon className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  )
);

FileUploadFormField.displayName = "FileUploadFormField";

export { FileUploadFormField };
`
  },
  "form.tsx": {
    fileName: `form.tsx`,
    componentName: `form.tsx`,
    sourceCode: `"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: \`\${id}-form-item\`,
    formDescriptionId: \`\${id}-form-item-description\`,
    formMessageId: \`\${id}-form-item-message\`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? \`\${formDescriptionId}\`
          : \`\${formDescriptionId} \${formMessageId}\`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
`
  },
  "input": {
    fileName: `input-form-field.tsx`,
    componentName: `input`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "./input";
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
`
  },
  "input-otp": {
    fileName: `input-otp-form-field.tsx`,
    componentName: `input-otp`,
    sourceCode: `
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
  labelClassName?: string;
  maxLength: number;
}

const InputOtpFormField = React.forwardRef<HTMLInputElement, Props>(
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
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <InputOTP maxLength={props.maxLength} {...field} ref={ref}>
              <InputOTPGroup>
                {Array.from({ length: props.maxLength }, (_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
);

InputOtpFormField.displayName = "InputOtpFormField";

export { InputOtpFormField };
`
  },
  "multi-select": {
    fileName: `multi-select-form-field.tsx`,
    componentName: `multi-select`,
    sourceCode: `
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
import { Control, FieldValues, Path, PathValue } from "react-hook-form";
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
  control?: Control<TFieldValues>;
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
  control,
  description,
  placeholder,
  options = [],
  ...props
}: MultiSelectFormFieldProps<FieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
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
                field.onChange(
                  values as PathValue<FieldValues, Path<FieldValues>>
                );
              }}
            >
              <MultiSelectorTrigger className={className}>
                <MultiSelectorInput
                  disabled={formState.isSubmitting || props.disabled}
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
`
  },
  "password-input": {
    fileName: `password-input-form-field.tsx`,
    componentName: `password-input`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { PasswordInput } from "./password-input";
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
  control?: Control<FieldValues>;
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
            <PasswordInput
              {...field}
              ref={ref}
              {...props}
              name={name}
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

PasswordInputFormField.displayName = "PasswordInputFormField";

export { PasswordInputFormField };
`
  },
  "radio-group": {
    fileName: `radio-group-form-field.tsx`,
    componentName: `radio-group`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-radio-group";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./radio-group";
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
  control?: Control<FieldValues>;
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
      control,
      description,
      options = [],
      ...props
    },
    ref
  ) => (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-3", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
              ref={ref}
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
    />
  )
);

RadioGroupFormField.displayName = "RadioGroupFormField";

export { RadioGroupFormField };
`
  },
  "select": {
    fileName: `select-form-field.tsx`,
    componentName: `select`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
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
  labelClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
}

const SelectFormField = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & Props
>(
  (
    {
      containerClassName,
      labelClassName,
      name,
      label,
      control,
      description,
      placeholder,
      options = [],
      ...props
    },
    ref
  ) => {
    return (
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

            <Select
              {...{
                name,
                label,
                control,
                description,
                placeholder,
                options,
                disabled: formState.isSubmitting || props.disabled,
                ...props,
                ref,
              }}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue ref={ref} placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {options.map(({ label, value }) => (
                  <SelectItem key={value} {...{ value }}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

SelectFormField.displayName = "SelectFormField";

export { SelectFormField };
`
  },
  "slider": {
    fileName: `slider-form-field.tsx`,
    componentName: `slider`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { Slider } from "./slider";
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
  control?: Control<FieldValues>;
  labelClassName?: string;
  required?: boolean;
}

const SliderFormField = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & Props
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
        <FormItem className={cn("w-full space-y-2", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <Slider
              ref={ref}
              {...props}
              defaultValue={[props.defaultValue || field.value]}
              onValueChange={(vals) => field.onChange(vals[0])}
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

SliderFormField.displayName = "SliderFormField";

export { SliderFormField };
`
  },
  "smart-datetime-input": {
    fileName: `smart-datetime-input-form-field.tsx`,
    componentName: `smart-datetime-input`,
    sourceCode: `
import { Control, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";
import React from "react";
import { SmartDatetimeInput } from "./smart-datetime-input";
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
  control?: Control<FieldValues>;
  labelClassName?: string;
  required?: boolean;
}

const SmartDateTimeFormField = React.forwardRef<
  HTMLInputElement,
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "ref" | "value" | "defaultValue" | "onBlur"
  > &
    Props
>(
  (
    {
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
          className={cn("w-full flex flex-col space-y-1", containerClassName)}
        >
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <SmartDatetimeInput
              {...props}
              ref={ref}
              value={field.value}
              onValueChange={field.onChange}
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

SmartDateTimeFormField.displayName = "SmartDateTimeFormField";

export { SmartDateTimeFormField };
`
  },
  "switch": {
    fileName: `switch-form-field.tsx`,
    componentName: `switch`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { Switch } from "./switch";
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
`
  },
  "tags-input": {
    fileName: `tags-input-form-field.tsx`,
    componentName: `tags-input`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { TagsInput } from "./tags-input";
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
`
  },
  "textarea": {
    fileName: `textarea-form-field.tsx`,
    componentName: `textarea`,
    sourceCode: `"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import { Textarea } from "./textarea";
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
  control?: Control<FieldValues>;
}

const TextareaFormField = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
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
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
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

TextareaFormField.displayName = "TextareaFormField";

export { TextareaFormField };
`
  },
  "tiptap-editor": {
    fileName: `tiptap-editor-form-field.tsx`,
    componentName: `tiptap-editor`,
    sourceCode: `
import { cn } from "@/lib/utils";
import { EditorContent, EditorContentProps } from "@tiptap/react";
import React from "react";
import { Control, FieldValues } from "react-hook-form";
import { TiptapEditor } from "./tiptap-editor";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Props extends Omit<EditorContentProps, "editor"> {
  name: string;
  label?: string;
  containerClassName?: string;
  description?: string;
  control?: Control<FieldValues>;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
}

const TiptapEditorFormField = React.forwardRef<
  React.ElementRef<typeof EditorContent>,
  Props
>(
  (
    {
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
            <TiptapEditor
              editorProps={{
                content: field.value,
                onUpdate: ({ editor }) => {
                  field.onChange(editor.getHTML());
                },
              }}
              editorContentProps={{
                ref,
                disabled: formState.isSubmitting || props.disabled,
              }}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  )
);

TiptapEditorFormField.displayName = "TiptapEditorFormField";

export { TiptapEditorFormField };
`
  },
};
