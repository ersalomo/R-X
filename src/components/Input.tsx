const Input = (props) => {
  const {
    id,
    type = "text",
    name,
    className = "",
    onChange,
    placeHolder = "input something...",
  } = props;
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder={placeHolder}
      />
    </>
  );
};

export default Input;
