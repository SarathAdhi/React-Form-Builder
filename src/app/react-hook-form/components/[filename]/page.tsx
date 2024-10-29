import CodeHighlighter from "@/components/code-highlighter";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  params: {
    filename: string;
  };
}

const ReactHookFormComponentsPage = async ({ params: { filename } }: Props) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/file?filename=react-hook-form/${filename}`
  );

  const data = await response.json();

  // console.log(data);

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
