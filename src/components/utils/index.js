/**
 * Returns the color scheme for task priority levels.
 * @param {string} priority - Priority level ("Low", "Normal", or "High")
 * @returns {string} Tailwind color name
 */
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

/**
 * Returns the background color for topic/column headers.
 * @param {string} topic - Topic ID (1-4)
 * @returns {string} Tailwind color class
 */
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

/**
 * Finds a member object by their unique ID.
 * @param {string} ownerId - The member ID to search for
 * @param {Array} members - Array of all member objects
 * @returns {Object|null} Member object if found, null otherwise
 */
export const getMemberById = (ownerId, members) => {
  return members.filter((m) => m.id === ownerId)[0] ?? null;
};
