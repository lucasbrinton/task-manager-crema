import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { memberSchema, MyTextField } from "../../App";

export const NewMemberWindow = ({
  setShowModalMember,
  newMemberId,
  localMembers,
  setLocalMembers,
}) => {
  return (
    <>
      <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold pr-6">Add New Member</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModalMember(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative pt-6 pr-10 pb-6 pl-6">
              <Formik
                initialValues={{
                  id: newMemberId(),
                  name: "",
                  email: "",
                  profilePicture:
                    "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2159&q=80",
                }}
                validationSchema={memberSchema}
                onSubmit={(data) => {
                  const updatedMembers = [...localMembers, data];
                  setLocalMembers(updatedMembers);
                  setShowModalMember(false);
                }}
              >
                {() => (
                  <Form>
                    <div className="mb-4">
                      <MyTextField name="name" type="input" label="Name" />
                    </div>
                    <MyTextField name="email" type="email" label="Email" />
                    <div className="flex items-center justify-end pt-6 mt-6 border-t border-solid border-slate-200 rounded-b">
                      <span>
                        <Button
                          style={{
                            borderRadius: 5,
                            backgroundColor: "transparent",
                            color: "red",
                          }}
                          onClick={() => setShowModalMember(false)}
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
                          Add Member
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
