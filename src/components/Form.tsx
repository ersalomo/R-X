const Form = (props) => {
  const { children, className } = props;
  return (
    <form className="">
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        {children}
      </div>
    </form>
  );
};

export default Form;
