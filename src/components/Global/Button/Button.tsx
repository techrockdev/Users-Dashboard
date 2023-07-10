import { ReactNode } from "react";

type ButtonType = React.ComponentProps<"button"> & { children: ReactNode };

export const Button = ({ className, children, ...props }: ButtonType) => {
  return (
    <button {...props} className={`rounded border-none bg-accent p-2 font-bold text-white outline-none ${className}`}>
      {children}
    </button>
  );
};
