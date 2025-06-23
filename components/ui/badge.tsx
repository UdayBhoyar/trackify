import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Badge({ children, className, style, ...props }: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 12,
        fontWeight: "600",
        fontSize: 14,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
