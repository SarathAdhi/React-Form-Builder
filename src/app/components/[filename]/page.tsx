import CodeHighlighter from "@/components/code-highlighter";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ingoredComponentsFiles } from "@/constants/ignored-components-files";

interface Props {
  params: {
    filename: string;
  };
}

const externalLibraries = {
  "tiptap-editor": [
    {
      name: "Tiptap",
      href: "https://tiptap.dev/docs/editor/getting-started/overview",
    },
  ],
  "file-upload": [
    {
      name: "Shadcn Extension",
      href: "https://shadcn-extension.vercel.app/docs/file-upload",
    },
  ],
  "multi-select": [
    {
      name: "Shadcn Extension",
      href: "https://shadcn-extension.vercel.app/docs/multi-select",
    },
  ],
  "password-input": [
    {
      name: "Shadcn UI",
      href: "https://ui.shadcn.com/docs/components/input",
    },
  ],
  "tags-input": [
    {
      name: "Shadcn Extension",
      href: "https://shadcn-extension.vercel.app/docs/tag-input",
    },
  ],
};

const ReactHookFormComponentsPage = async ({ params: { filename } }: Props) => {
  const file = filename.split("/");
  const isIgnored = ingoredComponentsFiles.includes(file[file.length - 1]);

  if (isIgnored) return <h4>File not found</h4>;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/file?filename=${filename}`
  );

  const data = await response.json();

  if (data.error) return <h4>{data.error}</h4>;

  const title = filename.replace(/-/g, " ");

  return (
    <>
      <h2 className="capitalize">{title}</h2>

      <div className="space-x-4">
        {externalLibraries?.[filename as keyof typeof externalLibraries] ? (
          <>
            {externalLibraries?.[
              filename as keyof typeof externalLibraries
            ].map(({ name, href }) => (
              <a target="_blank" href={href} key={name}>
                <Badge>{name}</Badge>
              </a>
            ))}
          </>
        ) : (
          <>
            <a
              target="_blank"
              href={`https://ui.shadcn.com/docs/components/${filename}`}
            >
              <Badge>Shadcn UI</Badge>
            </a>
            <a
              target="_blank"
              href={`https://www.radix-ui.com/primitives/docs/components/${filename}`}
            >
              <Badge>Radix UI</Badge>
            </a>
          </>
        )}
      </div>

      <ScrollArea>
        <CodeHighlighter code={data.content} />
      </ScrollArea>
    </>
  );
};

export default ReactHookFormComponentsPage;
