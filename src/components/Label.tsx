const Label = (props) => {
  const { children, htmlFor = "", labelName } = props;
  return (
    <>
      <label htmlFor={htmlFor} className="sr-only">
        {labelName}
      </label>
    </>
  );
};

export default Label;
