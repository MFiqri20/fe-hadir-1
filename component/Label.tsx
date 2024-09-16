interface LabelProps {
  htmlFor: string;
  isRequired?: boolean;
  title: string;
  style?: string;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  title,
  isRequired = false,
  style = "",
}) => {
  return (
    <label htmlFor={htmlFor} className={`${style} label`}>
      <span className="label-text">{title}</span>{" "}
      {isRequired ? <span className="text-red-500 label-text">*</span> : <></>}
    </label>
  );
};

export default Label;
