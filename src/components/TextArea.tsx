const TextArea = (props) => {
  const {
    children,
    rows = 4,
    placeHolder = "Write a comment...",
    name = "",
  } = props;
  return (
    <textarea
      rows={rows}
      className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
      placeholder={placeHolder}
      name={name}
    />
  );
};

export default TextArea;
