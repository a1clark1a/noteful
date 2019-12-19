import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  deleteFolder: () => {},
  addFolder: () => {},
  addNote: () => {}
});

export default NotefulContext;
