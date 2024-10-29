import ActiveLink from "@/components/active-link";

export default async function ComponentsRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-components`
  );

  const data = await response.json();

  const _files = data.files as string[];

  const files = _files.map((file) => {
    const name = file.replace(".tsx", "");
    return {
      name: name.replace(/-/g, " "),
      href: "/components/" + name,
    };
  });

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

      <div className="py-4 w-full space-y-4 overflow-auto">{children}</div>
    </div>
  );
}
