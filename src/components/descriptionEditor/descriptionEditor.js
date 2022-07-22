import { useState } from "react";

export const DescriptionEditor = ({ description, onChange }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const triggerSuccessNotification = (delay = 3000) => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, delay);
  };

  const onBlurEditor = (evt) => {
    onChange(evt.target.innerHTML);
    triggerSuccessNotification();
  };

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        contentEditable={true}
        className="p-2 max-h-48 overflow-scroll"
        onBlur={(evt) => onBlurEditor(evt)}
      ></div>
      {showSuccess ? <p className="successMessage">Changes Saved!</p> : <br />}
    </>
  );
};
