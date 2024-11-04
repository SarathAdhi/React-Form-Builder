"use client";

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
      id={`${name}-description`}
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
          id={`${name}-message`}
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
