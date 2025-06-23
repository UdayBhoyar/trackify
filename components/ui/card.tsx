import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, style, ...props }: CardProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        padding: 16,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, style, ...props }: CardProps) {
  return (
    <div
      className={className}
      style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 8, marginBottom: 16, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className, style, ...props }: CardProps) {
  return (
    <div className={className} style={{ ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, style, ...props }: CardProps) {
  return (
    <h2
      className={className}
      style={{ fontWeight: "700", fontSize: 18, margin: 0, ...style }}
      {...props}
    >
      {children}
    </h2>
  );
}
