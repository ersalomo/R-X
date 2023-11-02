const LeaderBoardPage = (props) => {
  return (
    <div className="w-full">
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {[893, 323, 9100, 700, 2130]
          .sort((a, b) => b - a)
          .map((num, i) => {
            return (
              <li key={i} className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`https://flowbite.com/docs/images/people/profile-picture-${
                        i + 1
                      }.jpg`}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@flowbite.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {num}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LeaderBoardPage;
