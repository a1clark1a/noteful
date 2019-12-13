import React from "react";
import { Link } from "react-router-dom";
import STORE from "../../dummy-store";
import "./DynamicFolder.css";

export default function DynamicFolder(props) {
  const { folders, notes } = STORE;
  const folder = folders.filter(folder => {
    const folderNotes = notes.map(note => {
      return folder.id === note.id;
    });
    return folderNotes;
  });
  console.log(folder);
  return (
    <>
      <section className="noteList">NOTES HERE</section>
      <section className="sidebar">sidebar here</section>
    </>
  );
}
