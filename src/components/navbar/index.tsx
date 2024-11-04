import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VariantProps } from "class-variance-authority";
import { GithubIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "../active-link";

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
        href: "/components/calendar",
      },
      {
        title: "React Hook Form",
        href: "/react-hook-form/components/form",
      },
      {
        title: "TanStack Form",
        href: "/tanstack-form/components/form",
      },
      {
        title: "Formik",
        href: "/formik/components/form",
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
                    <Button variant={variant || "ghost"} rounded="full">
                      <Link href={href!}>{title}</Link>
                    </Button>
                  </li>
                );
              }

              return (
                <li key={title}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={variant || "ghost"} rounded="full">
                        {title}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      {items.map((item) => (
                        <DropdownMenuItem key={item.title} asChild>
                          <ActiveLink href={item.href}>{item.title}</ActiveLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              );
            })}

            <li>
              <Button variant="outline" rounded="full" size="icon" asChild>
                <a
                  target="_blank"
                  href="https://github.com/SarathAdhi/React-Form-Builder"
                >
                  <GithubIcon className="!size-5" />
                </a>
              </Button>
            </li>
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
