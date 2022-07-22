import { Tooltip, Zoom } from "@mui/material";

export const Header = ({
  localMembers,
  additionalMembers,
  setShowModalMember,
  setShowModalTask,
}) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex gap-3">
        <h1 className="text-3xl font-bold text-gray-900 grow">Tasks</h1>
        <div className="text-slate-400 text-sm flex mt-2 ">
          {localMembers.slice(0, 3).map((member, index) => {
            return (
              <Tooltip
                key={index}
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 300 }}
                arrow
                title={member.name}
              >
                <img
                  className="w-7 h-7 -ml-2 rounded-full border border-white max-w-xs hover:shadow-lg transition duration-300 ease-in-out"
                  src={member.profilePicture}
                  alt="img"
                />
              </Tooltip>
            );
          })}
          <Tooltip
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 300 }}
            arrow
            title={additionalMembers()}
          >
            <div
              className={`${
                localMembers.length > 3
                  ? `bg-slate-100 w-7 h-7 -ml-2 rounded-full p-1 text-sm max-w-xs hover:shadow-lg transition duration-300 ease-in-out`
                  : ``
              }`}
            >
              {localMembers.length > 3 ? "+" + (localMembers.length - 3) : ""}
            </div>
          </Tooltip>
        </div>
        <button
          onClick={() => setShowModalMember(true)}
          className="transition ease-in-out delay-100 bg-transparent hover:-translate-y-1 hover:scale-105 duration-300 hover:bg-blue-500 text-slate-700 hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded mr-2"
        >
          + Member
        </button>
        <button
          onClick={() => setShowModalTask(true)}
          className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
        >
          + New Task
        </button>
      </div>
    </header>
  );
};
