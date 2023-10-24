import axios from "axios";
import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const Notes = createContext();

export default function NotesProvider({ children }) {
  let [notes, setNotes] = useState([]);
  let isLoading;
  let token = localStorage.getItem("userToken");
  async function getNotes() {
    isLoading = true;
    let res = await axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: { token },
      })
      .catch((err) => err);

    console.log(res.data.notes);
    setNotes(res.data.notes);
    isLoading = false;
  }
  async function deleteNote(id) {
    let res = await axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
        headers: { token: token },
      })
      .catch((err) => err);
    console.log(res);
    if (res.data.msg == "done") {
      Swal.fire("Note Deleted Successfuly 💚");
      getNotes();
    } else {
      Swal.fire("Note Deleted Failed ⚠️❌");
    }
  }
  async function updateNote(id, title, content) {
    let res = await axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          title,
          content,
        },
        {
          headers: { token },
        }
      )
      .catch((err) => err);
    if (res.data.msg == "done") {
      Swal.fire("Note Updated Successfuly 💚");
      getNotes();
    } else {
      Swal.fire("Note Update Failed ⚠️❌");
    }
  }
  async function sendData(title, content) {
    console.log(token);
    let res = await axios
      .post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        { title: `${title}`, content: `${content}` },
        {
          headers: {
            token: token,
          },
        }
      )
      .catch((err) => err);
    console.log(res);
    if (res.data.msg == "done") {
      Swal.fire("Your Note Added Succesfully 💚");
      getNotes();
    } else {
      Swal.fire("Falied ❌⚠️");
    }
  }
  return (
    <Notes.Provider
      value={{
        notes,
        setNotes,
        sendData,
        getNotes,
        isLoading,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </Notes.Provider>
  );
}
