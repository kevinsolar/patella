import type { ComponentProps } from "react";

export function Card({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`rounded-[6px] border border-line bg-white text-ink ${className}`}
      {...props}
    />
  );
}
