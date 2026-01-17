import { useEffect, useState } from "react";
import { useField } from "formik";
import {
  Checkbox,
  FormControlLabel,
  Radio,
  TextField,
  Tooltip,
} from "@mui/material";
import * as yup from "yup";
import "@material-tailwind/react/tailwind.css";

import { EditTask } from "./components/task/EditTask";
import { Task } from "./components/task/Task";
import { Header } from "./components/header/header";
import { MembersEditor } from "./components/membersEditor/membersEditor";
import { NavBar } from "./components/navbar/navBar";
import { NewMemberWindow } from "./components/newMemberWindow/newMemberWindow";
import { NewTaskWindow } from "./components/newTaskWindow/newTaskWindow";
import { getMemberById, topicColor } from "./components/utils";
import { members, tasks, topics } from "./mockData";
import { useLocalStorage } from "./useLocalStorage";

export const uniqueTypes = [...new Set(tasks.map((item) => item.type))];

/**
 * Custom Material-UI Radio component integrated with Formik.
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the radio button
 * @returns {JSX.Element} Formik-controlled radio button
 */
export const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

/**
 * Custom Material-UI Checkbox component integrated with Formik.
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the checkbox
 * @returns {JSX.Element} Formik-controlled checkbox
 */
export const MyCheckBox = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};

/**
 * Custom Material-UI TextField component integrated with Formik validation.
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the input field
 * @param {string} props.placeholder - Placeholder text
 * @returns {JSX.Element} Formik-controlled text field with error handling
 */
export const MyTextField = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      label={label}
      fullWidth
    />
  );
};

/**
 * Yup validation schema for member creation.
 * Validates name length and email format.
 */
export const memberSchema = yup.object().shape({
  name: yup
    .string()
    .required("A name is required!")
    .min(2, "This name is too short!")
    .max(15, "This name is too long!"),
  email: yup
    .string()
    .email("Invalid email")
    .required("An email address is required!"),
});

/**
 * Main App component that manages task board with drag-and-drop functionality.
 * Implements a Kanban-style board where tasks can be organized across different topics/columns.
 * Persists data to localStorage for state management across sessions.
 * 
 * @returns {JSX.Element} The main application component
 */
