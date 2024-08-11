import { FC, useState } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";
import CopyIcon from "./CopyToClipboardButton";

interface CopyInputProps {
  value: any;
}

const CopyInput: FC<CopyInputProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="tooltip tooltip-right mt-1"
      data-tip={copied ? "Copied" : "Copy"}
    >
      <button onClick={handleCopy} className="">
        <CopyIcon />
      </button>
    </div>
  );
};

export default CopyInput;
