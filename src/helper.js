export const getNumofNotesInFolder = (folder, notes) => {
  const notesArray = notes.filter(note => {
    return note.folderId === folder.id;
  });
  return notesArray.length;
};

export const notesInFolderList = (notes, clickedfolder) => {
  return notes.filter(note => {
    return note.folderId === clickedfolder;
  });
};
