import { reactHookFormComponentRegistry } from "@/__registry__/react-hook-form";
import ActiveLink from "@/components/active-link";

const files = [
  {
    name: "Form",
    href: "/react-hook-form/components/form",
  },
  ...Object.values(reactHookFormComponentRegistry).map((component) => {
    const name = component.fileName.replace(".tsx", "");
    return {
      name: name.replace(/-/g, " "),
      href: "/react-hook-form/components/" + name,
    };
  }),
];

export default function ComponentsRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container flex items-start gap-4">
      <aside className="sticky top-16 p-4 w-64 space-y-2 flex-shrink-0 h-full max-h-[calc(100vh-4.5rem)] overflow-auto">
        <h5>Components</h5>

        <div className="border-l pl-2 space-y-1">
          {files.map(({ name, href }) => (
            <ActiveLink key={name} href={href}>
              {name}
            </ActiveLink>
          ))}
        </div>
      </aside>

      {children}
    </div>
  );
}
