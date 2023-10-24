import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Notes } from "../../Contexts/Note";
import { RotatingSquare } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function Home() {
  let isLoading;
  let token = localStorage.getItem("userToken");
  let { notes, getNotes, deleteNote, updateNote } = useContext(Notes);
  async function deleteN(id) {
    console.log(id);
    isLoading = true;
    deleteNote(id);
    isLoading = false;
  }
  function updateN(id, title, content) {
    Swal.fire({
      title: "Add your note",
      html:
        `<input id="note-title" value ='${title}' placeholder="Title" class="input ">` +
        `<textarea id="note-content"  placeholder ="Your Note"  class="input">${content}</textarea>`,

      confirmButtonText: "Update",

      showCancelButton: true,

      preConfirm: () => {
        let title = document.getElementById("note-title").value;
        let content = document.getElementById("note-content").value;
        return { title, content };
      },
    }).then((result) => {
      console.log(result.value.title, result.value.content);
      updateNote(id, result.value.title, result.value.content);
    });
  }
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          <RotatingSquare
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        ""
      )}
      <div className="container pt-5">
        <div className="row g-3">
          {notes?.map((note) => {
            return (
              <>
                <div className="col-md-4">
                  <div class="card">
                    <div class="card-header bg-main-color text-white fw-bold">
                      Note
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">{note?.title}</h5>
                      <p class="card-text">{note?.content}</p>
                      <div>
                        <i
                          class="fa-solid fa-trash text-danger me-3"
                          onClick={() => {
                            deleteN(note?._id);
                          }}
                        ></i>
                        <i
                          class="fa-solid fa-pen-to-square m-color"
                          onClick={() => {
                            updateN(note?._id, note?.title, note?.content);
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
