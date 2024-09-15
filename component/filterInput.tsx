import React, { ChangeEvent } from "react";
import Label from "@/component/Label"; // Pastikan path ini benar sesuai dengan struktur proyek kamu

interface FilterInputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  id,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <section className="w-full mb-4">
      <Label htmlFor={id} title={placeholder} />
      <input
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        className="input input-bordered"
        onChange={onChange}
        value={value}
      />
    </section>
  );
};

export default FilterInput;
