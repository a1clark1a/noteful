import React from "react";
import { Link } from "react-router-dom";
import "./MainRoute.css";

const getNumofNotesInFolder = (folder, notes) => {
  const notesArray = notes.filter(note => {
    return note.folderId === folder.id;
  });
  return notesArray.length;
};

const MainRoute = props => {
  const { folders, notes } = props;
  const noteList = notes.map((note, i) => {
    return (
      <li key={`note${i}`} className="noteWrapper">
        <Link to={`/note/${note.id}`}>
          <h2>{note.name}</h2>
        </Link>
        <span>{note.modified}</span>
        <button>Remove</button>
      </li>
    );
  });
  const folderList = folders.map((folder, i) => {
    const num = getNumofNotesInFolder(folder, notes);
    return (
      <div key={`folder-${i}`} className="folderWrapper">
        <Link to={`/folder/${folder.id}`}>
          <h3>{folder.name}</h3>
        </Link>
        <code> {num}</code>
      </div>
    );
  });
  return (
    <>
      <section>
        <div className="sidebar">
          {folderList}
          <button>Add a folder</button>
        </div>
      </section>
      <section className="notesList">
        <ul>{noteList}</ul>
        <button>Add a note</button>
      </section>
    </>
  );
};

export default MainRoute;
