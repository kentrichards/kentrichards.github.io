"use strict";

const listIcon = document.getElementById("header-list");
const sidebar = document.getElementsByTagName("aside")[0];

listIcon.addEventListener("click", () => {
  if (sidebar.classList.contains("block")) {
    sidebar.classList.add("hide");
    sidebar.classList.remove("block");
  } else {
    sidebar.classList.add("block");
    sidebar.classList.remove("hide");
  }
});

const closeIcon = document.getElementById("close-icon");

closeIcon.addEventListener("click", () => {
  sidebar.classList.add("hide");
  sidebar.classList.remove("block");
});
