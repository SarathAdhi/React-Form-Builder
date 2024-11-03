import { componentRegistry, ComponentRegistryType } from "@/__registry__";
import ActiveLink from "@/components/active-link";

const files = (form_type: ComponentRegistryType) => [
  {
    name: "form",
    href: `/${form_type}/components/form`,
  },
  ...Object.values(componentRegistry[form_type])
    .filter((component) => component.fileName !== "form.tsx")
    .map((component) => {
      const name = component.fileName.replace(".tsx", "");

      return {
        name: name.replace(/-/g, " "),
        href: `/${form_type}/components/` + name,
      };
    }),
];

export default function ComponentsRootLayout({
  children,
  params: { form_type },
}: Readonly<{
  children: React.ReactNode;
  params: {
    form_type: ComponentRegistryType;
  };
}>) {
  return (
    <div className="container flex items-start gap-4">
      <aside className="sticky top-16 p-4 w-64 space-y-2 flex-shrink-0 h-full max-h-[calc(100vh-4.5rem)] overflow-auto">
        <h5>Components</h5>

        <div className="border-l pl-2 space-y-1">
          {files(form_type).map(({ name, href }) => (
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
