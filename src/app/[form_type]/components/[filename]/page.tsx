import { componentRegistry } from "@/__registry__";
import CodeHighlighter from "@/components/code-highlighter";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  params: {
    filename: string;
    form_type: string;
  };
}

export async function generateStaticParams() {
  return Object.values(componentRegistry).flatMap((registry) =>
    Object.values(registry).map((component) => ({
      params: {
        filename: component.fileName,
        form_type: component.componentName,
      },
    }))
  );
}

const ReactHookFormComponentsPage = async ({ params }: Props) => {
  const { filename, form_type } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/file?filename=${form_type}/${filename}`
  );

  const data = await response.json();

  if (!data.content) return <div>File not found</div>;

  return (
    <div className="py-4 w-full space-y-4 overflow-auto">
      <h2 className="capitalize">{filename.replaceAll("-", " ")}</h2>

      <ScrollArea>
        <CodeHighlighter code={data.content} />
      </ScrollArea>
    </div>
  );
};

export default ReactHookFormComponentsPage;
