const Label = (props) => {
  const { children, htmlFor = "", labelName, className = "" } = props;
  return (
    <>
      <label htmlFor={htmlFor} className={`sr-only ${className}`}>
        {children || labelName}dfdf
      </label>
    </>
  );
};

export default Label;
