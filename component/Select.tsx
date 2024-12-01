import clsx from "clsx";
import { ChangeEvent } from "react";

type Variant = "solid" | "outline";
type ColorSchema = "blue" | "red" | "green";

interface ButtonProps {
  options: { value: string | number; label: string }[];
  name: string;
  isError?: boolean;
  messageError?: string;
  id: string;
  value: string | number | null | undefined;
  style?: string;
}

const Select: React.FC<
  ButtonProps & React.SelectHTMLAttributes<HTMLSelectElement>
> = ({
  options,
  value,
  name,
  id,
  messageError = "wajib di isi",
  isError = false,
  style,
  ...props
}) => {
  return (
    <section className="w-full">
      <select
        value={value}
        name={name}
        id={id}
        className={clsx(`border rounded px-2 font-medium text-xl text-[#495057] ${style || ""}`, {
          "border-red-500 border-2": isError,
          "border-gray-700": !isError,
        })}
        {...props}
      >
        <option>Choose Initial</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isError ? (
        <p className="text-red-500 font-bold">{messageError}</p>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Select;
