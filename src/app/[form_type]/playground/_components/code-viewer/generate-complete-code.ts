import { ComponentRegistryType } from "@/__registry__";
import { reactHookFormComponentRegistry } from "@/__registry__/react-hook-form";
import {
  FormBuilderSchemaType,
  FormFieldSchemaType,
} from "@/zod/form-builder-schema";
import { z } from "zod";

// Types
type ZodSchemaObject = Record<string, z.ZodTypeAny>;
type ImportSet = Set<string>;

// Helper functions
const getBaseImports = (formType: string) => {
  const commonImports = [
    '"use client"',
    'import { useState } from "react"',
    'import { cn } from "@/lib/utils"',
    'import { Button } from "@/components/ui/button"',
    'import { Form } from "@/components/ui/form"',
  ] as const;

  const formSpecificImports = {
    "react-hook-form": [
      'import * as z from "zod"',
      'import { useForm } from "react-hook-form"',
      'import { zodResolver } from "@hookform/resolvers/zod"',
    ],
    "tanstack-form": [
      'import * as z from "zod"',
      'import { useForm } from "@tanstack/react-form"',
      'import { zodValidator } from "@tanstack/zod-form-adapter"',
    ],
    formik: ['import * as Yup from "yup"'],
  };

  return [
    ...commonImports,
    ...formSpecificImports[formType as keyof typeof formSpecificImports],
  ];
};

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

const getDefaultValue = (field: FormFieldSchemaType) => {
  switch (field.fieldType) {
    case "checkbox":
    case "switch":
      return false;
    case "input":
      switch (field.type) {
        case "number":
          return 0;
        default:
          return "";
      }
    default:
      return "";
  }
};

const formatZodSchema = (schema: z.ZodTypeAny): string => {
  const formatters = {
    isDefault: (s: z.ZodDefault<any>) =>
      `${formatZodSchema(s._def.innerType)}.default(${JSON.stringify(
        s._def.defaultValue()
      )})`,
    isBoolean: (s: z.ZodBoolean) => "z.boolean()",
    isNumber: (s: z.ZodNumber) => {
      let result = "z.number()";
      if ("checks" in s._def) {
        s._def.checks.forEach((check) => {
          if (check.kind === "min" && "value" in check)
            result += `.min(${check.value})`;
          if (check.kind === "max" && "value" in check)
            result += `.max(${check.value})`;
        });
      }
      return result;
    },
    isString: (s: z.ZodString) => {
      let result = "z.string()";
      if ("checks" in s._def) {
        s._def.checks.forEach((check) => {
          if (check.kind === "min" && "value" in check)
            result += `.min(${check.value})`;
          if (check.kind === "max" && "value" in check)
            result += `.max(${check.value})`;
          if (check.kind === "email") result += `.email()`;
        });
      }
      return result;
    },
    isDate: (s: z.ZodDate) => "z.coerce.date()",
    isArray: (s: z.ZodArray<any>) =>
      `z.array(${formatZodSchema(s.element)}).nonempty()`,
    isObject: (s: z.ZodObject<any>) => {
      const shapeStrs = Object.entries(s.shape).map(
        ([key, value]) => `${key}: ${formatZodSchema(value as z.ZodTypeAny)}`
      );
      return `z.object({\n  ${shapeStrs.join(",\n  ")}\n})`;
    },
    isOptional: (s: z.ZodOptional<any>) =>
      `${formatZodSchema(s.unwrap())}.optional()`,
  };

  // Check type using Zod's built-in type guards
  if (schema instanceof z.ZodDefault) return formatters.isDefault(schema);
  if (schema instanceof z.ZodBoolean) return formatters.isBoolean(schema);
  if (schema instanceof z.ZodNumber) return formatters.isNumber(schema);
  if (schema instanceof z.ZodString) return formatters.isString(schema);
  if (schema instanceof z.ZodDate) return formatters.isDate(schema);
  if (schema instanceof z.ZodArray) return formatters.isArray(schema);
  if (schema instanceof z.ZodObject) return formatters.isObject(schema);
  if (schema instanceof z.ZodOptional) return formatters.isOptional(schema);

  return "z.unknown()";
};

const getYupSchemaString = (formFields: FormBuilderSchemaType): string => {
  const schemaEntries = formFields.fields.flat().map((field) => {
    const required = field.required ? `.required()` : ``;

    let typeSchema;
    switch (field.fieldType) {
      case "checkbox":
      case "switch":
        typeSchema = `Yup.boolean()`;
        break;
      case "input":
        switch (field.type) {
          case "email":
            typeSchema = `Yup.string().email()`;
            break;
          case "number":
            typeSchema = `Yup.number()`;
            break;
          default:
            typeSchema = `Yup.string()`;
            break;
        }
        break;
      default:
        typeSchema = `Yup.string()`;
    }

    return `  ${field.name}: ${typeSchema}${required}`;
  });

  return `const formSchema = Yup.object().shape({\n${schemaEntries.join(
    ",\n"
  )}\n});`;
};

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
  formFields: FormBuilderSchemaType,
  form_type: string
): ImportSet => {
  const imports = new Set<string>(getBaseImports(form_type));

  formFields.fields.flat().forEach((field) => {
    const componentInfo = reactHookFormComponentRegistry[field.fieldType];
    if (componentInfo) {
      imports.add(
        `import { ${field.fieldLabel.replaceAll(
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

export const generateFormCode = (
  formFields: FormBuilderSchemaType,
  form_type: ComponentRegistryType
): string => {
  const imports = Array.from(generateImports(formFields, form_type)).join("\n");
  const schema =
    form_type === "formik"
      ? getYupSchemaString(formFields)
      : getZodSchemaString(formFields);
  const defaultValues = generateDefaultValues(formFields);

  const formFields_rendered = formFields.fields
    .map(
      (field) =>
        `        <${field.fieldLabel.replaceAll(
          " ",
          ""
        )}FormField ${formatFieldProps(field)} />`
    )
    .join("\n\n");

  const formImplementations = {
    "react-hook-form": `
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
}`,
    "tanstack-form": `
export default function MyForm() {
  const form = useForm({
    defaultValues: {
${Object.entries(defaultValues)
  .map(([key, value]) => `      ${key}: ${JSON.stringify(value)}`)
  .join(",\n")}
    } as z.infer<typeof formSchema>,
    onSubmit: async (values) => {
      console.log(values);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: formSchema,
    },
  });

  return (
    <Form {...form}>
${formFields_rendered}

        <Button type="submit">Submit</Button>
    </Form>
  );
}`,
    formik: `
export default function MyForm() {
  return (
    <Form
      validationSchema={formSchema}
      initialValues={{ 
  ${Object.entries(defaultValues)
    .map(([key, value]) => `      ${key}: ${JSON.stringify(value)}`)
    .join(",\n  ")}
      }}
      onSubmit={(values) => console.log(values)}
    >
${formFields_rendered}

        <Button type="submit">Submit</Button>
    </Form>
  );
}`,
  };

  return `${imports}

${schema}

${formImplementations[form_type as keyof typeof formImplementations]}`;
};