function App() {
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalMember, setShowModalMember] = useState(false);
  const [tasksByTopic, setTasksByTopic] = useState({});
  const [localTasks, setLocalTasks] = useLocalStorage("localTasks", tasks);
  const [localMembers, setLocalMembers] = useLocalStorage(
    "localMembers",
    members
  );
  const [selectedTask, setSelectedTask] = useState(null);

  /**
   * Groups tasks by their topic/column for organized display.
   * @param {Array} tasks - Array of task objects
   * @returns {Object} Object with topic IDs as keys and arrays of tasks as values
   */
  const groupTasksByTopic = (tasks) => {
    const topics = tasks.reduce((prev, next) => {
      prev[next.topic] = prev[next.topic]
        ? [...prev[next.topic], next]
        : [next];
      return prev;
    }, {});
    return topics;
  };

  /**
   * Generates a display string for additional members beyond the first 3.
   * @returns {string|undefined} Comma-separated list of member names
   */
  const additionalMembers = () => {
    let membersArray = [];
    let membersList;
    if (localMembers.length > 3) {
      for (let i = 3; i < localMembers.length; i++) {
        membersArray.push(localMembers[i].name);
      }
      membersList = membersArray.toString().replaceAll(",", ", ");
    }
    return membersList;
  };

  /**
   * Generates a unique ID for new tasks based on the last task ID.
   * @type {string}
   */
  let lastTaskId = localTasks[localTasks.length - 1].id;
  let newTaskId = (parseInt(lastTaskId) + 1).toString();

  /**
   * Generates a unique ID for new members.
   * @returns {string} New member ID in format "userX"
   */
  const newMemberId = () => {
    let lastMemberId = localMembers.length;
    let newMemberId = ++lastMemberId;
    return "user" + newMemberId;
  };

  /**
   * Handler for drag over event (required to enable drop).
   * @param {DragEvent} evt - The drag event
   */
  const onDragOver = (evt) => {
    evt.preventDefault();
  };

  /**
   * Effect hook to hydrate task owners and comments with full member objects.
   * Runs whenever localTasks or localMembers change to keep data in sync.
   */
  useEffect(() => {
    const tasks = localTasks.map((task) => {
      const owners = task.owners.map((owner) => {
        if (typeof owner === "string") {
          return getMemberById(owner, localMembers);
        }
        return owner;
      });

      const comments = task.comments.map((comment) => {
        let owner = comment.owner;
        if (typeof owner === "string") {
          owner = getMemberById(owner, localMembers);
        }
        return {
          ...comment,
          owner,
        };
      });

      return {
        ...task,
        owners,
        comments,
      };
    });

    setTasksByTopic(groupTasksByTopic(tasks));
  }, [localTasks, localMembers]);

  /**
   * Handler for dropping a task into a new topic/column.
   * Updates the task's topic and persists to localStorage.
   * @param {DragEvent} evt - The drop event
   * @param {string} toTopic - Target topic ID where the task is being dropped
   */
  const onDrop = (evt, toTopic) => {
    evt.preventDefault();
    const ticketId = evt.dataTransfer.getData("ticketId");

    const newTasksAfterDrop = localTasks.map((task) => {
      if (ticketId === task.id) {
        return { ...task, topic: toTopic };
      }
      return task;
    });

    setLocalTasks(newTasksAfterDrop);
  };

  /**
   * Finds and sets the selected task for editing.
   * @param {string} id - The ID of the task to edit
   */
  const onClickEditTask = (id) => {
    let foundTask = null;

    for (let topicIndex in tasksByTopic) {
      const topic = tasksByTopic[topicIndex];
      for (let i = 0, imax = topic.length; i < imax; i++) {
        const task = topic[i];
        if (task.id === id) {
          foundTask = task;
          break;
        }
      }
    }

    setSelectedTask(foundTask);
  };

  /**
   * Closes the edit task modal and clears the selected task.
   */
  const onClickEditTaskClose = () => {
    setSelectedTask(null);
  };

  return (
    <>
      {selectedTask && (
        <EditTask
          task={selectedTask}
          onClose={onClickEditTaskClose}
          members={localMembers}
          localTasks={localTasks}
          setTasks={(value) => setLocalTasks(value)}
        />
      )}

      {showModalTask && (
        <NewTaskWindow
          setShowModalTask={setShowModalTask}
          newTaskId={newTaskId}
          localTasks={localTasks}
          setLocalTasks={setLocalTasks}
          localMembers={localMembers}
          setShowModalMember={setShowModalMember}
        />
      )}

      {showModalMember && (
        <NewMemberWindow
          setShowModalMember={setShowModalMember}
          newMemberId={newMemberId}
          localMembers={localMembers}
          setLocalMembers={setLocalMembers}
        />
      )}

      <div className="min-h-full">
        <NavBar />
        <Header
          localMembers={localMembers}
          additionalMembers={additionalMembers}
          setShowModalMember={setShowModalMember}
          setShowModalTask={setShowModalTask}
        />

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-inherit w-max h-full">
              <div className="flex flex-row w-full">
                {topics.map((topic, index) => (
                  // Column Start
                  <div
                    key={index}
                    className="px-4 py-8 w-64 m-3 min-h-screen"
                    onDragOver={(evt) => onDragOver(evt, { toTopic: topic.id })}
                    onDrop={(evt) => onDrop(evt, topic.id)}
                  >
                    {/* Column HEADER Start */}
                    <span
                      className={`bg-${topicColor(
                        topic.id
                      )} px-4 py-2 rounded-3xl w-max mb-4 inline-block text-center text-xs`}
                    >
                      {topic.name.toUpperCase()} (
                      {tasksByTopic[topic.id]?.length ?? 0})
                    </span>
                    <Tooltip arrow title="Add task">
                      <span
                        onClick={() => setShowModalTask(true)}
                        className="text-slate-400 float-right leading text-lg inline-block font-medium mr-4 cursor-pointer hover:scale-105 hover:text-black transition duration-300 ease-in-out"
                      >
                        +
                      </span>
                    </Tooltip>
                    {/* Column HEADER End */}
                    {/* Colum  Body Start */}
                    <div>
                      {(tasksByTopic[topic.id] ?? []).map((task, index) => (
                        <Task
                          key={index}
                          {...task}
                          members={localMembers}
                          localTasks={localTasks}
                          onChange={(value) => setLocalTasks(value)}
                          clickedTaskId={(value) => onClickEditTask(value)}
                        />
                      ))}
                    </div>
                    {/* Column Body end */}
                  </div>
                  // Column End
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
