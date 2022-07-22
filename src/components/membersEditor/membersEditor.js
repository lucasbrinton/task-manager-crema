import { Tooltip, Zoom } from "@mui/material";

export const MembersEditor = ({ members, onClick }) => {
  return (
    <>
      {members.map((member, index) => {
        return (
          <div className="flex m-2" key={index}>
            <img
              key={index}
              className="w-12 h-12 mr-3 rounded-full border border-white max-w-xs hover:shadow-lg transition duration-300 ease-in-out float-left flex-none"
              src={member.profilePicture}
              alt="img"
            />
            <div className="font-bold float-left mt-2 grow">{member.name}</div>
            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 200 }}
              arrow
              title="Remove member"
            >
              <button
                onClick={() => onClick(member.id)}
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none flex-none"
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </Tooltip>

            <br />
          </div>
        );
      })}
    </>
  );
};
