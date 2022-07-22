import { Formik, Field, Form } from "formik";
import { Button, Select, MenuItem } from "@mui/material";
import * as yup from "yup";
import { topics } from "../../mockData";

import { MyTextField, uniqueTypes, MyCheckBox, MyRadio } from "../../App";

const createTaskSchema = yup.object().shape({
  title: yup
    .string()
    .required("A title is required!")
    .min(2, "This title is too short!")
    .max(15, "This title is too long!"),
});

let selectTopics = [];
selectTopics = topics.map((topic) => {
  return { value: topic.id, label: topic.name };
});

export const NewTaskWindow = ({
  setShowModalTask,
  newTaskId,
  localTasks,
  setLocalTasks,
  localMembers,
  setShowModalMember,
}) => {
  return (
    <>
      <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-96 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Create New Task</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModalTask(false)}
              >
                <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6">
              <Formik
                initialValues={{
                  id: newTaskId,
                  type: "",
                  title: "",
                  owners: [],
                  priority: "Low",
                  topic: "",
                  description: "",
                  comments: [],
                }}
                validationSchema={createTaskSchema}
                onSubmit={(data) => {
                  const updatedTasks = [...localTasks, data];
                  setLocalTasks(updatedTasks);
                  setShowModalTask(false);
                }}
              >
                {() => (
                  <Form>
                    <div className="pr-5 pb-5">
                      <MyTextField name="title" type="input" label="Title" />
                    </div>
                    <div className="pr-5 pb-5">
                      <div>Topic: </div>
                      <Field name="topic" type="select" as={Select} fullWidth>
                        {selectTopics.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="pr-5 pb-5">
                      <div>Type: </div>
                      <Field name="type" type="select" as={Select} fullWidth>
                        {uniqueTypes.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="pr-5 pb-5">
                      <MyTextField
                        name="description"
                        type="input"
                        label="Description"
                      />
                    </div>
                    <div className="pr-5 pb-5">
                      <div>Members:</div>
                      <div className="max-h-20 overflow-y-auto border border-solid border-slate-300 rounded-md pl-1.5">
                        {localMembers.map((member, index) => (
                          <div>
                            <MyCheckBox
                              key={index}
                              name="owners"
                              type="checkbox"
                              value={member.id}
                              label={member.name}
                            />
                          </div>
                        ))}
                      </div>
                      <Button
                        className="cursor-pointer"
                        onClick={() => setShowModalMember(true)}
                      >
                        New member
                      </Button>
                    </div>
                    <div className="pr-5 pb-5">
                      <div>Task Priority:</div>
                      <MyRadio
                        name="priority"
                        type="radio"
                        value="Low"
                        label="Low"
                      />
                      <MyRadio
                        name="priority"
                        type="radio"
                        value="Normal"
                        label="Normal"
                      />
                      <MyRadio
                        name="priority"
                        type="radio"
                        value="High"
                        label="High"
                      />
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <span>
                        <Button
                          style={{
                            borderRadius: 5,
                            backgroundColor: "transparent",
                            color: "red",
                          }}
                          onClick={() => setShowModalTask(false)}
                        >
                          Cancel
                        </Button>
                      </span>
                      <span>
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 5,
                            marginLeft: 20,
                            backgroundColor:
                              "rgb(16 185 129 / var(--tw-bg-opacity))",
                          }}
                          type="submit"
                        >
                          Add task
                        </Button>
                      </span>
                    </div>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
