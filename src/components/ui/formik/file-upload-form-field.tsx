"use client";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";
import { CloudUploadIcon, PaperclipIcon } from "lucide-react";
import * as React from "react";
import { DropzoneOptions } from "react-dropzone";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  description?: string;
  labelClassName?: string;
  dropzoneOptions?: DropzoneOptions;
}

const dropZoneConfig = {
  maxFiles: 5,
  maxSize: 1024 * 1024 * 4,
  multiple: true,
};

const FileUploadFormField = React.forwardRef<
  HTMLDivElement,
  Props & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      name,
      label,
      description,
      dropzoneOptions = dropZoneConfig,
      ...props
    },
    ref
  ) => (
    <FormField
      name={name!}
      render={({ field, form }) => (
        <FormItem className={cn("w-full space-y-1", containerClassName)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}{" "}
              {props?.required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <FileUploader
              ref={ref}
              value={field.value}
              onValueChange={(value) => form.setFieldValue(name!, value)}
              dropzoneOptions={dropZoneConfig}
              className="relative bg-background rounded-lg p-2"
            >
              <FileInput
                id="fileInput"
                className="outline-dashed outline-1 outline-slate-500"
              >
                <div className="flex items-center justify-center flex-col p-8 w-full ">
                  <CloudUploadIcon className="text-gray-500 w-10 h-10" />

                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                    &nbsp; or drag and drop
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </FileInput>

              <FileUploaderContent>
                {field.value &&
                  field.value.length > 0 &&
                  (field.value as any[]).map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <PaperclipIcon className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  )
);

FileUploadFormField.displayName = "FileUploadFormField";

export { FileUploadFormField };
