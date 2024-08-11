import { useState, ChangeEvent, FocusEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

interface InputFieldProps {
  type?: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | any;
  touched?: boolean;
  isPassword?: boolean;
  isTextArea?: boolean; // New prop to handle multi-line input
  rows?: number; // Optional rows for textarea
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  isPassword = false,
  isTextArea = false,
  rows = 4, // Default rows for textarea
}) => {
  const [passwordType, setPasswordType] = useState(type);

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const inputClasses = isTextArea
    ? "w-full font-quick font-medium border-0 rounded-md focus:ring-0 resize-y"
    : "w-full font-quick font-medium border-0 focus:ring-0 rounded-md";

  const InputElement = isTextArea ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex rounded-md ${
          isTextArea ? "border border-[#6C757D]" : "border border-[#6C757D] "
        } focus:border-[#6C757D]`}
      >
        <InputElement
          type={isPassword ? passwordType : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={isTextArea ? rows : undefined} // Apply rows only if it's a textarea
          className={inputClasses}
        />
        {isPassword && !isTextArea && (
          <button type="button" onClick={togglePasswordVisibility}>
            {passwordType === "password" ? (
              <EyeIcon className="w-6 cursor-pointer text-gray-300 hover:text-black ease-in-out duration-150" />
            ) : (
              <EyeSlashIcon className="w-6 cursor-pointer text-gray-300 hover:text-black ease-in-out duration-150" />
            )}
          </button>
        )}
      </div>
      {touched && error && <div className="text-red-500 text-xs">{error}</div>}
    </div>
  );
};

export default InputField;
