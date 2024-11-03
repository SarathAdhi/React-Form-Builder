"use client";

import { componentRegistry } from "@/__registry__";
import CodeHighlighter from "@/components/code-highlighter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormBuilderSchemaType } from "@/zod/form-builder-schema";
import { useParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { generateFormCode } from "./generate-complete-code";

type FormType = keyof typeof componentRegistry;
type FormComponentRegistryType = (typeof componentRegistry)[FormType];

interface FormComponentType {
  fileName: string;
  sourceCode: string;
}

interface ComponentTab {
  label: string;
  value: string;
}

const getUniqueFields = (fields: FormBuilderSchemaType["fields"]) => {
  return fields?.filter(
    (field, index, self) =>
      index === self.findIndex((t) => t.fieldType === field.fieldType)
  );
};

const createComponentTabs = (
  fields: FormBuilderSchemaType["fields"]
): ComponentTab[] => {
  const uniqueFields = getUniqueFields(fields);
  return (
    uniqueFields?.map((field) => ({
      label: field.fieldLabel,
      value: field.fieldType,
    })) || []
  );
};

const TabContent = ({
  tab,
  registry,
}: {
  tab: ComponentTab;
  registry: FormComponentRegistryType;
}) => {
  const component = registry[
    tab.value as keyof typeof registry
  ] as FormComponentType;

  return (
    <TabsContent key={tab.value} value={tab.value}>
      <CodeHighlighter code={component.sourceCode} />
    </TabsContent>
  );
};

const TabTriggers = ({
  tabs,
  registry,
}: {
  tabs: ComponentTab[];
  registry: FormComponentRegistryType;
}) => (
  <ScrollArea className="grid w-full overflow-auto pb-2">
    <TabsList>
      {tabs.map((tab) => {
        const component = registry[
          tab.value as keyof typeof registry
        ] as FormComponentType;
        return (
          <TabsTrigger key={tab.value} value={tab.value}>
            {component?.fileName}
          </TabsTrigger>
        );
      })}
      <TabsTrigger value="form">MyForm.tsx</TabsTrigger>
    </TabsList>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

const CodeViewer = () => {
  const { form_type } = useParams<{ form_type: FormType }>();
  const { watch } = useFormContext<FormBuilderSchemaType>();
  const fields = watch("fields");

  const componentTabs = createComponentTabs(fields);
  const formComponentRegistry = componentRegistry[
    form_type
  ] as FormComponentRegistryType;

  if (!componentTabs.length) {
    return null;
  }

  return (
    <Tabs defaultValue={componentTabs[0]?.value} className="space-y-0.5">
      <TabTriggers tabs={componentTabs} registry={formComponentRegistry} />

      {componentTabs.map((tab) => (
        <TabContent
          key={tab.value}
          tab={tab}
          registry={formComponentRegistry}
        />
      ))}

      <TabsContent value="form">
        <CodeHighlighter code={generateFormCode(watch())} />
      </TabsContent>
    </Tabs>
  );
};

export default CodeViewer;
