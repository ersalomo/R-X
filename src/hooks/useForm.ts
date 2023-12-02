import { useState } from "react";

export const useForm = <T>(dataForm: T) => {
  const [form, useFormulir] = useState<T>(dataForm);

  const onChangeValue = (e: Event) => {
    const { name, value } = e.target;
    useFormulir((prev: T) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const resetForm = () => {
    useFormulir(dataForm);
  };

  return {
    form,
    onChangeValue,
    resetForm,
  };
};
