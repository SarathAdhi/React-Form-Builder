import { z } from "zod";

export const formFieldTypes = z.enum([
  "input",
  "password-input",
  "textarea",
  "select",
  "switch",
  "checkbox",
  "date-picker",
  "radio-group",
  "combobox",
  "input-otp",
  "slider",
  "file-upload",
  "multi-select",
  "tags-input",
  "tiptap-editor",
]);

export const formFieldOptions = z
  .array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  )
  .optional();

export const formFieldSchema = z.object({
  id: z.string(),
  fieldType: formFieldTypes,
  fieldLabel: z.string(),
  name: z.string(),
  label: z.string(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  type: z.string().optional(),
  options: formFieldOptions,
  required: z.boolean().optional(),
  disabled: z.boolean().optional(),
  maxLength: z.number().optional(),
});

export const formBuilderSchema = z.object({
  fields: z.array(formFieldSchema),
  selectedFormFieldIndex: z.number().optional(),
});

export type FormFieldTypesType = z.infer<typeof formFieldTypes>;
export type FormFieldOptionsType = z.infer<typeof formFieldOptions>;
export type FormFieldSchemaType = z.infer<typeof formFieldSchema>;
export type FormBuilderSchemaType = z.infer<typeof formBuilderSchema>;
