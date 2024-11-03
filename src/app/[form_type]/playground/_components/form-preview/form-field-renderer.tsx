import { defaultFormFieldConfig } from "@/constants/form-field";
import { FormFieldSchemaType } from "@/zod/form-builder-schema";

type FormFieldRendererProps = (field: FormFieldSchemaType) => JSX.Element;

export const formFieldRenderer: FormFieldRendererProps = (
  field: FormFieldSchemaType
) => {
  const fieldType = field.fieldType;

  const formField = defaultFormFieldConfig[fieldType];

  return formField.component(field);
};
