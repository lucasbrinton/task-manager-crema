// https://dribbble.com/shots/17889681-Project-Management-Dashboard-Light-Theme

export const topics = [
  {
    id: "1",
    name: "To Do",
  },
  {
    id: "2",
    name: "In Work",
  },
  {
    id: "3",
    name: "Review",
  },
  {
    id: "4",
    name: "Done",
  },
];

export const members = [
  {
    id: "user1",
    name: "William Gilbert",
    profilePicture:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2960&q=80",
  },
  {
    id: "user2",
    name: "Willebrod Snell",
    profilePicture:
      "https://images.unsplash.com/photo-1598641795816-a84ac9eac40c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1162&q=80",
  },
  {
    id: "user3",
    name: "Blaise Pascal",
    profilePicture:
      "https://images.unsplash.com/photo-1485290334039-a3c69043e517?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: "user4",
    name: "Robert Hooke",
    profilePicture:
      "https://images.unsplash.com/photo-1595760780346-f972eb49709f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80",
  },
  {
    id: "user5",
    name: "Leonard Euler",
    profilePicture:
      "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: "user6",
    name: "Marie Curie",
    profilePicture:
      "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: "user7",
    name: "Enrico Fermi",
    profilePicture:
      "https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80",
  },
  {
    id: "user8",
    name: "Lucas Brinton (you)",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export const tasks = [
  {
    id: "1",
    type: "Design",
    title: "UI Design 0",
    owners: ["user6", "user2", "user3", "user4", "user5"],
    priority: "Low",
    topic: "1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    comments: [
      {
        message: "Great",
        owner: "user3",
        date: "17/07/2022, 20:29:40",
      },
      {
        message: "Great idea",
        owner: "user2",
        date: "19/07/2022, 22:29:45",
      },
    ],
  },
  {
    id: "2",
    type: "Design",
    title: "UI Design 1",
    owners: ["user4", "user7"],
    priority: "Normal",
    topic: "1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    comments: [],
  },
  {
    id: "3",
    type: "Design",
    title: "UI Design 2",
    owners: ["user1"],
    priority: "Low",
    topic: "1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    comments: [
      {
        message: "Great",
        owner: "user3",
        date: "19/07/2022, 22:29:45",
      },
      {
        message: "Great idea",
        owner: "user2",
        date: "19/07/2022, 22:29:45",
      },
    ],
  },
  {
    id: "4",
    type: "Research",
    title: "User Interview",
    owners: ["user5", "user2"],
    priority: "High",
    topic: "2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    comments: [
      {
        message: "Great idea",
        owner: "user3",
        date: "19/07/2022, 22:29:45",
      },
    ],
  },
  {
    id: "5",
    type: "Design system",
    title: "Style Guide",
    owners: ["user1", "user2", "user4", "user5"],
    priority: "High",
    topic: "3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    comments: [
      {
        message: "Great",
        owner: "user3",
        date: "19/07/2022, 22:29:45",
      },
      {
        message: "Great idea",
        owner: "user5",
        date: "19/07/2022, 22:29:45",
      },
      {
        message: "Great idea",
        owner: "user1",
        date: "19/07/2022, 22:29:45",
      },
      {
        message: "Great idea",
        owner: "user2",
        date: "19/07/2022, 22:29:45",
      },
    ],
  },
  {
    id: "6",
    type: "Presentation",
    title: "Animations",
    owners: ["user2", "user3", "user4", "user5"],
    priority: "Normal",
    topic: "4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    comments: [
      {
        message: "Good work",
        owner: "user1",
        date: "19/07/2022, 22:29:45",
      },
      {
        message: "Great idea",
        owner: "user2",
        date: "19/07/2022, 22:29:45",
      },
    ],
  },
  {
    id: "7",
    type: "Presentation",
    title: "Mockups",
    owners: ["user1", "user2", "user3", "user4", "user5", "user6", "user7"],
    priority: "Low",
    topic: "4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    comments: [
      {
        message: "Great",
        owner: "user6",
        date: "19/07/2022, 22:29:45",
      },
      {
        message: "Great idea",
        owner: "user2",
        date: "19/07/2022, 22:29:45",
      },
    ],
  },
];
