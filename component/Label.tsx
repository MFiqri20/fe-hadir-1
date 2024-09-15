interface LabelProps {
  htmlFor: string;
  isRequired?: boolean;
  title: string;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  title,
  isRequired = false,
}) => {
  return (
    <label htmlFor={htmlFor} className="label ">
      <span className="label-text">{title}</span>{" "}
      {isRequired ? <span className="text-red-500 label-text">*</span> : <></>}
    </label>
  );
};

export default Label;
