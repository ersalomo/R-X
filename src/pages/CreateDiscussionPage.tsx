import Button from "../components/Button";
import Form from "../components/Form";
import Label from "../components/Label";
import TextArea from "../components/TextArea";

const CreateDiscussionPage = (props) => {
  const onPostTweet = (e) => {
    e.preventDefault();
    alert("okw");
  };
  return (
    <div className="w-full p-2">
      <Form>
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <Label />
          <TextArea />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <Button type="submit" text="Post tweet" onClick={onPostTweet} />
        </div>
      </Form>
    </div>
  );
};

export default CreateDiscussionPage;
