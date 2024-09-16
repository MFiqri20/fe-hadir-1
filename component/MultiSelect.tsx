import React from "react";
import Select from "react-select";

interface OptionType {
  label: string;
  value: number;
}

interface MultiSelectProps {
  id: string;
  name: string;
  options: OptionType[];
  value: OptionType[];
  onChange: (selectedOptions: OptionType[] | any) => void;
  error?: string | string[];
  touched?: boolean;
  isFetching?: boolean; // Add isFetching prop to handle loading state
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  isFetching = false,
  error,
  touched,
}) => (
  <>
    <Select
      isMulti
      id={id}
      name={name}
      options={isFetching ? [{ label: "Loading...", value: 0 }] : options}
      value={value}
      onChange={onChange}
      className="basic-single"
      classNamePrefix="select"
    />
    {touched && error && <div className="text-red-500 text-xs">{error}</div>}
  </>
);

export default MultiSelect;
