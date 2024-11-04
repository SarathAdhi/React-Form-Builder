"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: LinkProps["href"];
} & React.ComponentProps<typeof Button>;

const ActiveLink: React.FC<Props> = ({ children, href, className }) => {
  const pathname = usePathname();

  return (
    <Button
      size="sm"
      variant={pathname === href ? "default" : "ghost"}
      className={cn("w-full justify-start capitalize", className)}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default ActiveLink;
