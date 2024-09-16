import clsx from "clsx";
import { ChangeEvent } from "react";
import CircularProgress from "@mui/material/CircularProgress";

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
  isFetching?: boolean; // Add isFetching prop to handle loading state
}

const Select: React.FC<
  ButtonProps & React.SelectHTMLAttributes<HTMLSelectElement>
> = ({
  options,
  value,
  name,
  id,
  style = "",
  messageError = "wajib di isi",
  isError = false,
  isFetching = false, // Default to false
  ...props
}) => {
  return (
    <section className="w-full relative">
      <select
        value={value}
        name={name}
        id={id}
        
        className={clsx(`${style} w-full h-10 border rounded px-2`, {
          "border-red-500 border-2": isError,
          "border-gray-700": !isError,
        })}
        {...props}
        disabled={isFetching} // Disable the select element while fetching
      >
        <option value="">Pilih</option>
        {isFetching ? (
          <option disabled>
            <CircularProgress size={24} />
          </option> // Show loading option when fetching
        ) : (
          options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
      {isError && (
        <p className="text-red-500 font-bold">{messageError}</p>
      )}
    </section>
  );
};

export default Select;
