"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputFormField } from "@/components/ui/react-hook-form/input-form-field";
import { SelectFormField } from "@/components/ui/react-hook-form/select-form-field";
import { SwitchFormField } from "@/components/ui/react-hook-form/switch-form-field";
import { Separator } from "@/components/ui/separator";
import { INPUT_TYPES } from "@/constants/input-types";
import {
  FormBuilderSchemaType,
  FormFieldTypesType,
} from "@/zod/form-builder-schema";
import { Close } from "@radix-ui/react-dialog";
import { memo } from "react";
import { useFormContext } from "react-hook-form";

interface EditFormFieldDialogProps {
  isDialogOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const hiddenPlaceholderFields: FormFieldTypesType[] = [
  "switch",
  "checkbox",
  "radio-group",
  "slider",
];

const EditFormFieldDialog = ({
  isDialogOpen,
  onOpenChange,
}: EditFormFieldDialogProps) => {
  const { watch, setValue } = useFormContext<FormBuilderSchemaType>();

  const { selectedFormFieldIndex, fields } = watch();

  const selectedField = fields[selectedFormFieldIndex!];

  if (!selectedField || selectedFormFieldIndex === undefined) return;

  const showPlaceholder = !hiddenPlaceholderFields.includes(
    selectedField.fieldType
  );
  const showInputType = selectedField.fieldType === "input";

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => {
        if (!value) setValue("selectedFormFieldIndex", undefined);

        onOpenChange(value);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit {selectedField.fieldLabel} Field{" "}
            <span className="text-sm font-normal">{`(Component: ${
              selectedFormFieldIndex + 1
            })`}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <InputFormField
            label="Label"
            name={`fields.${selectedFormFieldIndex}.label`}
          />

          <InputFormField
            label="Description"
            name={`fields.${selectedFormFieldIndex}.description`}
          />

          <InputFormField
            label="Name"
            name={`fields.${selectedFormFieldIndex}.name`}
          />

          {showPlaceholder && (
            <InputFormField
              label="Placeholder"
              name={`fields.${selectedFormFieldIndex}.placeholder`}
            />
          )}

          {showInputType && (
            <SelectFormField
              label="Type"
              defaultValue="text"
              name={`fields.${selectedFormFieldIndex}.type`}
              options={INPUT_TYPES.map((value) => ({
                value,
                label: value.charAt(0).toUpperCase() + value.slice(1),
              }))}
            />
          )}

          <Separator />

          <SwitchFormField
            label="Required"
            name={`fields.${selectedFormFieldIndex}.required`}
          />

          <SwitchFormField
            label="Disabled"
            name={`fields.${selectedFormFieldIndex}.disabled`}
          />
        </div>

        <DialogFooter>
          <Close asChild>
            <Button type="submit">Save changes</Button>
          </Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditFormFieldDialog);
