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
  style,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`w-fit text-sm capitalize ${style || ""}`}
    >
      {title} {isRequired ? <span className="text-red-500">*</span> : <></>}
    </label>
  );
};

export default Label;
