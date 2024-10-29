import { CheckboxFormField } from "@/components/ui/react-hook-form/checkbox-form-field";
import { ComboboxFormField } from "@/components/ui/react-hook-form/combobox-form-field";
import { DatePickerFormField } from "@/components/ui/react-hook-form/date-picker-form-field";
import { FileUploadFormField } from "@/components/ui/react-hook-form/file-upload-form-field";
import { InputFormField } from "@/components/ui/react-hook-form/input-form-field";
import { InputOtpFormField } from "@/components/ui/react-hook-form/input-otp-form-field";
import { MultiSelectFormField } from "@/components/ui/react-hook-form/multi-select-form-field";
import { PasswordInputFormField } from "@/components/ui/react-hook-form/password-input-form-field";
import { RadioGroupFormField } from "@/components/ui/react-hook-form/radio-group-form-field";
import { SelectFormField } from "@/components/ui/react-hook-form/select-form-field";
import { SliderFormField } from "@/components/ui/react-hook-form/slider-form-field";
import { SwitchFormField } from "@/components/ui/react-hook-form/switch-form-field";
import { TagsInputFormField } from "@/components/ui/react-hook-form/tags-input-form-field";
import { TextareaFormField } from "@/components/ui/react-hook-form/textarea-form-field";
import { TiptapEditorFormField } from "@/components/ui/react-hook-form/tiptap-editor-form-field";
import { filterObjectKeys } from "@/utils/filter-object-keys";
import {
  FormFieldOptionsType,
  FormFieldSchemaType,
  FormFieldTypesType,
} from "@/zod/form-builder-schema";
import { HTMLInputTypeAttribute } from "react";

function filterProps(field: FormFieldSchemaType) {
  return filterObjectKeys(field, ["fieldType", "fieldLabel", "type"]);
}

type DefaultFormFieldConfig = Record<
  FormFieldTypesType,
  {
    fieldLabel: string;
    label: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    type?: HTMLInputTypeAttribute;
    options?: FormFieldOptionsType;
    maxLength?: number;
    component: (props: FormFieldSchemaType) => JSX.Element;
  }
>;

export const defaultFormFieldConfig: DefaultFormFieldConfig = {
  input: {
    fieldLabel: "Input",
    label: "Username",
    description: "Enter your username.",
    placeholder: "Sarath",
    type: "text",
    component: (props: FormFieldSchemaType) => (
      <InputFormField {...filterProps(props)} type={props.type} />
    ),
  },
  "password-input": {
    fieldLabel: "Password Input",
    label: "Password",
    description: "Enter your password.",
    placeholder: "********",
    component: (props: FormFieldSchemaType) => (
      <PasswordInputFormField {...filterProps(props)} />
    ),
  },
  select: {
    fieldLabel: "Select",
    label: "Role",
    description: "Select a role from the list.",
    placeholder: "Select a role",
    defaultValue: "frontend-developer",
    options: [
      { label: "Frontend Developer", value: "frontend-developer" },
      { label: "Backend Developer", value: "backend-developer" },
    ],
    component: (props: FormFieldSchemaType) => (
      <SelectFormField {...filterProps(props)} />
    ),
  },
  textarea: {
    fieldLabel: "Textarea",
    label: "Bio",
    description: "Enter a short bio about yourself.",
    placeholder: "I am a frontend developer.",
    component: (props: FormFieldSchemaType) => (
      <TextareaFormField {...filterProps(props)} />
    ),
  },
  switch: {
    fieldLabel: "Switch",
    label: "Security emails",
    description: "Receive emails about your account security.",
    component: (props: FormFieldSchemaType) => (
      <SwitchFormField {...filterProps(props)} />
    ),
  },
  checkbox: {
    fieldLabel: "Checkbox",
    label: "Terms and conditions",
    description: "Accept the terms and conditions.",
    component: (props: FormFieldSchemaType) => (
      <CheckboxFormField {...filterProps(props)} />
    ),
  },
  "date-picker": {
    fieldLabel: "Date Picker",
    label: "Date of birth",
    description: "Select your date of birth.",
    component: (props: FormFieldSchemaType) => (
      <DatePickerFormField {...filterProps(props)} />
    ),
  },
  "radio-group": {
    fieldLabel: "Radio Group",
    label: "Notify me about...",
    options: [
      { label: "New products", value: "new-products" },
      { label: "Promotions", value: "promotions" },
    ],
    component: (props: FormFieldSchemaType) => (
      <RadioGroupFormField {...filterProps(props)} />
    ),
  },
  combobox: {
    fieldLabel: "Combobox",
    label: "Select a framework",
    placeholder: "Select a framework",
    options: [
      {
        value: "next.js",
        label: "Next.js",
      },
      {
        value: "sveltekit",
        label: "SvelteKit",
      },
      {
        value: "nuxt.js",
        label: "Nuxt.js",
      },
      {
        value: "remix",
        label: "Remix",
      },
      {
        value: "astro",
        label: "Astro",
      },
    ],
    component: (props: FormFieldSchemaType) => (
      <ComboboxFormField {...filterProps(props)} />
    ),
  },
  "input-otp": {
    fieldLabel: "Input OTP",
    label: "Enter OTP",
    description: "Enter the OTP sent to your mobile.",
    maxLength: 6,
    component: (props: FormFieldSchemaType) => (
      <InputOtpFormField {...filterProps(props)} maxLength={props.maxLength!} />
    ),
  },
  slider: {
    fieldLabel: "Slider",
    label: "Select a number",
    description: "Select a number between 0 and 100.",
    component: (props: FormFieldSchemaType) => (
      <SliderFormField
        {...filterProps(props)}
        min={0}
        max={100}
        step={5}
        defaultValue={[5]}
      />
    ),
  },
  "file-upload": {
    fieldLabel: "File Upload",
    label: "Upload a file",
    description: "Upload a file from your device.",
    component: (props: FormFieldSchemaType) => (
      <FileUploadFormField {...filterProps(props)} />
    ),
  },
  "multi-select": {
    fieldLabel: "Multi Select",
    label: "Select multiple options",
    description: "Select multiple options from the list.",
    options: [
      { label: "Frontend Developer", value: "frontend-developer" },
      { label: "Backend Developer", value: "backend-developer" },
      { label: "Fullstack Developer", value: "fullstack-developer" },
    ],
    component: (props: FormFieldSchemaType) => (
      <MultiSelectFormField {...filterProps(props)} />
    ),
  },
  "tags-input": {
    fieldLabel: "Tags Input",
    label: "Enter tags",
    description: "Enter tags separated by commas.",
    component: (props: FormFieldSchemaType) => (
      <TagsInputFormField {...filterProps(props)} />
    ),
  },
  "tiptap-editor": {
    fieldLabel: "Tiptap Editor",
    label: "Enter content",
    description: "Enter content using the rich text editor.",
    component: (props: FormFieldSchemaType) => (
      <TiptapEditorFormField {...filterProps(props)} />
    ),
  },
} as const;

type FormFieldType = {
  name: FormFieldTypesType;
  label: string;
  isNew: boolean;
};

export const formFieldTypes: FormFieldType[] = Object.entries(
  defaultFormFieldConfig
).map(([name, { fieldLabel }]) => ({
  name: name as FormFieldTypesType,
  label: fieldLabel,
  isNew: false,
}));
