import { Link } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";
import { useForm } from "../hooks/useForm";
import { RegisterUser } from "../model/user";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { form, onChangeValue, resetForm } = useForm<RegisterUser>({
    name: "",
    email: "",
    password: "",
  });

  const onRegister = () => {
    dispatch(asyncRegisterUser(form));
    resetForm();
  };
  return (
    <div className="w-full m-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <Form>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <div>
          <Label
            htmlFor="name"
            labelName="Your name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
            <Input
              type="text"
              name="name"
              onChange={onChangeValue}
              id="name"
              placeHolder="your name"
              value={form.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </Label>
        </div>
        <div>
          <Label
            htmlFor="email"
            labelName="Your email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
            <Input
              type="text"
              name="email"
              onChange={onChangeValue}
              id="email"
              value={form.email}
              placeHolder="your email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </Label>
        </div>
        <div>
          <Label
            htmlFor="email"
            labelName="Your email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
            <Input
              type="password"
              name="password"
              onChange={onChangeValue}
              id="password"
              value={form.password}
              placeHolder="your password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </Label>
        </div>
        <Button onClick={onRegister} text="Sign up" />
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          have an account ?{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            sign in
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
