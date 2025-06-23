import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, style, ...props }: ButtonProps) {
  return (
    <button
      className={className}
      style={{
        padding: "12px 20px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: 14,
        backgroundColor: "#16a34a",
        color: "white",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
