"use client";
import { Form } from "@/components/ui/react-hook-form/form";
import { useDialogHandler } from "@/hooks/use-dialog-handler";
import {
  FormBuilderSchemaType,
  formBuilderSchema,
} from "@/zod/form-builder-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormComponentsList from "../form-components-list";
import SectionContainer from "../section-container";

const FormFieldList = dynamic(() => import("../form-field-list"), {
  loading: () => (
    <SectionContainer title="Field List">
      <div className="px-4">
        <Loader2Icon className="animate-spin" />
      </div>
    </SectionContainer>
  ),
});
const FormPreview = dynamic(() => import("../form-preview"), {
  loading: () => (
    <SectionContainer title="Preview">
      <div className="px-4">
        <Loader2Icon className="animate-spin" />
      </div>
    </SectionContainer>
  ),
});
const EditFormFieldDialog = dynamic(
  () => import("./edit-form-field-dialog"),
  {}
);

const FormBuilder = () => {
  const { isDialogOpen, onOpen, onClose, onOpenChange } = useDialogHandler();

  const form = useForm<FormBuilderSchemaType>({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      fields: [],
      selectedFormFieldIndex: undefined,
    },
  });

  const { selectedFormFieldIndex, fields } = form.watch();

  useEffect(() => {
    if (selectedFormFieldIndex === undefined) return;

    if (isDialogOpen) onClose();
    else onOpen();
  }, [selectedFormFieldIndex]);

  const isFieldsEmpty = !fields || fields.length === 0;

  return (
    <Form {...form}>
      <section className="flex-1 flex flex-col lg:flex-row container gap-1 divide-y lg:divide-y-0 lg:divide-x">
        <FormComponentsList />

        {isFieldsEmpty ? (
          <div className="w-full text-center">
            <Image
              width={500}
              height={500}
              className="mx-auto"
              src="/assets/empty-fields.svg"
              alt="empty fields"
              draggable={false}
            />

            <h4>Click on the components to add fields to the form builder</h4>
          </div>
        ) : (
          <div className="md:flex-1 w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0 divide-y md:divide-y-0 divide-x-0 md:divide-x">
            <FormFieldList />

            <FormPreview />
          </div>
        )}
      </section>

      <EditFormFieldDialog {...{ isDialogOpen, onOpenChange }} />
    </Form>
  );
};

export default memo(FormBuilder);
