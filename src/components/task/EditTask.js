import React, { useState } from "react";
import { DescriptionEditor } from "../descriptionEditor/descriptionEditor";
import { MembersEditor } from "../membersEditor/membersEditor";
import { TextField, Box, Button } from "@mui/material";
import { getMemberById } from "../utils";

export const EditTask = ({ task, onClose, members, localTasks, setTasks }) => {
  const [commentValue, setCommentValue] = useState("");
  const [editableTask, setEditableTask] = useState(task);

  const onClickCloseTaskEditModal = () => {
    onClose();
  };

  const onClickSubmitComment = () => {
    const currentDateAndTime = new Date().toLocaleString();

    const newComment = {
      message: commentValue,
      owner: getMemberById("user8", members),
      date: currentDateAndTime,
    };

    const updatedCommentsTasks = [...localTasks].map((t) => {
      if (t.id === editableTask.id) {
        return {
          ...t,
          comments: [...t.comments, newComment],
        };
      }
      return t;
    });

    setTasks(updatedCommentsTasks);

    setEditableTask({
      ...editableTask,
      comments: [...editableTask.comments, newComment],
    });
    setCommentValue("");
  };

  const onDescriptionChange = (description) => {
    const updatedDescriptionTasks = [...localTasks].map((t) => {
      if (t.id === editableTask.id) {
        return {
          ...t,
          description: description,
        };
      }
      return t;
    });
    setTasks(updatedDescriptionTasks);
    console.log("description change", description);
  };

  const onMembersChange = (clickedOwnerId) => {
    let updatedOwners;

    const updatedTasks = [...localTasks].map((t) => {
      if (t.id === editableTask.id) {
        updatedOwners = t.owners.filter((id) => id !== clickedOwnerId);
        return {
          ...t,
          owners: updatedOwners,
        };
      }
      return t;
    });

    setTasks(updatedTasks);

    setEditableTask({
      ...editableTask,
      owners: updatedOwners.map((id) => members.filter((m) => m.id === id)[0]),
    });
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  return (
    <>
      <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{editableTask.title}</h3>
              <h3 className="text-gray-500 text-lg pt-2 ml-3">
                - {editableTask.type}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClickCloseTaskEditModal}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 block">
              <div className="flex">
                <div className="w-3/5 mr-6">
                  <div className="font-bold m-2 text-xl border-b border-solid border-slate-200">
                    Description
                  </div>

                  <DescriptionEditor
                    description={editableTask.description}
                    onChange={onDescriptionChange}
                  />
                </div>

                <div className="w-2/5">
                  <div className="border-b border-solid border-slate-200 flex">
                    <span className="font-bold m-2 text-xl grow">Owners</span>
                    <span className="grow-0">
                      <Button
                        style={{
                          borderRadius: 5,
                          backgroundColor: "transparent",
                          color: "blue",
                        }}
                        onClick={() => console.log("add owners clicked")}
                      >
                        +
                      </Button>
                    </span>
                  </div>

                  <div className="max-h-48 overflow-scroll">
                    <MembersEditor
                      members={editableTask.owners}
                      onClick={(ownerId) => onMembersChange(ownerId)}
                    />
                  </div>
                </div>
              </div>
              <div className="block mt-6">
                <div className="font-bold m-2 text-xl border-b border-solid border-slate-200">
                  Comments
                </div>
                <div className="max-h-80 overflow-scroll rounded-lg block">
                  {editableTask.comments.length > 0 ? (
                    <div>
                      {editableTask.comments.map((comment, index) => {
                        return (
                          <div
                            className="block my-2 p-2 bg-slate-100 rounded-lg"
                            key={index}
                          >
                            <span>
                              <img
                                className="w-12 h-12 mr-3 rounded-full border border-white max-w-xs hover:shadow-lg transition duration-300 ease-in-out float-left"
                                src={comment?.owner?.profilePicture}
                                alt="img"
                              />
                            </span>
                            <span>
                              <div className="font-bold float-left mr-3 text-lg">
                                {comment?.owner?.name}
                              </div>
                              <span className="text-gray-500 float-right text-sm">
                                {comment.date}
                              </span>
                              <br />
                              <div className="ml-12 p-2">{comment.message}</div>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    "There are no comments yet"
                  )}
                </div>
              </div>
              <div className="my-6 mx-3">
                <img
                  className="w-12 h-12 mr-3 rounded-full border border-white
                    max-w-xs hover:shadow-lg transition duration-300 ease-in-out
                    float-left"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="img"
                />
                <div className="float-left">
                  <Box
                    component="form"
                    sx={{
                      width: 600,
                      maxWidth: "100%",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      fullWidth
                      label="Add your comment..."
                      multiline
                      rows={3}
                      value={commentValue}
                      onChange={handleCommentChange}
                    />
                  </Box>
                </div>
              </div>
              <div className="ml-14">
                <Button
                  disabled={commentValue ? false : true}
                  variant="contained"
                  style={{
                    borderRadius: "5px",
                    marginLeft: "20px",
                    marginTop: "20px",
                    backgroundColor: "rgb(59 130 246 / var(--tw-bg-opacity))",
                  }}
                  onClick={() => onClickSubmitComment()}
                >
                  Post
                </Button>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClickCloseTaskEditModal}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
