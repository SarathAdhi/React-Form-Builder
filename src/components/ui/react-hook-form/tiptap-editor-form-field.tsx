"use client";

import { cn } from "@/lib/utils";
import { EditorContent, EditorContentProps } from "@tiptap/react";
import React from "react";
import { Control, FieldValues } from "react-hook-form";
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
