"use client";

import CodeHighlighter from "@/components/code-highlighter";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/react-hook-form/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormBuilderSchemaType,
  FormFieldSchemaType,
} from "@/zod/form-builder-schema";
import React, { memo } from "react";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import CodeViewer from "../code-viewer";
import SectionContainer from "../section-container";
import { formFieldRenderer } from "./form-field-renderer";

function renderFormField(field: FormFieldSchemaType) {
  const formField = formFieldRenderer(field);

  return React.cloneElement(formField, {
    key: field.id,
  });
}

const FormPreview = () => {
  const { watch } = useFormContext<FormBuilderSchemaType>();
  const fields = watch("fields");

  const form = useForm();

  function onSubmit(values: FieldValues) {
    toast(
      <ScrollArea className="w-full">
        <CodeHighlighter code={JSON.stringify(values, null, 2)} />
      </ScrollArea>
    );
    console.log(values);
  }

  const formFields = fields?.map(renderFormField);

  const isFieldsEmpty = !fields || fields.length === 0;

  return (
    <SectionContainer className="lg:col-span-2 flex flex-col">
      <Tabs defaultValue="preview">
        <div className="p-4 pb-0">
          <TabsList className="h-auto">
            <TabsTrigger value="preview" className="text-base font-semibold h4">
              Preview
            </TabsTrigger>

            <TabsTrigger value="code" className="text-base font-semibold h4">
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="grid">
          <ScrollArea className="h-full md:max-h-[calc(100vh-9rem)]">
            <div className="grid p-4 pt-0">
              {!isFieldsEmpty ? (
                <Form {...form}>
                  <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    {formFields}

                    <Button>Submit</Button>
                  </form>
                </Form>
              ) : (
                <div>
                  <p>Nothing to show here</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="code" className="relative w-full p-4 pt-0">
          {!isFieldsEmpty ? <CodeViewer /> : <div>Nothing to show here</div>}
        </TabsContent>
      </Tabs>
    </SectionContainer>
  );
};

export default memo(FormPreview);
