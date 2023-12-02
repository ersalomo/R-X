import React from "react";

interface InputProps {
  id: string;
  type: "text" | "file";
  name: string;
  className?: string;
  value: string | number;
  onChange: (e: Event) => void;
  children: React.ReactNode;
  placeHolder: string;
  text?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  name,
  className = "",
  value,
  onChange,
  placeHolder = "input something...",
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={
          className +
          "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        }
        placeholder={placeHolder}
      />
    </>
  );
};

export default Input;
