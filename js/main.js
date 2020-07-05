// Change CSS styles when element is stuck:
// https://stackoverflow.com/a/56678169
// In example change 'top' to 'bottom' in `nav`
// And make `header` much taller

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
