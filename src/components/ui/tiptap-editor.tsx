"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import {
  BubbleMenu,
  EditorContent,
  EditorContentProps,
  FloatingMenu,
  useEditor,
  UseEditorOptions,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

interface Props {
  editorProps?: UseEditorOptions;
  editorContentProps?: Omit<EditorContentProps, "editor">;
}

const TiptapEditor = React.forwardRef<
  React.ElementRef<typeof EditorContent>,
  Props
>(({ editorProps, editorContentProps }, ref) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    content: `
    <p>
      Markdown shortcuts make it easy to format the text while typing.
    </p>
    <p>
      To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
    </p>
    <p>
      Those conventions are called input rules in Tiptap. Some of them are enabled by default. Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\`foobar\`</code> to highlight code, <code>~~tildes~~</code> to strike text, or <code>==equal signs==</code> to highlight text.
    </p>
    `,
    ...editorProps,
  });

  if (!editor) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <BubbleMenu
        className={cn(
          "flex items-center gap-1 p-1 rounded-lg",
          "bg-background border shadow-md"
        )}
        tippyOptions={{ duration: 100, placement: "top-start" }}
        editor={editor}
      >
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          Bold
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          Italic
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          Strike
        </MenuButton>
      </BubbleMenu>

      <FloatingMenu
        className={cn(
          "flex items-center gap-1 p-1 rounded-lg",
          "bg-background border shadow-md"
        )}
        tippyOptions={{ duration: 100, placement: "top-start" }}
        editor={editor}
      >
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          H1
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          H2
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          Bullet List
        </MenuButton>
      </FloatingMenu>

      <EditorContent
        {...editorContentProps}
        ref={ref}
        className={cn(
          "prose prose-sm max-w-none dark:prose-invert",
          "focus-within:ring-2 focus-within:ring-ring",
          "rounded-md border",
          editorContentProps?.className
        )}
        editor={editor}
      />

      <style>{`
        .ProseMirror {
          min-height: 200px;
          outline: none;
          padding: 1rem;
        }

        .ProseMirror p {
          margin: 1em 0;
        }

        .ProseMirror > *:first-child {
          margin-top: 0;
        }

        .ProseMirror code {
          @apply bg-muted px-[0.4em] py-[0.2em] rounded-sm text-sm;
        }

        .ProseMirror blockquote {
          @apply border-l-4 border-muted pl-4 italic;
        }

        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5em;
        }

        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5em;
        }
      `}</style>
    </div>
  );
});

interface MenuButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  isActive,
  children,
}) => (
  <Button
    onClick={onClick}
    variant={isActive ? "secondary" : "ghost"}
    size="sm"
    className="h-8"
    type="button"
  >
    {children}
  </Button>
);

export { TiptapEditor };
