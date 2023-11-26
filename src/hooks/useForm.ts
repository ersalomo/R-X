import { useEffect, useState } from "react";
import { RegisterUser, User, UserLogin } from "../model/user";

export const useForm = <T extends UserLogin | RegisterUser>(user: T) => {
  const [form, useForm] = useState<T>(user);

  const onChangeValue = (e: Event) => {
    const { name, value } = e.target;
    useForm((prev: T) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // useEffect(() => {},[]);
  };
  return {
    form,
    onChangeValue,
  };
};
