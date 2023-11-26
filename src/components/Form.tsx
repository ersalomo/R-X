const Form = (props) => {
  const { children, className, onSubmit } = props;
  return (
    <form className="space-y-6">
      {/* <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"> */}
      {children}
      {/* </div> */}
    </form>
  );
};

export default Form;
