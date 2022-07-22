import { useState, useEffect } from "react";
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
import { members, tasks, topics } from "./mockData";
import { topicColor, getMemberById } from "./components/utils";
import { Task } from "./components/task/Task";
import { useLocalStorage } from "./useLocalStorage";
import { NewTaskWindow } from "./components/newTaskWindow/newTaskWindow";
import { NewMemberWindow } from "./components/newMemberWindow/newMemberWindow";
import { NavBar } from "./components/navbar/navBar";
import { Header } from "./components/header/header";
import { EditTask } from "./components/task/EditTask";

export const uniqueTypes = [...new Set(tasks.map((item) => item.type))];

export const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

export const MyCheckBox = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};

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

//  ========================================================================================================================================================================================================================
//  ========================================================================================================================================================================================================================
//  ========================================================================================================================================================================================================================

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

  const groupTasksByTopic = (tasks) => {
    const topics = tasks.reduce((prev, next) => {
      prev[next.topic] = prev[next.topic]
        ? [...prev[next.topic], next]
        : [next];
      return prev;
    }, {});
    return topics;
  };

  // const handleCommentSubmit = (id) => {
  // console.log("Submitted commentValue: ", commentValue, " Task ID: ", id);
  // const tempLocalTasks = [...localTasks].map((task) => {
  //   if (task.id === id) {
  //     return {
  //       ...task,
  //       comments: [
  //         ...task.comments,
  //         {
  //           message: commentValue,
  //           owner: "user8",
  //         },
  //       ],
  //     };
  //   }
  //   return task;
  // });
  // setLocalTasks(tempLocalTasks);
  // };

  // function showTaskPreview(value) {
  //   setShowModalTaskPreview(true);
  //   previewTaskId = value;
  //   let previewTask = localTasks.filter((task) => {
  //     return previewTaskId === task.id ? task : null;
  //   });
  //   setPreviewTask(previewTask[0]);
  // }

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

  let lastTaskId = localTasks[localTasks.length - 1].id;
  let newTaskId = (parseInt(lastTaskId) + 1).toString();

  const newMemberId = () => {
    let lastMemberId = localMembers.length;
    let newMemberId = ++lastMemberId;
    return "user" + newMemberId;
  };

  const onDragOver = (evt, data) => {
    evt.preventDefault();
    // console.log("something was dragged over me", evt, data);
  };

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

  const onClickEditTaskClose = () => {
    console.log("Edit Task Modal has been closed");
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
