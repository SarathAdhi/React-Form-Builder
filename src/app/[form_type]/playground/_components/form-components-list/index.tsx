import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultFormFieldConfig, formFieldTypes } from "@/constants/form-field";
import { filterObjectKeys } from "@/utils/filter-object-keys";
import { shortUuid } from "@/utils/short-uuid";
import {
  FormBuilderSchemaType,
  FormFieldTypesType,
} from "@/zod/form-builder-schema";
import { memo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import SectionContainer from "../section-container";

const FormComponentsList = () => {
  const { control } = useFormContext<FormBuilderSchemaType>();

  const { append } = useFieldArray({
    control,
    name: "fields",
  });

  function addField(fieldType: FormFieldTypesType) {
    const uuid = shortUuid();

    append({
      id: `${uuid}`,
      fieldType,
      name: `name_${uuid}`,
      ...filterObjectKeys(defaultFormFieldConfig[fieldType], ["component"]),
      required: false,
      disabled: false,
    });
  }

  return (
    <SectionContainer
      title="Components"
      className="w-full lg:w-56 flex flex-col flex-shrink-0"
    >
      <ScrollArea className="h-full lg:max-h-[calc(100vh-9rem)]">
        <div className="flex flex-row flex-wrap lg:flex-col gap-4 p-4 pt-0">
          {formFieldTypes.map((type) => (
            <Button
              key={type.label}
              variant="outline"
              onClick={() => addField(type.name)}
              className="flex-auto w-fit lg:w-full select-none justify-start shadow-[3px_3px_0px_0px_hsl(var(--foreground))] hover:shadow-[5px_5px_0px_0px_hsl(var(--foreground))] active:shadow-[2px_2px_0px_0px_hsl(var(--foreground))] transition-all duration-200"
            >
              {type.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </SectionContainer>
  );
};

export default memo(FormComponentsList);
