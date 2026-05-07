import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition",
    variant === "primary" && "bg-coast-deep text-white hover:bg-coast-ink",
    variant === "secondary" && "border border-coast-sage/40 bg-white text-coast-ink hover:bg-coast-mist",
    variant === "ghost" && "text-coast-deep hover:bg-coast-mist",
    variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
