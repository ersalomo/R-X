import { Link, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";
import { UserLogin } from "../model/user";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { asyncSetAuthUser } from "../states/authUser/action";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, onChangeValue, resetForm } = useForm<UserLogin>({
    email: "",
    password: "",
  });
  const onLogin = () => {
    dispatch(asyncSetAuthUser(form));
    resetForm();
    navigate("/");
  };

  return (
    <div className="w-full mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <Form className="max-w-sm mx-auto">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <div className="mb-2 bg-white rounded-t-lg dark:bg-gray-800">
          <Label
            htmlFor="email"
            labelName="Your email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
            <Input
              type="text"
              name="email"
              id="email"
              onChange={onChangeValue}
              value={form.email}
              placeHolder="your email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </Label>
        </div>
        <div className="mb-2 bg-white rounded-t-lg dark:bg-gray-800">
          <Label
            htmlFor="email"
            labelName="Your email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
            <Input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={onChangeValue}
              placeHolder="enter password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </Label>
        </div>
        <Button onClick={onLogin} />
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link
            to="/register"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
