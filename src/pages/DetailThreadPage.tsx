import { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncGetDetailThread } from "../states/threadDetail/action";
import { useSelector } from "react-redux";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import {
  asyncAddComment,
  asyncToggleLikeComment,
} from "../states/comments/action";
import { useForm } from "../hooks/useForm";
import { postedAt } from "../utils";
import { VoteCommentReq } from "../model/comment";
import { voteTypeValue } from "../utils/api";
import ThumbsUpIcon from "../assets/thumbs-up.svg?react";
import ThumbsUpFullIcon from "../assets/thumbs-up-full.svg?react";
import ThumbsDownFullIcon from "../assets/thumbs-down-full.svg?react";
import ThumbsDownIcon from "../assets/thumbs-down.svg?react";

const DetailThreadPage = () => {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { detailThread, authUser } = useSelector((states) => ({
    detailThread: states.detailThread,
    authUser: states.authUser,
  }));
  const { form, onChangeValue, resetForm } = useForm<{ content: string }>({
    content: "",
  });

  useEffect(() => {
    dispatch(asyncGetDetailThread(threadId));
  }, [threadId, dispatch]);

  const onPostComment = () => {
    dispatch(
      asyncAddComment({
        content: form.content,
        threadId,
      }),
    );
    resetForm();
  };

  const onToggleLike = (req: VoteCommentReq) => {
    dispatch(asyncToggleLikeComment(req));
  };

  if (!detailThread) return null;

  const { title, body, owner, comments, category, createdAt } = detailThread;
  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {title}
              </h1>
              <div className="flex flex-wrap mb-4">
                <a
                  className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2"
                  href="#"
                >
                  #{category}
                </a>
              </div>
              <div className="text-base text-slate-500 flex space-x-2">
                <img
                  src={owner.avatar}
                  alt={owner.name}
                  className="rounded-full w-7 h-7"
                />
                <address className="inline">
                  Published by{" "}
                  <a
                    rel="author"
                    className="text-gray-900 no-underline dark:text-white hover:underline"
                    href=""
                  >
                    {owner.name}
                  </a>
                </address>{" "}
                <time dateTime="1677146503000">{postedAt(createdAt)}</time>
              </div>
            </header>
            <div className="lead text-slate-400">{ReactHtmlParser(body)}</div>

            <section className="not-format">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Comments ({comments.length})
                </h2>
              </div>
              <div className="mb-4">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <TextArea
                    id="comment"
                    rows={6}
                    name="content"
                    value={form.content}
                    onChange={onChangeValue}
                    placeholder="Write a comment..."
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  />
                </div>
                <Button
                  onClick={onPostComment}
                  className=" inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  text="Post comment"
                />
              </div>

              {comments.map((comment) => {
                return (
                  <article
                    key={comment.id}
                    className="p-6 mb-6 text-base border-t text-slate-400 border-gray-200 bg-white rounded-lg dark:bg-gray-900"
                  >
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={comment.owner.avatar}
                            alt={comment.owner.name}
                          />
                          {comment.owner.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time
                            dateTime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            {postedAt(comment.createdAt)}
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p>{ReactHtmlParser(comment.content)}</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button
                        onClick={() =>
                          onToggleLike({
                            threadId,
                            commentId: comment.id,
                            voteType: voteTypeValue.upVote,
                          })
                        }
                        type="button"
                        className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                      >
                        {comment.upVotesBy.includes(authUser.id) ? (
                          <ThumbsUpFullIcon />
                        ) : (
                          <ThumbsUpIcon />
                        )}
                        ({comment.upVotesBy.length})
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onToggleLike({
                            threadId,
                            commentId: comment.id,
                            voteType: voteTypeValue.downVote,
                          })
                        }
                        className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                      >
                        {comment.downVotesBy.includes(authUser.id) ? (
                          <ThumbsDownFullIcon />
                        ) : (
                          <ThumbsDownIcon />
                        )}
                        ({comment.downVotesBy.length})
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>
          </article>
        </div>
      </main>
    </>
  );
};
export default DetailThreadPage;
