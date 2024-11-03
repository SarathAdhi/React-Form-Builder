import { Button } from "@/components/ui/button";
import { FormBuilderSchemaType } from "@/zod/form-builder-schema";
import { Reorder, useDragControls } from "framer-motion";
import { GripVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { memo } from "react";

interface ReorderFieldItemProps {
  field: FormBuilderSchemaType["fields"][0];
  onRemove: () => void;
  onClickEdit: () => void;
}

const ReorderFieldItem = ({
  field,
  onRemove,
  onClickEdit,
}: ReorderFieldItemProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={field}
      dragListener={false}
      dragControls={controls}
      className="bg-background select-none"
    >
      <div className="flex items-center justify-between gap-2 border p-2 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <GripVerticalIcon
            className="cursor-grab active:cursor-grabbing size-5"
            onPointerDown={(e) => controls.start(e)}
          />

          <p>{field.fieldLabel}</p>
        </div>

        <div>
          <Button variant="ghost" size="sm-icon" onClick={onClickEdit}>
            <PencilIcon />
          </Button>

          <Button variant="ghost" size="sm-icon" onClick={onRemove}>
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </Reorder.Item>
  );
};

export default memo(ReorderFieldItem);
