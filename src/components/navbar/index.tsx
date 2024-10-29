import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const pages: {
  title: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  href?: string;
  items?: { title: string; href: string }[];
}[] = [
  {
    title: "Components",
    items: [
      {
        title: "All Components",
        href: "/components",
      },
      {
        title: "React Hook Form",
        href: "/react-hook-form/components",
      },
      {
        title: "TanStack Form",
        href: "/tanstack-form/components",
      },
      {
        title: "Formik",
        href: "/formik/components",
      },
    ],
  },
  {
    title: "Playground",
    variant: "default",
    items: [
      {
        title: "React Hook Form",
        href: "/react-hook-form/playground",
      },
      {
        title: "TanStack Form",
        href: "/tanstack-form/playground",
      },
      {
        title: "Formik",
        href: "/formik/playground",
      },
    ],
  },
];

const Navbar = () => {
  return (
    <nav className="z-50 sticky top-0 border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="sr-only">Home</span>
          <Image
            src="/assets/logo.png"
            width={120}
            height={120}
            className="size-10"
            alt="Logo"
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-2 text-sm">
            {pages.map(({ title, href, items, variant }) => {
              const hasItems = items && items.length > 0;

              if (!hasItems) {
                return (
                  <li key={title}>
                    <Button
                      variant={variant || "ghost"}
                      rounded="full"
                      size="sm"
                    >
                      <Link href={href!}>{title}</Link>
                    </Button>
                  </li>
                );
              }

              return (
                <DropdownMenu key={title}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={variant || "ghost"}
                      rounded="full"
                      size="sm"
                    >
                      {title}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {items.map((item) => (
                      <DropdownMenuItem key={item.title} asChild>
                        <Link href={item.href}>{item.title}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </ul>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
