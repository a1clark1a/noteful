import React from "react";
import { Link } from "react-router-dom";
import "./MainRoute.css";

const MainRoute = props => {
  const noteList = props.notes.map((note, i) => {
    return (
      <div key={`note${i}`} className="noteWrapper">
        <Link to={`/note/${note.id}`}>
          <h2>{note.name}</h2>
        </Link>
        <span>{note.modified}</span>
        <button>Remove</button>
      </div>
    );
  });
  console.log(props.folders);
  const folderList = props.folders.map((folder, i) => {
    return (
      <div key={`folder-${i}`} className="folderWrapper">
        <Link to={`/folder/${folder.id}`}>
          <h3>{folder.name}</h3>
        </Link>
        <code> num</code>
      </div>
    );
  });
  return (
    <>
      <section>
        <div className="sidebar">{folderList}</div>
      </section>
      <section className="notesList">{noteList}</section>
    </>
  );
};

export default MainRoute;
