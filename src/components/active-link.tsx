"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();

  return (
    <Button
      size="sm"
      variant={pathname === href ? "default" : "ghost"}
      className="w-full justify-start capitalize"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default ActiveLink;
