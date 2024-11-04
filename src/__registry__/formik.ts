export const formikComponentRegistry = {
  "checkbox": {
    fileName: `checkbox-form-field.tsx`,
    componentName: `checkbox`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-checkbox";
import * as React from "react";
import { Checkbox } from "./checkbox";
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
  description,
  options = [],
  placeholder,
  ...props
}: Props) => (
  <FormField
    name={name!}
    render={({ field, form }) => (
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
                        form.setFieldValue(name!, option.value);
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
      description,
      dropzoneOptions = dropZoneConfig,
      ...props
    },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
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
              onValueChange={(value) => form.setFieldValue(name!, value)}
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
    sourceCode: `"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Formik,
  Form as FormikForm,
} from "formik";
import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormProps extends React.ComponentPropsWithoutRef<"form"> {
  initialValues: any;
  onSubmit: (values: any) => void;
  validationSchema?: any;
}

function Form({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  ...props
}: FormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <FormikForm {...props}>{children}</FormikForm>
    </Formik>
  );
}

const FormContext = React.createContext<{ name: string }>({ name: "" });

type FormFieldProps = {
  name: string;
  render: (field: FieldProps) => React.ReactNode;
};

function FormField({ name, render }: FormFieldProps) {
  return (
    <FormContext.Provider value={{ name }}>
      <Field name={name}>
        {(fieldProps: FieldProps) => render(fieldProps)}
      </Field>
    </FormContext.Provider>
  );
}

const useFormField = () => {
  const { name } = React.useContext(FormContext);
  return { name };
};

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { name } = useFormField();

  return <Label ref={ref} className={className} htmlFor={name} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { name } = useFormField();

  return <Slot ref={ref} id={name} {...props} />;
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { name } = useFormField();

  return (
    <p
      ref={ref}
      id={\`\${name}-description\`}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { name } = useFormField();

  return (
    <ErrorMessage name={name}>
      {(errorMessage) => (
        <p
          ref={ref}
          id={\`\${name}-message\`}
          className={cn("text-sm font-medium text-destructive", className)}
          {...props}
        >
          {errorMessage}
        </p>
      )}
    </ErrorMessage>
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};
`
  },
  "input": {
    fileName: `input-form-field.tsx`,
    componentName: `input`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as React from "react";
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
      description,
      ...props
    },
    ref
  ) => (
    <FormField
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
            <Input
              ref={ref}
              {...field}
              {...props}
              name={name}
              value={
                props.type === "file" ? field.value?.fileName : field.value
              }
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
      description,
      ...props
    },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <InputOTP
              {...props}
              {...field}
              maxLength={props.maxLength}
              onChange={(value) => form.setFieldValue(name!, value)}
              ref={ref}
            >
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
`
  },
  "password-input": {
    fileName: `password-input-form-field.tsx`,
    componentName: `password-input`,
    sourceCode: `
import { cn } from "@/lib/utils";
import * as React from "react";
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
      description,
      ...props
    },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <PasswordInput
              ref={ref}
              {...props}
              {...field}
              name={name}
              disabled={form.isSubmitting || props.disabled}
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
    <FormField
      name={name!}
      render={({ field, form }) => (
        <FormItem className={cn("w-full space-y-3", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <RadioGroup
              onValueChange={(value) => form.setFieldValue(name!, value)}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
              ref={ref}
              disabled={props.disabled}
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
      description,
      placeholder,
      options = [],
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        name={name!}
        render={({ field, form }) => (
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
                description,
                placeholder,
                options,
                disabled: props.disabled,
                ...props,
                ref,
              }}
              onValueChange={(value) => form.setFieldValue(name!, value)}
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
      description,
      ...props
    },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
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
              onValueChange={(vals) => form.setFieldValue(name!, vals[0])}
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

SliderFormField.displayName = "SliderFormField";

export { SliderFormField };
`
  },
  "smart-datetime-input": {
    fileName: `smart-datetime-input-form-field.tsx`,
    componentName: `smart-datetime-input`,
    sourceCode: `
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
    { containerClassName, labelClassName, name, label, description, ...props },
    ref
  ) => (
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

          <FormControl>
            <SmartDatetimeInput
              {...props}
              ref={ref}
              value={field.value}
              onValueChange={(value) => form.setFieldValue(name!, value)}
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
              disabled={props.disabled}
              checked={field.value}
              onCheckedChange={(value) => form.setFieldValue(name!, value)}
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
      description,
      ...props
    },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
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
              onValueChange={(value) => form.setFieldValue(name!, value)}
              placeholder={props.placeholder}
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
`
  },
  "tiptap-editor": {
    fileName: `tiptap-editor-form-field.tsx`,
    componentName: `tiptap-editor`,
    sourceCode: `
import { cn } from "@/lib/utils";
import { EditorContent, EditorContentProps } from "@tiptap/react";
import React from "react";
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
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
}

const TiptapEditorFormField = React.forwardRef<
  React.ElementRef<typeof EditorContent>,
  Props
>(
  (
    { containerClassName, labelClassName, name, label, description, ...props },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
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
                  form.setFieldValue(name, editor.getHTML());
                },
              }}
              editorContentProps={{
                ref,
                disabled: form.isSubmitting || props.disabled,
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
