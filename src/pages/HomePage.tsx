import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThreadResponse } from "../model/thread";
import { asyncToggleLikeThread } from "../states/threads/action";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { VoteType, voteTypeValue } from "../utils/api";
import ThumbsUpIcon from "../assets/thumbs-up.svg?react";
import ThumbsUpFullIcon from "../assets/thumbs-up-full.svg?react";
import ThumbsDownFullIcon from "../assets/thumbs-down-full.svg?react";
import ThumbsDownIcon from "../assets/thumbs-down.svg?react";
import { postedAt } from "../utils";
import { asyncPopulateThreadsAndUsers } from "../states/shared/action";

const HomePage = () => {
  const dispatch = useDispatch();
  const { threads, authUser } = useSelector((states) => states);

  const [selectedCategory, setSelectedCategory] = useState(
    window.location.hash.substring(1),
  );
  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers(selectedCategory));
  }, [dispatch, selectedCategory]);

  const onToogleLike = (threadId: string, voteType: VoteType) => {
    dispatch(asyncToggleLikeThread(threadId, voteType));
  };

  return (
    <>
      {/* md:grid-cols-2 */}
      <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 ">
        {threads.map((thread: ThreadResponse) => {
          const { id, title, body, category, createdAt, owner } = thread;
          return (
            <figure
              key={id}
              className="flex flex-col p-8 bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-3 text-gray-500">
                <div>
                  <a
                    className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2"
                    onClick={() =>
                      setSelectedCategory((prev) =>
                        prev === category ? "" : category,
                      )
                    }
                    href={`/#${category}`}
                  >
                    #{category}
                  </a>
                </div>
                <span className="text-sm">
                  Published{" "}
                  <time dateTime={createdAt}>{postedAt(createdAt)}</time>
                </span>
              </div>

              <blockquote className="max-w-2xl text-start  mb-2 text-gray-500 lg:mb-4 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  <Link to={`threads/${id}`} className="hover:underline">
                    {title}
                  </Link>
                </h3>

                <div className="body line-clamp-3 overflow-hidden">
                  {ReactHtmlParser(body)}
                </div>

                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    onClick={() => onToogleLike(id, voteTypeValue.upVote)}
                    className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                  >
                    {thread.upVotesBy.includes(authUser.id) ? (
                      <ThumbsUpFullIcon />
                    ) : (
                      <ThumbsUpIcon />
                    )}
                    ({thread.upVotesBy.length})
                  </button>
                  <button
                    onClick={() => onToogleLike(id, voteTypeValue.downVote)}
                    type="button"
                    className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                  >
                    {thread.downVotesBy.includes(authUser.id) ? (
                      <ThumbsDownFullIcon />
                    ) : (
                      <ThumbsDownIcon />
                    )}
                    ({thread.downVotesBy.length})
                  </button>
                  <span>comments ({thread.totalComments})</span>
                </div>
              </blockquote>
              <div className="flex items-center justify-between">
                <a className="flex items-center space-x-2" href="#">
                  <img
                    className="rounded-full w-7 h-7"
                    src={owner?.avatar}
                    alt={`${owner?.name} profile picture`}
                  />
                  <span className="font-medium dark:text-white">
                    {owner?.name}
                  </span>
                </a>
                <Link
                  to={`threads/${id}`}
                  className="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </figure>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
