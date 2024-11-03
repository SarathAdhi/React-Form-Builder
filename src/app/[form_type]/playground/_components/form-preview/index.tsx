"use client";

import CodeHighlighter from "@/components/code-highlighter";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/react-hook-form/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormStore } from "@/store/form";
import {
  FormBuilderSchemaType,
  FormFieldSchemaType,
} from "@/zod/form-builder-schema";
import { useParams, useRouter } from "next/navigation";
import React, { memo } from "react";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import CodeViewer from "../code-viewer";
import SectionContainer from "../section-container";
import { formFieldRenderer } from "./form-field-renderer";

type FormType = "react-hook-form" | "tanstack-form" | "formik";

interface FormTypeOption {
  value: FormType;
  label: string;
}

const FORM_TYPE_OPTIONS: FormTypeOption[] = [
  { value: "react-hook-form", label: "React Hook Form" },
  { value: "tanstack-form", label: "TanStack Form" },
  { value: "formik", label: "Formik" },
];

const EmptyState = () => (
  <div>
    <p>Nothing to show here</p>
  </div>
);

const FormTypeSelector = ({
  onTypeChange,
}: {
  onTypeChange: (value: FormType) => void;
}) => {
  const { form_type } = useParams();

  return (
    <Select
      defaultValue={form_type as string}
      onValueChange={(value) => onTypeChange(value as FormType)}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Select form type" />
      </SelectTrigger>
      <SelectContent>
        {FORM_TYPE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const TabHeader = ({
  onTypeChange,
}: {
  onTypeChange: (value: FormType) => void;
}) => (
  <div className="p-4 pb-0 flex items-center justify-between gap-4">
    <div>
      <TabsList className="h-auto">
        <TabsTrigger value="preview" className="text-base font-semibold h4">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="text-base font-semibold h4">
          Code
        </TabsTrigger>
      </TabsList>
    </div>

    <FormTypeSelector onTypeChange={onTypeChange} />
  </div>
);

const PreviewForm = ({
  fields,
  onSubmit,
}: {
  fields: React.ReactElement[];
  onSubmit: (values: FieldValues) => void;
}) => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {fields}

        <Button>Submit</Button>
      </form>
    </Form>
  );
};

const renderFormField = (field: FormFieldSchemaType): React.ReactElement => {
  const formField = formFieldRenderer(field);
  return React.cloneElement(formField, {
    key: field.id,
  });
};

const ToastContent = ({ values }: { values: FieldValues }) => (
  <ScrollArea className="w-full">
    <CodeHighlighter code={JSON.stringify(values, null, 2)} />
  </ScrollArea>
);

const FormPreview = () => {
  const router = useRouter();
  const { setFormFields } = useFormStore();
  const { watch } = useFormContext<FormBuilderSchemaType>();
  const fields = watch("fields");

  const handleFormTypeChange = (value: FormType) => {
    setFormFields(fields);
    router.replace(`/${value}/playground`);
  };

  const handleSubmit = (values: FieldValues) => {
    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        const field = fields?.find((f) => f.name === key || f.id === key);
        return !!field;
      })
    );

    toast(<ToastContent values={cleanedValues} />);
    console.log(cleanedValues);
  };

  const formFields = fields?.map(renderFormField);
  const isFieldsEmpty = !fields || fields.length === 0;

  return (
    <SectionContainer className="lg:col-span-2 flex flex-col">
      <Tabs defaultValue="preview">
        <TabHeader onTypeChange={handleFormTypeChange} />

        <TabsContent value="preview" className="grid">
          <ScrollArea className="h-full md:max-h-[calc(100vh-9rem)]">
            <div className="grid p-4 pt-0">
              {!isFieldsEmpty ? (
                <PreviewForm fields={formFields} onSubmit={handleSubmit} />
              ) : (
                <EmptyState />
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="code" className="relative w-full p-4 pt-0">
          {!isFieldsEmpty ? <CodeViewer /> : <EmptyState />}
        </TabsContent>
      </Tabs>
    </SectionContainer>
  );
};

export default memo(FormPreview);
