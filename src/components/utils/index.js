export const taskPriority = (priority) => {
  if (priority === "Low") {
    return "slate";
  }
  if (priority === "Normal") {
    return "purple";
  }
  if (priority === "High") {
    return "red";
  }
};
export const topicColor = (topic) => {
  if (topic === "1") {
    return "white";
  } else if (topic === "2") {
    return "purple-200";
  } else if (topic === "3") {
    return "orange-200";
  } else if (topic === "4") {
    return "green-200";
  }
};

export const getMemberById = (ownerId, members) => {
  return members.filter((m) => m.id === ownerId)[0] ?? null;
};
