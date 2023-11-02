const Button = (props) => {
  const { children, onClick, text = "button", type } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
    >
      {children || text}
    </button>
  );
};
export default Button;
