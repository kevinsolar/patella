import type { ComponentProps } from "react";
import { getExternalLinkProps } from "@/lib/link-props";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  secondary:
    "border border-line bg-white text-ink hover:border-line-hover",
  ghost: "bg-transparent text-ink hover:text-brand",
};

export function ButtonLink({
  className = "",
  href,
  rel,
  target,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`link-shift inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold leading-none outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      href={href}
      {...getExternalLinkProps({ href, rel, target })}
      {...props}
    />
  );
}
