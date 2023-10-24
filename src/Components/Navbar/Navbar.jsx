import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserToken";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Notes } from "../../Contexts/Note";

export default function Navbar() {
  let token = localStorage.getItem("userToken");
  let { sendData } = useContext(Notes);
  let { setUserToken } = useContext(UserContext);
  let nav = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken("");
    nav("/login");
  }

  function addContent() {
    Swal.fire({
      title: "Add your note",
      html:
        '<input id="note-title" placeholder="Title" class="input ">' +
        '<textarea id="note-content" placeholder ="Your Note"  class="input"></textarea>',

      confirmButtonText: "Add",

      showCancelButton: true,

      preConfirm: () => {
        let title = document.getElementById("note-title").value;
        let content = document.getElementById("note-content").value;
        return { title, content };
      },
    }).then((result) => {
      console.log(result.value.title, result.value.content);
      sendData(result.value.title, result.value.content);
    });
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-main-color">
        <div class="container  d-flex justify-content-between align-items-center">
          <div className="">
            <Link class="navbar-brand fs-2 me-5 fw-bolder" href="#">
              Notes
            </Link>
          </div>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto ms-4  my-3 mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" href="#">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      addContent();
                    }}
                  >
                    Add Note
                  </button>
                </Link>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" href="#">
                  <button
                    className="btn btn-light ms-4"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
