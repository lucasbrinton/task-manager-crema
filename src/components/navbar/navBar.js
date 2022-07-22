import { Tooltip, Zoom } from "@mui/material";

export const NavBar = () => {
  return (
    <nav className="bg-gray-800 flex h-16 items-center">
      <div className="grow text-center">
        <div className="justify-center text-3xl text-white tracking-widest">
          CREMA
        </div>
      </div>
      <div className="flex-none">
        <Tooltip
          TransitionComponent={Zoom}
          TransitionProps={{ timeout: 200 }}
          arrow
          title="Lucas Brinton"
        >
          <img
            className="h-8 w-8 rounded-full mr-6"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="profile"
          />
        </Tooltip>
      </div>
    </nav>
  );
};
