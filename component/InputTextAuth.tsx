import { useState, ChangeEvent, FocusEvent } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

interface InputFieldProps {
  type?: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string | any;
  touched?: boolean;
  isPassword?: boolean;
}

const InputFieldAuth: React.FC<InputFieldProps> = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  isPassword = false,
}) => {
  const [passwordType, setPasswordType] = useState(type);

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div className={`flex border-b border-[#6C757D] border-x-0 border-t-0 focus:border-[#6C757D]`}>
        <input
          type={isPassword ? passwordType : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full font-quick font-medium border-0 focus:ring-0"
        />
        {isPassword && (
          <button type="button" onClick={togglePasswordVisibility}>
            {passwordType === 'password' ? (
              <EyeIcon className="w-6 cursor-pointer text-gray-300 hover:text-black ease-in-out duration-150" />
            ) : (
              <EyeSlashIcon className="w-6 cursor-pointer text-gray-300 hover:text-black ease-in-out duration-150" />
            )}
          </button>
        )}
      </div>
      {touched && error && (
        <div className="text-red-500 text-xs">{error}</div>
      )}
    </div>
  );
};

export default InputFieldAuth;
