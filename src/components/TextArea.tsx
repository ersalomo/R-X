import React from "react";

interface InputProps {
  id?: string;
  className?: string;
  rows?: number;
  onChange: (e: Event) => void;
  name: string;
  value: string | number;
  placeHolder?: string;
  text?: string;
}
const TextArea: React.FC<InputProps> = ({
  id,
  rows = 4,
  placeHolder = "type something...",
  name = "",
  value,
  onChange,
}) => {
  return (
    <textarea
      id={id}
      value={value}
      rows={rows}
      onChange={onChange}
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      placeholder={placeHolder}
      name={name}
    />
  );
};

export default TextArea;
