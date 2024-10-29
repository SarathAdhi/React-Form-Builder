"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FormBuilderSchemaType } from "@/zod/form-builder-schema";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import SectionContainer from "../section-container";
import SortableFieldItem from "./sortable-field-item";

const FormFieldList = () => {
  const { watch, setValue, control } = useFormContext<FormBuilderSchemaType>();

  const { remove } = useFieldArray({
    control,
    name: "fields",
  });

  const fields = watch("fields");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      // Create new array with reordered items
      const newFields = [...fields];
      const [movedItem] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, movedItem);

      setValue("fields", newFields);
    }
  };

  return (
    <SectionContainer title="Field List">
      <ScrollArea className="h-full max-h-96 md:max-h-[calc(100vh-9rem)]">
        <div className="flex flex-col gap-4 p-4 pt-0">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            // modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <SortableFieldItem
                  key={field.id}
                  id={field.id}
                  field={field}
                  onRemove={() => remove(index)}
                  onClickEdit={() => setValue("selectedFormFieldIndex", index)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </ScrollArea>
    </SectionContainer>
  );
};

export default memo(FormFieldList);
