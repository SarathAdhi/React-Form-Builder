"use client";

import { Button } from "@/components/ui/button";
import { FormBuilderSchemaType } from "@/zod/form-builder-schema";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { memo } from "react";

interface SortableFieldItemProps {
  id: string;
  field: FormBuilderSchemaType["fields"][0];
  onRemove: () => void;
  onClickEdit: () => void;
}

const SortableFieldItem = ({
  id,
  field,
  onRemove,
  onClickEdit,
}: SortableFieldItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-background select-none ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex items-center justify-between gap-2 border p-2 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners}>
            <GripVerticalIcon className="cursor-grab active:cursor-grabbing size-5" />
          </div>

          <p className="line-clamp-1">{field.fieldLabel}</p>
        </div>

        <div className="flex-shrink-0">
          <Button variant="ghost" size="sm-icon" onClick={onClickEdit}>
            <PencilIcon />
          </Button>

          <Button variant="ghost" size="sm-icon" onClick={onRemove}>
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(SortableFieldItem);
