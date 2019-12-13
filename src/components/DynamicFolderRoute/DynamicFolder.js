import React from "react";
import { Link } from "react-router-dom";
import "./DynamicFolder.css";

export default function DynamicFolder(props) {
  const folderList = props.folders.filter(folder => {
    const folderNotes = props.notes.map(note => {
      return folder.id === note.id;
    });
    return folderNotes;
  });

  const renderSidebar = folderList.map((folder, i) => {
    return (
      <div key={`folder_${i}`}>
        <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
      </div>
    );
  });
  console.log(folderList);
  return (
    <>
      <section className="sidebar">{renderSidebar}</section>
      <section className="noteList">NOTES HERE</section>
    </>
  );
}
