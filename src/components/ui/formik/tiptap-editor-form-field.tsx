"use client";

import { cn } from "@/lib/utils";
import { EditorContent, EditorContentProps } from "@tiptap/react";
import React from "react";
import { TiptapEditor } from "../tiptap-editor";
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
