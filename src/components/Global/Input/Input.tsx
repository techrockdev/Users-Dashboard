import { ReactNode } from "react";

type InputType = React.ComponentProps<"input"> & { icon?: ReactNode };

export const Input = ({ className, icon, ref, ...props }: InputType) => {
  return (
    <div className={`border-b-2 border-b-[#ebebeb] ${className} flex cursor-pointer items-center p-1 py-0`}>
      {icon}
      <input {...props} className="w-full rounded-lg border-none p-2 outline-none " />
    </div>
  );
};
