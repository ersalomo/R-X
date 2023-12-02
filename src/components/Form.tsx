import React from "react";

interface FormProps {
  onSubmit: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Form: React.FC<FormProps> = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export default Form;
