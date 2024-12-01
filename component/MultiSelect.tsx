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
  style?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  error,
  touched,
  style,
}) => (
  <>
    <div
      className={`border border-[#6C757D] rounded-md h-[60px] ${style || ""}`}
    >
      <Select
        isMulti
        id={id}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        className={`w-full h-full`}
        classNamePrefix="select"
        styles={{
          control: (provided) => ({
            ...provided,
            height: "100%",
            minHeight: "100%",
            fontSize: "20px", // Set the font size to 20px
          }),
          valueContainer: (provided) => ({
            ...provided,
            height: "100%",
            padding: "0 8px",
            display: "flex",
            alignItems: "center",
            fontSize: "20px", // Apply font size to the selected values
          }),
          input: (provided) => ({
            ...provided,
            fontSize: "20px", // Set font size for input text
          }),
          singleValue: (provided) => ({
            ...provided,
            fontSize: "20px", // Font size for single select values
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: "20px", // Font size for placeholder text
            fontWeight: "semibold",
          }),
          menu: (provided) => ({
            ...provided,
            fontSize: "20px", // Font size for dropdown menu
          }),
          option: (provided) => ({
            ...provided,
            fontSize: "20px", // Font size for options in dropdown
          }),
        }}
      />
      {touched && error && <div className="text-red-500 text-xs">{error}</div>}
    </div>
  </>
);

export default MultiSelect;
