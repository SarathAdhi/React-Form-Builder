"use client";

import { reactHookFormComponentRegistry } from "@/__registry__/react-hook-form";
import CodeHighlighter from "@/components/code-highlighter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormBuilderSchemaType } from "@/zod/form-builder-schema";
import { useFormContext } from "react-hook-form";
import { generateFormCode } from "./generate-complete-code";

const CodeViewer = () => {
  const { watch } = useFormContext<FormBuilderSchemaType>();
  const fields = watch("fields");

  const componentTabs = fields
    ?.filter(
      (field, index, self) =>
        index === self.findIndex((t) => t.fieldType === field.fieldType)
    )
    .map((field) => ({
      label: field.fieldLabel,
      value: field.fieldType,
    }));

  return (
    <Tabs defaultValue={componentTabs[0].value} className="space-y-0.5">
      <ScrollArea className="grid w-full overflow-auto pb-2">
        <TabsList>
          {componentTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {reactHookFormComponentRegistry[tab.value].fileName}
            </TabsTrigger>
          ))}

          <TabsTrigger value="form">{"MyForm.tsx"}</TabsTrigger>
        </TabsList>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {componentTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <CodeHighlighter
            code={reactHookFormComponentRegistry[tab.value].sourceCode}
          />
        </TabsContent>
      ))}

      <TabsContent value="form">
        <CodeHighlighter code={generateFormCode(watch())} />
      </TabsContent>
    </Tabs>
  );
};

export default CodeViewer;
