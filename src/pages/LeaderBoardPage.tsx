import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";
import { LeaderBoard } from "../model/leaderboard";
import { UserResponse } from "../model/user";

const LeaderBoardPage = () => {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);
  return (
    <>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Leaderboards
          </h5>
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboards
              .sort((a, b) => b.score - a.score)
              .map((board: LeaderBoard) => {
                const { name, avatar, id, email }: UserResponse = board.user;
                const { score } = board;
                return (
                  <li key={id} className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`${avatar}`}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {score}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeaderBoardPage;
