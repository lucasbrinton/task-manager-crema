import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Tooltip, Zoom } from "@mui/material";

import { taskPriority } from "../utils";

/**
 * Utility function to conditionally join CSS class names.
 * @param {...string} classes - Class names to join
 * @returns {string} Joined class names
 */
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Task card component with drag-and-drop support and edit/delete functionality.
 * Displays task information including title, type, priority, description, comments, and assigned members.
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Unique task identifier
 * @param {string} props.type - Task type (e.g., "Design", "Development")
 * @param {string} props.title - Task title
 * @param {Array} props.owners - Array of member objects assigned to the task
 * @param {string} props.priority - Task priority level ("Low", "Normal", "High")
 * @param {string} props.topic - Topic/column ID where task is located
 * @param {string} props.description - Full task description
 * @param {Array} props.comments - Array of comment objects
 * @param {Array} props.localTasks - All tasks in the system
 * @param {Function} props.onChange - Callback when task list changes
 * @param {Function} props.clickedTaskId - Callback when task is clicked for editing
 * @returns {JSX.Element} Task card component
 */
export const Task = ({
  id,
  type = "Design",
  title = "Unknown",
  owners = [],
  priority = "Low",
  topic = "1",
  description,
  comments = [],
  localTasks,
  onChange,
  clickedTaskId,
}) => {
  /**
   * Generates a display string for additional members beyond the first 3.
   * @returns {string|undefined} Comma-separated list of member names
   */
  const additionalMembers = () => {
    let membersArray = [];
    let membersList;
    if (owners.length > 3) {
      for (let i = 3; i < owners.length; i++) {
        membersArray.push(owners[i].name);
      }
      membersList = membersArray.toString().replaceAll(",", ", ");
    }
    return membersList;
  };

  /**
   * Deletes a task from the task list.
   * @param {string} id - Task ID to delete
   */
  const deleteTask = (id) => {
    const result = localTasks.filter((task) => task.id !== id);
    onChange(result);
  };

  /**
   * Triggers the edit task callback with the task ID.
   * @param {string} id - Task ID to edit
   */
  const getTaskId = (id) => {
    clickedTaskId(id);
  };

  /**
   * Handler for drag start event. Sets drag data for drag-and-drop functionality.
   * @param {DragEvent} evt - The drag event
   * @param {Object} data - Data containing fromTopic and ticketId
   */
  const onDragStart = (evt, data) => {
    evt.dataTransfer.setData("fromTopic", data.fromTopic);
    evt.dataTransfer.setData("ticketId", data.ticketId);
  };

  return (
    <div
      className="hover:-translate-y-1 hover:scale-105 bg-white rounded-xl shadow-lg p-4 mb-4 w-60 max-w-xs hover:shadow-2xl transition duration-300 ease-in-out"
      draggable={true}
      onDragStart={(evt) =>
        onDragStart(evt, { fromTopic: topic, ticketId: id })
      }
    >
      <div className="text-slate-400 text-sm mb-1">
        {type}
        <span className="float-right leading-3 text-lg font-medium cursor-pointer -mt-3">
          <Menu as="div" className="relative inline-block text-left">
            <div className="hover:scale-105 hover:text-black transition duration-300 ease-in-out">
              <Menu.Button>...</Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-35 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => getTaskId(id)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() =>
                          window.confirm(
                            "Are you sure you want to delete this task?"
                          ) && deleteTask(id)
                        }
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Delete
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </span>
      </div>
      <div onClick={() => getTaskId(id)} className="flex mb-2">
        <span className="text-xl font-medium grow">{title}</span>
        <span className="flex pt-1">
          <img
            className="w-3 h-3 mt-1 ml-4"
            src={`/images/${taskPriority(priority)}Flag.png`}
            alt="Flag"
          />
          <div className={`text-${taskPriority(priority)}-400 text-sm ml-1`}>
            {priority}
          </div>
        </span>
      </div>
      <div onClick={() => getTaskId(id)} className="text-slate-400 h-11">
        {description.substr(0, 50)}...
      </div>
      <hr className="mt-5" />
      <div className="flex align-bottom mt-3">
        <img src="/images/chatIcon.png" alt="" className="w-5 h-5 mr-1" />
        <span className="text-slate-400 text-sm mr-4 leading-5 grow">
          {comments.length}
        </span>
        <span className="text-slate-400 text-sm flex">
          {owners.slice(0, 3).map((owner, index) => {
            return (
              <Tooltip
                key={index}
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 200 }}
                arrow
                title={owner.name}
              >
                <img
                  className="w-7 h-7 -ml-2 rounded-full border border-white max-w-xs hover:shadow-lg transition duration-300 ease-in-out"
                  src={owner.profilePicture}
                  alt="img"
                />
              </Tooltip>
            );
          })}
          <Tooltip
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 200 }}
            arrow
            title={owners.length > 3 ? additionalMembers() : ""}
          >
            <div
              className={`${
                owners.length > 3
                  ? `bg-slate-100 w-7 h-7 -ml-2 rounded-full p-1 text-sm max-w-xs hover:shadow-lg transition duration-300 ease-in-out`
                  : ``
              }`}
            >
              {owners.length > 3 ? "+" + (owners.length - 3) : ""}
            </div>
          </Tooltip>
        </span>
      </div>
    </div>
  );
};
