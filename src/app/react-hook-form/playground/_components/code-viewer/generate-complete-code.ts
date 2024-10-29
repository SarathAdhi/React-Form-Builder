import { reactHookFormComponentRegistry } from "@/__registry__/react-hook-form";
import {
  FormBuilderSchemaType,
  FormFieldSchemaType,
} from "@/zod/form-builder-schema";
import { z } from "zod";

// Types
type ZodSchemaObject = Record<string, z.ZodTypeAny>;
type ImportSet = Set<string>;

// Constants
const BASE_IMPORTS = [
  '"use client"',
  'import { useState } from "react"',
  'import { useForm } from "react-hook-form"',
  'import { zodResolver } from "@hookform/resolvers/zod"',
  'import * as z from "zod"',
  'import { cn } from "@/lib/utils"',
  'import { Button } from "@/components/ui/button"',
  'import { Form } from "@/components/ui/form"',
] as const;

// Helper functions
const createFieldSchema = (field: FormFieldSchemaType): z.ZodTypeAny => {
  const schemaMap: Record<string, () => z.ZodTypeAny> = {
    checkbox: () => z.boolean(),
    switch: () => z.boolean(),
    input: () => {
      switch (field.type) {
        case "email":
          return z.string().email();
        case "number":
          return z.coerce.number();
        default:
          return z.string();
      }
    },
  };

  const schema = (schemaMap[field.fieldType] || (() => z.string()))();
  return field.required === true ? schema : schema.optional();
};

const getDefaultValue = (field: FormFieldSchemaType): any => {
  switch (field.fieldType) {
    case "checkbox":
    case "switch":
      return false;
    case "input":
      switch (field.type) {
        case "email":
          return "user@example.com";
        case "number":
          return 0;
        case "tel":
          return "+1234567890";
        case "url":
          return "https://example.com";
        case "date":
          return new Date().toISOString().split("T")[0];
        default:
          return "Default text";
      }
    case "textarea":
      return "Enter your text here...";
    case "select":
      return ""; // First option will be selected by default
    default:
      return "";
  }
};

const formatZodSchema = (schema: z.ZodTypeAny): string => {
  const formatters: Record<string, (schema: any) => string> = {
    ZodDefault: (s) =>
      `${formatZodSchema(s._def.innerType)}.default(${JSON.stringify(
        s._def.defaultValue()
      )})`,
    ZodBoolean: () => "z.boolean()",
    ZodNumber: (s) => {
      let result = "z.number()";
      if ("checks" in s._def) {
        s._def.checks.forEach((check: { kind: string; value: number }) => {
          if (check.kind === "min") result += `.min(${check.value})`;
          if (check.kind === "max") result += `.max(${check.value})`;
        });
      }
      return result;
    },
    ZodString: (s) => {
      let result = "z.string()";
      if ("checks" in s._def) {
        s._def.checks.forEach((check: { kind: string; value: number }) => {
          if (check.kind === "min") result += `.min(${check.value})`;
          if (check.kind === "max") result += `.max(${check.value})`;
        });
      }
      return result;
    },
    ZodDate: () => "z.coerce.date()",
    ZodArray: (s) => `z.array(${formatZodSchema(s.element)}).nonempty()`,
    ZodObject: (s) => {
      const shapeStrs = Object.entries(s.shape).map(
        ([key, value]) => `${key}: ${formatZodSchema(value as z.ZodTypeAny)}`
      );
      return `z.object({\n  ${shapeStrs.join(",\n  ")}\n})`;
    },
    ZodOptional: (s) => `${formatZodSchema(s.unwrap())}.optional()`,
  };

  const schemaType = schema.constructor.name;
  return formatters[schemaType]?.(schema) ?? "z.unknown()";
};

// Main functions
export const generateZodSchema = (
  formFields: FormBuilderSchemaType
): z.ZodObject<any> => {
  const schemaObject: ZodSchemaObject = {};
  formFields.fields.flat().forEach((field) => {
    schemaObject[field.name] = createFieldSchema(field);
  });
  return z.object(schemaObject);
};

export const generateDefaultValues = (
  formFields: FormBuilderSchemaType
): Record<string, any> => {
  const defaultValues: Record<string, any> = {};
  formFields.fields.flat().forEach((field) => {
    defaultValues[field.name] = getDefaultValue(field);
  });
  return defaultValues;
};

export const getZodSchemaString = (
  formFields: FormBuilderSchemaType
): string => {
  const schema = generateZodSchema(formFields);
  const schemaEntries = Object.entries(schema.shape)
    .map(
      ([key, value]) => `  ${key}: ${formatZodSchema(value as z.ZodTypeAny)}`
    )
    .join(",\n");

  return `const formSchema = z.object({\n${schemaEntries}\n});`;
};

export const generateImports = (
  formFields: FormBuilderSchemaType
): ImportSet => {
  const imports = new Set<string>(BASE_IMPORTS);

  formFields.fields.flat().forEach((field) => {
    const componentInfo = reactHookFormComponentRegistry[field.fieldType];
    if (componentInfo) {
      imports.add(
        `import { ${field.fieldLabel.replace(
          " ",
          ""
        )}FormField } from "@/components/ui/${componentInfo.fileName.replace(
          ".tsx",
          ""
        )}"`
      );
    }
  });

  return imports;
};

const formatFieldProps = (field: FormFieldSchemaType): string => {
  const ignoredProps = ["fieldType", "fieldLabel", "id"];

  return Object.entries(field)
    .filter(([key]) => !ignoredProps.includes(key))
    .map(([key, value]) => {
      if (value === undefined) return;
      // if (key === "name") return `${key}="${value}"`;
      // if (key === "type" && value === "number") return `${key}="${value}"`;
      return `${key}={${JSON.stringify(value)}}`;
    })
    .join(" ");
};

export const generateFormCode = (formFields: FormBuilderSchemaType): string => {
  const imports = Array.from(generateImports(formFields)).join("\n");
  const schema = getZodSchemaString(formFields);
  const defaultValues = generateDefaultValues(formFields);

  const formFields_rendered = formFields.fields
    .map(
      (field) =>
        `        <${field.fieldLabel.replace(
          " ",
          ""
        )}FormField ${formatFieldProps(field)} />`
    )
    .join("\n\n");

  return `${imports}

${schema}

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
${Object.entries(defaultValues)
  .map(([key, value]) => `      ${key}: ${JSON.stringify(value)}`)
  .join(",\n")}
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log('Form submitted:', values);
      // Add your form submission logic here
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
${formFields_rendered}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}`;
};
