import toast from "react-hot-toast";

export const triggerProjectNotifications = () => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-200 ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">ℹ</span>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Project Update
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Gymnasium fixtures HB-200 Lot 2 delayed 5 days — new ETA Oct 15.
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="cursor-pointer w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-secondary"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      duration: 6000,
    }
  );

  // Second notification after 5 seconds
  setTimeout(() => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-200 ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">ℹ</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Crew Status</p>
                <p className="mt-1 text-sm text-gray-500">
                  Crew B idle period expected Oct 13-14.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-secondary"
            >
              Close
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    );
  }, 3000);
};
