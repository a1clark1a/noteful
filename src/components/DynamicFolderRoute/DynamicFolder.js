import React from "react";
import { Link } from "react-router-dom";
import "./DynamicFolder.css";

const getNumofNotesInFolder = (folder, notes) => {
  const notesArray = notes.filter(note => {
    return note.folderId === folder.id;
  });
  return notesArray.length;
};

export default function DynamicFolder(props) {
  const clickedfolder = props.match.params.folderId;
  const { folders, notes } = props;
  const notesInFolderList = notes.filter(note => {
    return note.folderId === clickedfolder;
  });

  const renderNotesInFolder = notesInFolderList.map((note, i) => {
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

  const renderFolderList = folders.map((folder, i) => {
    const num = getNumofNotesInFolder(folder, notes);
    return (
      <div key={`folder-${i}`} className="folderWrapper">
        <Link to={`/folder/${folder.id}`}>
          <h3>{folder.name}</h3>
        </Link>
        <code>{num}</code>
      </div>
    );
  });

  console.log(notesInFolderList);
  console.log(clickedfolder);
  return (
    <>
      <section className="sidebar">
        {renderFolderList}
        <button>Add a folder</button>
      </section>
      <section className="noteList">
        {renderNotesInFolder}
        <button>Add a Note</button>
      </section>
    </>
  );
}
