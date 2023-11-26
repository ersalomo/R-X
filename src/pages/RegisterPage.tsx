import { Link, useNavigate } from "react-router-dom";
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
  const { form, onChangeValue } = useForm<RegisterUser>({
    name: "",
    email: "",
    password: "",
  });

  const onRegister = (e: Event) => {
    e.preventDefault();
    dispatch(asyncRegisterUser(form));
  };
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <Form>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <div>
          <Label
            htmlFor="name"
            labelName="Your name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          />
          <Input
            type="text"
            name="name"
            onChange={onChangeValue}
            id="name"
            placeHolder="your name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <Label
            htmlFor="email"
            labelName="Your email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          />
          <Input
            type="text"
            name="email"
            onChange={onChangeValue}
            id="email"
            placeHolder="your email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <Label
            htmlFor="email"
            labelName="Your email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          />
          <Input
            type="password"
            name="password"
            onChange={onChangeValue}
            id="password"
            placeHolder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        {/* </form> */}
        <Button onClick={onRegister} />
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

export default RegisterPage;
