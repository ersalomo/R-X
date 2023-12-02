import Button from "../components/Button";
import Form from "../components/Form";
import Label from "../components/Label";
import TextArea from "../components/TextArea";
import Input from "../components/Input";
import { useForm } from "../hooks/useForm";
import { ThreadRequest } from "../model/thread";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../states/threads/action";

const CreateThreadPage = () => {
  const dispatch = useDispatch();
  const { form, onChangeValue, resetForm } = useForm<ThreadRequest>({
    title: "",
    category: "",
    body: "",
  });

  const onPostTweet = () => {
    dispatch(asyncAddThread(form));
    resetForm();
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <Form>
        <div className=" mb-2 bg-white rounded-t-lg dark:bg-gray-800">
          <Label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
            <Input
              name="title"
              placeHolder="enter title"
              value={form.title}
              onChange={onChangeValue}
            />
          </Label>
        </div>
        <div className="mb-2 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <Label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
            <Input
              name="category"
              value={form.category}
              placeHolder="enter category"
              onChange={onChangeValue}
            />
          </Label>
        </div>
        <div className=" bg-white rounded-t-lg dark:bg-gray-800">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Body
            <TextArea
              name="body"
              placeHolder=""
              value={form.body}
              onChange={onChangeValue}
            />
          </Label>
        </div>
        <Button text="Post tweet" onClick={onPostTweet} />
      </Form>
    </div>
  );
};

export default CreateThreadPage;
